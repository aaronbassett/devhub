import { BaseContentCollectionSchema } from "@schemas/collections/content/base"
import { getNewestCommitDate } from "@src/utils/git"
import { readingTime } from "reading-time-estimator"
import { fileURLToPath, pathToFileURL } from "node:url"
import { z } from "astro:content"
import { type DocsEntry } from "@src/utils/routing/static-paths"

type BaseData = z.infer<typeof BaseContentCollectionSchema>

export class FrontmatterParser {
  public parse(entry: DocsEntry): DocsEntry {
    return this.updateReadingTime(this.updateLastUpdated(entry))
  }
  public updateLastUpdated(entry: DocsEntry): DocsEntry {
    const data = entry.data as BaseData
    if (data.lastUpdated instanceof Date || data.lastUpdated === false) {
      return entry
    } else {
      const currentFilePath = fileURLToPath(
        pathToFileURL(`src/content/${entry.collection}/${entry.id}`)
      )
      try {
        const lastUpdated = getNewestCommitDate(currentFilePath)
        return {
          ...entry,
          data: {
            ...data,
            lastUpdated,
          },
        }
      } catch {
        // If the git command fails set lastUpdated to false
        return {
          ...entry,
          data: {
            ...data,
            lastUpdated: false,
          },
        }
      }
    }
  }

  public updateReadingTime(entry: DocsEntry): DocsEntry {
    const data = entry.data as BaseData
    if (data.readingTime) return entry

    return {
      ...entry,
      data: {
        ...data,
        readingTime: readingTime(entry.body).text,
      },
    }
  }
}
