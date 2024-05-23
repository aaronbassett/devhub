import _ from "lodash"
import { DappsSchema } from "@schemas/collections/content/dapps"
import { PolkadotSdkSchema } from "@schemas/collections/content/polkadot-sdk"
import { SmartContractsSchema } from "@schemas/collections/content/smart-contracts"
import type { OGImageOptions } from "node_modules/astro-og-canvas/dist/types"
import { PersonasSchema } from "@schemas/collections/data/personas"
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
  "smart-contracts": {
    name: "smart-contracts",
    label: "Smart Contracts",
    schema: SmartContractsSchema,
    tagline: "for ink! & Solidity devs",
    slug: "smart-contracts",
    icon: `<svg width="24" height="24" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke="white"><path d="M12.4846 4.61499H26.7098V9.94946V23.1078H12.4846V4.61499Z"></path><path d="M22.9999 8.68042H16.3901" stroke-miterlimit="10"></path><path d="M20.2458 12.6602H16.3901" stroke-miterlimit="10"></path><path d="M22.9999 19.3152H16.3901" stroke-miterlimit="10"></path><path d="M4.45978 14.1587L12.4465 14.1587" stroke-miterlimit="10" fill="none" data-nofill="true"></path><path d="M4.45977 5.18872L7.63774 5.18872L7.63774 23L4.45972 23" stroke-miterlimit="10" fill="none" data-nofill="true"></path><path d="M1.26074 5.18872L1.24995 5.18872"></path><path d="M1.26074 14.1587L1.24995 14.1587"></path><path d="M1.26074 23L1.24995 23"></path></svg>`,
  },
  dapps: {
    name: "dapps",
    label: "dApps",
    schema: DappsSchema,
    tagline: "for application devs",
    slug: "dapps",
    icon: `<svg width="24" height="24" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke="white"><g><path d="M14 4L6 4"></path><path d="M17.5976 5.5976L22.5161 10.5161"></path><path d="M4 17L4 6"></path><path d="M24 14L24 22"></path><path d="M12.5837 12.5837L5.84314 5.84314"></path><path d="M22.5171 22.5168L15.426 15.4258"></path><path d="M16 13.6001L22 12.2264"></path><path d="M14.4 12L15.5767 6.11652"></path><path d="M6 18L12 15"></path><path d="M5.84326 20L22 23.9999"></path><rect x="2" y="2" width="4" height="4" rx="2"></rect><rect x="26" y="26" width="4" height="4" rx="2" transform="rotate(-180 26 26)"></rect><rect x="2" y="17" width="4" height="4" rx="2"></rect><rect x="26" y="14" width="4" height="4" rx="2" transform="rotate(-180 26 14)"></rect><rect x="14" y="2" width="4" height="4" rx="2"></rect><rect x="16" y="16" width="4" height="4" rx="2" transform="rotate(-180 16 16)"></rect></g></svg>`,
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

export type DataCollection = {
  name: string
  label: string
  schema: ZodType
}

export const DataCollections: Record<string, DataCollection> = {
  personas: {
    name: "personas",
    label: "Personas",
    schema: PersonasSchema,
  },
}
