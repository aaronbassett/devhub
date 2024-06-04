import _ from "lodash"
import { BasicCache } from "@src/utils/basic-cache/basic-cache"
import { CodeFetchError } from "./errors"
import { config } from "@config/config"
import type { CodeCache, CodeFetcherOpts, CodeCacheEntry } from "./types"

export class CodeFetcher {
  private url: URL
  private cache: CodeCache

  constructor(opts: CodeFetcherOpts) {
    const { url } = opts

    this.url = _.isString(url) ? new URL(url) : url
    this.cache = new BasicCache<CodeCacheEntry>({
      path: config.cache.remote_code.PATH,
      dataPathRoot: config.cache.remote_code.DATA_PATH_ROOT,
      ttl: config.cache.remote_code.TTL,
    })
  }

  public async fetch(): Promise<string> {
    const cacheEntry = await this.cache.get(this.url.href)
    if (cacheEntry) {
      return cacheEntry.content
    }

    const response = await fetch(this.url.href)
    if (!response.ok) throw new CodeFetchError(response.statusText)
    const content = await response.text()

    await this.cache.update(this.url.href, { content })

    return content
  }
}
