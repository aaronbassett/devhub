import { z } from 'astro/zod'

const BasicSchema = z.object({
  title: z.string(),
  type: z.string(),
  image: z.string(),
  url: z.union([z.string(), z.instanceof(URL)]).optional(),
})
const OptionalSchema = z.object({
  audio: z.string(),
  description: z.string(),
  determiner: z.string(),
  locale: z.string(),
  localeAlternate: z.array(z.string()),
  siteName: z.string(),
  video: z.string(),
})
const imageSchema = z.object({
  url: z.union([z.string(), z.instanceof(URL)]),
  secureUrl: z.union([z.string(), z.instanceof(URL)]),
  type: z.string(),
  width: z.number(),
  height: z.number(),
  alt: z.string(),
})
const articleSchema = z.object({
  publishedTime: z.string(),
  modifiedTime: z.string(),
  expirationTime: z.string(),
  authors: z.array(z.string()),
  section: z.string(),
  tags: z.array(z.string()),
})

export const OpenGraphSchema = z.object({
  basic: BasicSchema,
  optional: OptionalSchema.partial().optional(),
  image: imageSchema.partial().optional(),
  article: articleSchema.partial().optional(),
})

export const TwitterSchema = z
  .object({
    card: z.union([
      z.literal("summary"),
      z.literal("summary_large_image"),
      z.literal("app"),
      z.literal("player"),
    ]),
    site: z.string(),
    creator: z.string(),
    title: z.string(),
    description: z.string(),
    image: z.union([z.string(), z.instanceof(URL)]),
    imageAlt: z.string(),
  })
  .partial()

interface Link extends Partial<Omit<HTMLLinkElement, "sizes">> {
  prefetch?: boolean
  crossorigin?: string
  sizes?: string
}

interface Meta extends Partial<HTMLMetaElement> {
  property?: string
}

const zLink = z.custom<Link>((val: Link): val is Link => {
  const properties = [
    "href",
    "rel",
    "type",
    "crossOrigin",
    "as",
    "media",
    "integrity",
    "disabled",
    "sheet",
    "prefetch",
    "crossorigin",
    "sizes",
  ]

  for (const property in properties) {
    if (property in val) return true
  }
  return false
})

const zMeta = z.custom<Meta>((val: Meta): val is Meta => {
  const properties = [
    "name",
    "httpEquiv",
    "content",
    "scheme",
    "charset",
    "property",
  ]
  for (const property in properties) {
    if (property in val) return true
  }
  return false
})

const ExtendLinkSchema = zLink
const ExtendMetaSchema = zMeta

export const ExtendSchema = z.object({
  link: z.array(ExtendLinkSchema).optional(),
  meta: z.array(ExtendMetaSchema).optional(),
})
