import _ from "lodash"
import { config } from "@config/config"

import type { ExtendLink, ExtendMeta, OpenGraph, Twitter } from "@schemas/seo"

import { type BaseContentCollection } from "@schemas/collections/content/base"
import { type DocsEntry } from "@src/utils/routing/static-paths"

export function openGraphImageSlug(collection: string, slug: string) {
  return `${collection}-${slug}`
}

export function populateOpenGraphTags(entry: DocsEntry, urlOrigin: string) {
  const data = entry.data as BaseContentCollection
  const { title } = data
  const { openGraph } = data.seo || {}
  const { collection, slug } = entry

  let openGraphValues: OpenGraph = {
    // Default values will be overwritten if openGraph.basic/image values are set
    basic: {
      title,
      type: "article",
      image: `${urlOrigin}/og/${openGraphImageSlug(collection, slug)}.png`,
      ...openGraph?.basic,
    },
    image: {
      alt: title,
      type: "image/png",
      ...openGraph?.image,
    },
  }

  if (openGraph?.optional) {
    openGraphValues["optional"] = openGraph.optional
  }

  if (openGraph?.article) {
    openGraphValues["article"] = openGraph.article
  }

  return openGraphValues
}

export function populateTwitterTags(
  entry: DocsEntry,
  urlOrigin: string
): Twitter {
  const data = entry.data as BaseContentCollection
  const { title, description } = data
  const { openGraph, twitter } = data.seo || {}
  const { collection, slug } = entry

  return {
    card: "summary_large_image",
    site: config.seo.twitter.DEFAULT_SITE_USERNAME,
    creator: config.seo.twitter.DEFAULT_CREATOR_USERNAME,
    title: openGraph?.basic?.title || title,
    description,
    image: `${urlOrigin}/og/${openGraphImageSlug(collection, slug)}.png`,
    imageAlt: openGraph?.basic?.title || title,
    ...twitter,
  }
}

export function populateExtendLinks(
  entry: DocsEntry,
  defaultLinks: ExtendLink[]
): ExtendLink[] {
  const data = entry.data as BaseContentCollection
  const links = data?.seo?.extend?.link

  let linksEntries = defaultLinks

  if (links && links.length > 0) {
    for (const link of links) {
      linksEntries = _.union(linksEntries, [{ ...link }])
    }
  }

  return linksEntries
}

export function populateExtendMeta(
  entry: DocsEntry,
  defaultMeta: ExtendMeta[] = []
): ExtendMeta[] {
  const data = entry.data as BaseContentCollection
  const metas = data?.seo?.extend?.meta

  let metaEntries = []

  if (metas && metas.length > 0) {
    for (const meta of metas) {
      metaEntries.push({ ...meta })
    }
  }

  return _.union(defaultMeta, metaEntries)
}
