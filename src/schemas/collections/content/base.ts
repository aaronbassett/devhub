import { config } from "@config/config"
import { ExtendSchema, OpenGraphSchema, TwitterSchema } from "@schemas/seo"
import { ExternalLinkSchema, InternalLinkSchema } from "@schemas/links"
import { HeadConfigSchema } from "@schemas/head"
import { PageBannerSchema } from "@schemas/page-banner"
import { PrevNextSchema } from "@schemas/links"
import { SidebarEntrySchema } from "@schemas/sidebar"
import { TableOfContentsSchema } from "@schemas/table-of-contents"

import { reference, z } from "astro:content"

export const BaseContentCollectionSchema = z.object({
  /** The title of the current page. Required. */
  title: z.string().max(config.article.TITLE_MAX_LENGTH),

  /**
   * An optional tagline which appears under the main title
   */
  tagline: z.string().max(config.article.TAGLINE_MAX_LENGTH).optional(),

  /**
   * A short description of the current page’s content.
   * A good description is 150–160 characters long and outlines the key content
   * of the page in a clear and engaging way.
   */
  description: z.string().max(config.article.DESCRIPTION_MAX_LENGTH),

  /**
     *  The "canonical" or "preferred" url of a web page.
     If undefined, Astro.url.href will be used as the default value.
     */
  canonical: z.string().url().optional(),

  /** Set custom `<head>` tags just for this page. */
  head: HeadConfigSchema.optional(),

  /**
   * Optional over-writes for SEO tags
   */
  seo: z
    .object({
      openGraph: OpenGraphSchema.optional(),
      twitter: TwitterSchema.optional(),
      extend: ExtendSchema.optional(),
      noindex: z.boolean().default(false),
      nofollow: z.boolean().default(false),
    })
    .optional(),

  /** Override global table of contents configuration for this page. */
  tableOfContents: TableOfContentsSchema().optional(),

  /**
   * Related internal links
   */
  relatedPosts: z.array(InternalLinkSchema).optional(),

  /**
   * Related GitHub repositories
   */
  relatedCode: z
    .array(
      z.object({
        owner: z.string(),
        repo: z.string(),
      })
    )
    .optional(),

  /**
   * External links to related pages
   */
  relatedLinks: z.array(ExternalLinkSchema).optional(),

  /**
   * Related YouTube videos
   */
  relatedVideos: z.array(z.string()).optional(),

  /**
   * Set the layout style for this page.
   * Can be `'doc'` (the default) or `'splash'` for a wider layout without any sidebars.
   */
  template: z.enum(["doc", "splash"]).default("doc"),

  /**
   * The last update date of the current page.
   * Overrides the `lastUpdated` date generated from the Git history.
   *
   * Set to false to disable display of last updated date for page
   */
  lastUpdated: z.union([z.date(), z.boolean()]).optional(),

  /**
   * The previous navigation link configuration.
   * Overrides the default previous link text and/or URL.
   * Set to false to disable previous link for page
   */
  prev: PrevNextSchema.optional(),

  /**
   * The next navigation link configuration.
   * Overrides the default next link text and/or URL.
   * Set to false to disable next link for page
   */
  next: PrevNextSchema.optional(),

  /**
   * Optional configuration for how page will appear in the side navigation bar
   */
  sidebar: SidebarEntrySchema.optional(),

  /** Display an announcement banner at the top of this page. */
  banner: PageBannerSchema.optional(),

  /** Add this page to search index. Default: true */
  addToIndex: z.boolean().default(true),

  /** Current status of the page. Default: draft
   *  Draft pages will only be visible in dev mode
   */
  status: z.enum(["draft", "published"]).default("draft"),
})

export type BaseContentCollection = z.infer<typeof BaseContentCollectionSchema>
