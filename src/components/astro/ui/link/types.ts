import { type ContentCollectionKey } from "astro:content"
import type { InternalLink, ExternalLink } from "@schemas/links"
import type { HTMLAttributes } from "astro/types"
import type { AstroBuiltinAttributes } from "astro"

/**
 * The Link component needs to accept both types as Props
 * So we must allow href, collection, slug to be potentially undefined
 * Also it might use a <slot /> instead of providing text so make that optional as well.
 **/

export type LinkProps = {
  href?: string
  text?: string
  collection?: ContentCollectionKey
  slug?: string
  newTab?: boolean
  validate?: boolean
  "class:list"?:
    | string
    | Record<string, boolean>
    | Record<any, any>
    | Iterable<string>
    | Iterable<any>
    | undefined
}
