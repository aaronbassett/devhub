import { config } from "@config/config"
import { ContentCollections } from "@config/collections"
import { OGImageRoute } from "astro-og-canvas"
import type { ContentCollectionKey } from "astro:content"
import type { OGImageOptions } from "node_modules/astro-og-canvas/dist/types"
import { getCollection } from "astro:content"

import { type BaseContentCollection } from "@schemas/collections/content/base"

type OGPage = {
  title: string
  description: string
}

let pages: Record<string, OGPage> = {}

for (const collectionName in ContentCollections) {
  const collectionEntries = await getCollection(
    collectionName as ContentCollectionKey
  )
  collectionEntries.forEach((entry) => {
    const data = entry.data as BaseContentCollection
    pages[`${entry.collection}-${entry.slug}`] = {
      title: data.title,
      description: data.description,
    }
  })
}

export const { getStaticPaths, GET } = OGImageRoute({
  param: "slug",

  pages: pages,

  getImageOptions: (_, page) => {
    return {
      title: page.title,
      description: page.description,
      ...(config.seo.OG_IMAGE_DEFAULT as Omit<
        OGImageOptions,
        "title" | "description"
      >),
      ...ContentCollections[page.collection]?.ogImage,
    }
  },
})
