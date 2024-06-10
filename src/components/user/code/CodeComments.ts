import type { CodeCommentsOpts } from "./types"

export class CodeComments {
  private content: string
  private regex: RegExp

  constructor(opts: CodeCommentsOpts) {
    const { content, regex } = opts
    this.content = content
    this.regex = regex
  }

  public strip(): string {
    return this.content.replaceAll(this.regex, "")
  }
}
