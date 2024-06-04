import _ from "lodash"
import chalk from "chalk"
import { CodeDiffError } from "./errors"
import { CodeFetcher } from "./CodeFetcher"
import { CodeSections } from "./CodeSections"
import { diffLines, type Change } from "diff"
import type { CodeDiffOpts, Lines, Tags } from "./types"

const consoleStyle = {
  ERROR: console.error,
  WARN: console.warn,
  INFO: console.info,
}

const chalkStyle = {
  ERROR: chalk.underline.bgRed.white,
  WARN: chalk.underline.bgYellow.black,
  INFO: chalk.blue,
}

export class CodeDiff {
  private urlA: URL
  private urlB: URL
  private lines: Lines | undefined
  private tags: Tags
  private strict: boolean
  private level: "ERROR" | "WARN" | "INFO"
  private contentToDiff: "FILE" | "LINES"
  private contentA: string | undefined
  private contentB: string | undefined

  constructor(opts: CodeDiffOpts) {
    const { urlA, urlB, level, contentToDiff, lines, tags, strict } = opts

    this.urlA = _.isString(urlA) ? new URL(urlA) : urlA
    this.urlB = _.isString(urlB) ? new URL(urlB) : urlB
    this.lines = lines
    this.tags = tags
    this.strict = strict
    this.level = level
    this.contentToDiff = contentToDiff
  }

  private async fetchAllContent(): Promise<void> {
    if (!this.contentA || !this.contentB) {
      const fetchCode = async (url: URL) => {
        const codeFetcher = await new CodeFetcher({
          url: url,
        })
        return codeFetcher.fetch()
      }
      this.contentA = await fetchCode(this.urlA)
      this.contentB = await fetchCode(this.urlB)
    }
  }

  private async parseSections(): Promise<void> {
    if (this.contentToDiff === "LINES") {
      const parserA = new CodeSections({
        url: this.urlA,
        content: this.contentA as string,
        lines: this.lines,
        tags: this.tags,
        strict: this.strict,
      })
      const contentA = await parserA.sections
      this.contentA = contentA.join("\n")

      const parserB = new CodeSections({
        url: this.urlB,
        content: this.contentB as string,
        lines: this.lines,
        tags: this.tags,
        strict: this.strict,
      })
      const contentB = await parserB.sections
      this.contentB = contentB.join("\n")
    }
  }

  public async diff(): Promise<Change[] | false> {
    await this.fetchAllContent()
    await this.parseSections()

    const diffResult = diffLines(
      this.contentA as string,
      this.contentB as string
    )

    return _.every(
      diffResult,
      (result) => !("added" in result || "removed" in result)
    )
      ? false
      : diffResult
  }

  public async alerts(): Promise<void> {
    const diffResults = await this.diff()
    if (diffResults) {
      consoleStyle[this.level](
        chalkStyle[this.level](
          `Differences between ${this.urlA} and ${this.urlB}:`
        )
      )
      let diffCounts = { added: 0, removed: 0 }
      _.each(diffResults, ({ added, removed, value, count }) => {
        if (added) {
          consoleStyle[this.level](
            chalkStyle[this.level](`${count} lines added`)
          )
          diffCounts.added = diffCounts.added + (count || 0)
        } else if (removed) {
          consoleStyle[this.level](
            chalkStyle[this.level](`${count} lines removed`)
          )
          diffCounts.removed = diffCounts.removed + (count || 0)
        }
        if (added || removed) {
          const marker = added ? "+" : "-"
          const color = added ? chalk.green : chalk.red
          for (const changedLine of value.split("\n")) {
            consoleStyle[this.level](color(`${marker} ${changedLine}`))
          }
        }
      })

      if (this.level === "ERROR") {
        throw new CodeDiffError(
          `${diffCounts.added} lines added and ${diffCounts.removed} lines removed between files ${this.urlA} and ${this.urlB}`
        )
      }
    }
  }
}
