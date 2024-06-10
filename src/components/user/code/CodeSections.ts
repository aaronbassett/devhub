import _ from "lodash"
import { LineFormatError, LineRangeError, TagNotFoundError } from "./errors"
import type { CodeSectionsOpts, Line, Lines, Tag, Tags } from "./types"

export class CodeSections {
  private _sections: string[]
  private url: URL
  private content: string
  private lines: Line[] | undefined
  private tags: Tag[] | undefined
  private strict: boolean

  constructor(opts: CodeSectionsOpts) {
    const { url, content, lines, tags, strict } = opts
    this.url = _.isString(url) ? new URL(url) : url
    this.content = content
    this.lines = lines ? this.normalizeLines(lines) : undefined
    this.tags = tags ? this.normalizeTags(tags) : undefined
    this.strict = strict

    this.addFragmentToLines()
    this.addTagsToLines()

    this._sections = this.getSections()
  }

  public get sections() {
    return this._sections
  }

  private getSections(): string[] {
    // If no lines defined, return a single entry of all content
    if (this.lines === undefined) return [this.content]

    let selectedLines: string[] = []
    const contentLines = this.content.split("\n")
    for (const line of this.lines) {
      selectedLines.push(
        contentLines.slice(line.start, line.end + 1).join("\n")
      )
    }

    return selectedLines
  }

  private addFragmentToLines(): void {
    const fragmentLine = this.parseFragment(this.url)
    if (fragmentLine) {
      this.lines = _.union(this.lines, this.normalizeLines(fragmentLine))
    }
  }

  private addTagsToLines(): void {
    if (this.tags === undefined) return

    for (const tag of this.tags) {
      const startRegex = new RegExp(`# tag::${tag}`)
      const endRegex = new RegExp(`# end::${tag}`)
      const startLine = this.content
        ?.split("\n")
        .findIndex((line) => startRegex.test(line))
      const endLine = this.content
        ?.split("\n")
        .findIndex((line) => endRegex.test(line))
      if (startLine !== undefined && endLine !== undefined) {
        this.lines = _.union(
          this.lines,
          this.normalizeLines({ start: startLine, end: endLine })
        )
      } else {
        if (this.strict) {
          throw new TagNotFoundError(tag, this.url)
        }
      }
    }
  }

  private normalizeTags(tags: Exclude<Tags, undefined>): string[] {
    return _.isString(tags)
      ? tags.split(",").map((tag) => tag.trim())
      : tags.map((tag) => tag.trim())
  }

  private normalizeLines(lines: Exclude<Lines, undefined>): Line[] {
    if (_.isObject(lines) && "start" in lines && "end" in lines) {
      const contentLinesLength = this.content.split("\n").length

      if (lines.start < 0 || lines.end < 0) {
        if (this.strict) {
          throw new LineRangeError(lines.start, lines.end, contentLinesLength)
        } else {
          lines.start = lines.start < 0 ? 0 : lines.start
          lines.end = lines.end < 0 ? 0 : lines.end
        }
      }

      if (lines.start > lines.end) {
        if (this.strict) {
          throw new LineRangeError(lines.start, lines.end, contentLinesLength)
        } else {
          lines.end = lines.start
        }
      }

      // We only have to check if the end is out of bounds as start must be <= end
      if (lines.end > contentLinesLength) {
        if (this.strict) {
          throw new LineRangeError(lines.start, lines.end, contentLinesLength)
        } else {
          lines.end = contentLinesLength
          // Now the start could end up after the end!
          lines.start = lines.start > lines.end ? lines.end : lines.start
        }
      }
      return [lines]
    } else if (_.isString(lines)) {
      return [...this.normalizeLines(this.parseLineString(lines))]
    } else if (_.isArray(lines)) {
      let normalizedLines: Line[] = []
      for (const line of lines) {
        normalizedLines = _.flatten([
          normalizedLines,
          this.normalizeLines(line),
        ])
      }
      return normalizedLines
    }

    throw new LineFormatError(lines)
  }

  private parseLineString(line: string): Line {
    const singleLineMatch = line.match(/^L(\d+)$/)
    const rangeMatch = line.match(/^L(\d+)-L(\d+)$/)

    if (singleLineMatch) {
      return {
        start: parseInt(singleLineMatch[1] as string),
        end: parseInt(singleLineMatch[1] as string),
      }
    } else if (rangeMatch) {
      return {
        start: parseInt(rangeMatch[1] as string),
        end: parseInt(rangeMatch[2] as string),
      }
    } else {
      throw new LineFormatError(line)
    }
  }

  private parseFragment(url: URL): Line | void {
    const fragment = url.hash

    if (fragment) {
      try {
        return this.parseLineString(fragment.slice(1))
      } catch (error) {
        if (!(error instanceof LineFormatError)) throw error
      }
    }
  }
}
