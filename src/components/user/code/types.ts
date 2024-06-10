import { BasicCache } from "@src/utils/basic-cache/basic-cache"
import type { DiffProps } from "./schemas"
import { type CacheEntry } from "@src/utils/basic-cache/types"

export interface CodeCacheEntry extends CacheEntry {
  content: string
}

export type CodeCache = BasicCache<CodeCacheEntry>

export type Line = { start: number; end: number }
export type Lines = string | string[] | Line | Line[] | undefined
export type Tag = string
export type Tags = Tag | Tag[] | undefined

export type CodeSectionsOpts = {
  url: string | URL
  content: string
  lines?: Lines
  tags?: Tags
  strict: boolean
}

export type CodeFetcherOpts = {
  url: string | URL
}

export type CodeDiffOpts = Omit<DiffProps, "enabled" | "url"> &
  Omit<CodeSectionsOpts, "url" | "content"> & {
    urlA: string | URL
    urlB: string | URL
    level: "ERROR" | "WARN" | "INFO"
    contentToDiff: "FILE" | "LINES"
  }

export type CodeCommentsOpts = {
  content: string
  regex: RegExp
}
