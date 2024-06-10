import type { Lines, Tag } from "./types"

export class LineFormatError extends Error {
  constructor(line: Lines) {
    super(`Invalid line format: ${line}`)
    this.name = "LineFormatError"
  }
}

export class LineRangeError extends Error {
  constructor(start: number, end: number, len: number) {
    super(
      `Lines {start: ${start}, end: ${end}} are not valid for content with line length ${len}`
    )
    this.name = "LineRangeError"
  }
}

export class TagNotFoundError extends Error {
  constructor(tag: Tag, url: URL) {
    super(`Tag "${tag}" not found in: ${url}`)
    this.name = "TagNotFoundError"
  }
}

export class CodeFetchError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "CodeFetchError"
  }
}

export class CodeDiffError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "CodeDiffError"
  }
}
