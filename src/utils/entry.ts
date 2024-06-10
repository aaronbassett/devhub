import humanizeDuration from "humanize-duration"
import parseDurationString from "parse-duration"
import { readingTime } from "reading-time-estimator"
import { type DocsEntry } from "@src/utils/routing/static-paths"
import { type BaseContentCollection } from "@schemas/collections/content/base"

export const isIndexPage = (id: string, slug: string) => {
  return (
    slug.endsWith("index") ||
    id.split("/")[id.split("/").length - 1].startsWith("index")
  )
}

export const hasRoot = (id: string, root: string) => {
  return id.startsWith(root)
}

export const totalReadingTime = (entries: DocsEntry[]) => {
  let totalDuration = 0

  for (const entry of entries) {
    const data = entry.data as BaseContentCollection
    if (data.readingTime) {
      // Attempt to parse the reading time string into a number of milliseconds
      totalDuration += parseDurationString(data.readingTime) ?? 0
      continue
    }
    const mins = readingTime(entry.body, 200).minutes
    totalDuration += mins * 60 * 1000
  }

  return humanizeDuration(totalDuration, {
    round: true,
    largest: 3,
  })
}
