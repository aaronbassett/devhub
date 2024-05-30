import _ from "lodash"
import { getCollection, getEntry } from "astro:content"
import { type BaseContentCollection } from "@schemas/collections/content/base"
import { type InternalLink } from "@schemas/links"
import { type ContentCollectionKey, type CollectionEntry } from "astro:content"
import { type DocsEntry } from "@src/utils/routing/static-paths"

type FrontmatterRelatedPosts = InternalLink[]
type RelatedPost = Omit<CollectionEntry<ContentCollectionKey>, "data"> & {
  data: BaseContentCollection
}

type Opts = {
  entry?: DocsEntry
  relatedPosts?: FrontmatterRelatedPosts
  collections?: ContentCollectionKey[]
  min?: number
}

const isIndexPage = (slug: string, id: string) => {
  return (
    slug.endsWith("index") ||
    id.split("/")[id.split("/").length - 1].startsWith("index")
  )
}

const getTopLevelPagesFromCollection = async (
  collection: ContentCollectionKey
) => {
  let otherPosts: RelatedPost[] = []
  const entries = await getCollection(collection)
  _.each(entries, (entry) => {
    if (entry) {
      if (isIndexPage(entry.slug, entry.id)) {
        otherPosts.push(entry)
      }
    }
  })

  return otherPosts
}

export const getRelated = async ({
  entry,
  relatedPosts,
  collections = [],
  min = 5,
}: Opts): Promise<RelatedPost[]> => {
  let posts: RelatedPost[] = []
  if (relatedPosts) {
    relatedPosts.forEach(async (post) => {
      //@ts-expect-error: Complaining because getEntry can be used with data collections as well as content collections.
      const entry = await getEntry(post.collection, post.slug)
      if (entry) posts.push(entry)
    })
  }

  if (posts.length < min) {
    let otherPosts: RelatedPost[] = []

    for (const collection of collections) {
      const entries = await getTopLevelPagesFromCollection(collection)
      otherPosts = _.union(otherPosts, entries)
    }

    otherPosts = otherPosts.filter((post) => {
      return !posts.some((p) => p.slug === post.slug)
    })

    const addCount = min - posts.length
    posts.push(..._.sampleSize(otherPosts, addCount))
  }

  if (entry) {
    posts = posts.filter((post) => post.slug !== entry.slug)
  }

  return posts
}
