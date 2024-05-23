import _ from "lodash"
import { BaseContentCollectionSchema } from "@schemas/collections/content/base"
import { FrontmatterParser } from "@src/utils/routing/frontmatter"
import type { GetStaticPathsItem } from "astro"
import {
  type ContentCollectionKey,
  type CollectionEntry,
  getCollection,
} from "astro:content"
import { z } from "astro:content"

type BaseData = z.infer<typeof BaseContentCollectionSchema>

// Omit the `slug` field as we need to be able to use any string and CollectionEntry has literal values
export type DocsEntry = Omit<CollectionEntry<ContentCollectionKey>, "slug"> & {
  slug: string
}

export interface PathProps<DE> {
  // Content collection entry for the current page. Includes frontmatter at `data`.
  entry: DE
  // Uplift a few fields from `entry` to the path props for convenience
  slug: string
  collection: ContentCollectionKey
  [key: string]: unknown
}

export interface Path<DE> extends GetStaticPathsItem {
  params: { slug: string | undefined }
  props: PathProps<DE>
}

export class ContentCollectionStaticPaths<CK extends ContentCollectionKey> {
  private collectionName: CK

  constructor(collectionName: CK) {
    this.collectionName = collectionName
  }

  /**
   * Astro is inconsistent in its `index.md` slug generation. In most cases,
   * `index` is stripped, but in the root of a collection, we get a slug of `index`.
   * We map that to undefined for consistent behaviour.
   */
  private normalizeIndexSlug(slug: string) {
    return slug === "index" ? undefined : slug
  }

  private async getDocs(): Promise<DocsEntry[]> {
    const docs: DocsEntry[] = (
      (await getCollection(this.collectionName, ({ data }: any) => {
        return (
          import.meta.env.MODE === "development" ||
          ("status" in data && data.status === "published")
        )
      })) ?? []
    ).map(({ slug, ...entry }) => ({
      ...entry,
      slug: this.normalizeIndexSlug(slug) as string,
    }))

    return docs
  }

  private async getPathProps(): Promise<PathProps<DocsEntry>[]> {
    let docEntries = await this.getDocs()
    docEntries = this.parseFrontmatter(docEntries)

    const pathProps: PathProps<DocsEntry>[] = docEntries.map((entry) => ({
      entry,
      slug: entry.slug,
      collection: entry.collection,
    }))

    return pathProps
  }

  private parseFrontmatter(docs: DocsEntry[]): DocsEntry[] {
    const parser = new FrontmatterParser()
    return docs.map((entry) => parser.parse(entry))
  }

  public async paths(): Promise<Path<DocsEntry>[]> {
    const pathProps = await this.getPathProps()

    return _.sortBy(
      pathProps.map((pathProp) => ({
        params: { slug: pathProp.slug },
        props: pathProp,
      })),
      (path) => {
        const data = path.props.entry.data as BaseData
        return data?.sidebar?.order ?? 0
      }
    )
  }
}
