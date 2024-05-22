import _ from 'lodash'
import { PolkadotSdkSchema } from '@schemas/collections/polkadot-sdk'
import type { OGImageOptions } from "node_modules/astro-og-canvas/dist/types"
import type { ZodType } from "zod"

export type ContentCollection = {
  name: string
  label: string
  schema: ZodType
  tagline: string
  slug: string
  icon: string
  default?: boolean
  ogImage?: Omit<OGImageOptions, "title" | "description">
}

export const ContentCollections: Record<string, ContentCollection> = {
  "polkadot-sdk": {
    default: true,
    name: "polkadot-sdk",
    label: "Polkadot SDK",
    schema: PolkadotSdkSchema,
    tagline: "for appchain devs",
    slug: "polkadot-sdk",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1326.1 1410.3" fill="white">
    <ellipse cx="663" cy="147.9" rx="254.3" ry="147.9"/>
    <ellipse cx="663" cy="1262.3" rx="254.3" ry="147.9"/>
    <ellipse transform="matrix(0.5 -0.866 0.866 0.5 -279.1512 369.5916)" cx="180.5" cy="426.5" rx="254.3" ry="148"/>
    <ellipse transform="matrix(0.5 -0.866 0.866 0.5 -279.1552 1483.9517)" cx="1145.6" cy="983.7" rx="254.3" ry="147.9"/>
    <ellipse transform="matrix(0.866 -0.5 0.5 0.866 -467.6798 222.044)" cx="180.5" cy="983.7" rx="148" ry="254.3"/>
    <ellipse transform="matrix(0.866 -0.5 0.5 0.866 -59.8007 629.9254)" cx="1145.6" cy="426.6" rx="147.9" ry="254.3"/>
  </svg>`,
  },
}

function getDefaultContentCollectionName(): ContentCollectionKey {
  const defaultCollection = _.find(ContentCollections, { default: true })
  return defaultCollection
    ? defaultCollection.name
    : (_.keys(ContentCollections)[0] as ContentCollectionKey)
}

export const DefaultCollectionName = getDefaultContentCollectionName()
export type ContentCollectionKey = keyof typeof ContentCollections
