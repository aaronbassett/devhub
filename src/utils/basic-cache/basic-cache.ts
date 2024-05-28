import { Config, JsonDB } from "node-json-db"
import { md5 } from "js-md5"
import type { CacheInterface, CacheEntry, CacheConfig } from "./types"

export class BasicCache<CE extends CacheEntry> implements CacheInterface<CE> {
  private path: string
  private dataPathRoot: string
  private ttl: number
  private separator: string
  private cache: JsonDB

  constructor(opts: CacheConfig) {
    const { path, dataPathRoot, separator = "/", ttl } = opts
    this.path = path
    this.dataPathRoot = dataPathRoot
    this.separator = separator
    this.ttl = ttl
    this.cache = new JsonDB(new Config(this.path, true, false, this.separator))
  }

  private getCacheKey(id: string) {
    const hash = md5.create()
    hash.update(id)
    return hash.hex()
  }

  private getDataPath(id: string) {
    return `${this.separator}${this.dataPathRoot}${this.separator}${this.getCacheKey(id)}`
  }

  public async get(id: string): Promise<CE | undefined> {
    try {
      const currentDateTime = new Date()
      const cacheEntry: CE = await this.cache.getObject<CE>(
        this.getDataPath(id)
      )
      return new Date(cacheEntry.updatedAt).getTime() + this.ttl >
        currentDateTime.getTime()
        ? cacheEntry
        : undefined
    } catch (error) {
      console.warn(error)
      return undefined
    }
  }

  public async update(id: string, entry: Omit<CE, "updatedAt">): Promise<void> {
    const updatedEntry = {
      ...entry,
      updatedAt: new Date(),
    } as CE

    await this.cache.push(this.getDataPath(id), updatedEntry, true)
  }
}
