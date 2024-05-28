export interface CacheInterface<CE extends CacheEntry> {
  get(id: string): Promise<CE | undefined>
  update(id: string, entry: Omit<CE, "updatedAt">): Promise<void>
}

export type CacheConfig = {
  path: string
  dataPathRoot: string
  separator?: string
  ttl: number
}

export interface CacheEntry {
  updatedAt: Date
}
