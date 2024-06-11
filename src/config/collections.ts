import _ from 'lodash'
import { DappsSchema } from '@schemas/collections/content/dapps'
import { PersonasSchema } from '@schemas/collections/data/personas'
import { PolkadotSdkSchema } from '@schemas/collections/content/polkadot-sdk'
import { SmartContractsSchema } from '@schemas/collections/content/smart-contracts'
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
  additionalResources?: {
    label: string
    url: string
    icon: string
  }[]
}

export const ContentCollections: Record<string, ContentCollection> = {
  "polkadot-sdk": {
    default: true,
    name: "polkadot-sdk",
    label: "Polkadot SDK",
    schema: PolkadotSdkSchema,
    tagline: "for appchain devs",
    slug: "polkadot-sdk",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1326.1 1410.3" fill="currentColor">
    <ellipse cx="663" cy="147.9" rx="254.3" ry="147.9"/>
    <ellipse cx="663" cy="1262.3" rx="254.3" ry="147.9"/>
    <ellipse transform="matrix(0.5 -0.866 0.866 0.5 -279.1512 369.5916)" cx="180.5" cy="426.5" rx="254.3" ry="148"/>
    <ellipse transform="matrix(0.5 -0.866 0.866 0.5 -279.1552 1483.9517)" cx="1145.6" cy="983.7" rx="254.3" ry="147.9"/>
    <ellipse transform="matrix(0.866 -0.5 0.5 0.866 -467.6798 222.044)" cx="180.5" cy="983.7" rx="148" ry="254.3"/>
    <ellipse transform="matrix(0.866 -0.5 0.5 0.866 -59.8007 629.9254)" cx="1145.6" cy="426.6" rx="147.9" ry="254.3"/>
  </svg>`,
    additionalResources: [
      {
        label: "Rust Docs",
        url: "https://paritytech.github.io/polkadot-sdk/master/polkadot_sdk_docs/index.html",
        icon: `<svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      ><path
        fill="currentColor"
        d="m23.835 11.703l-1.008-.623l-.028-.294l.866-.807a.348.348 0 0 0-.116-.578l-1.106-.414a9 9 0 0 0-.087-.285l.69-.96a.346.346 0 0 0-.226-.544l-1.166-.19a9 9 0 0 0-.14-.261l.49-1.076a.34.34 0 0 0-.028-.336a.35.35 0 0 0-.3-.154l-1.185.041a7 7 0 0 0-.188-.227l.273-1.153a.347.347 0 0 0-.417-.417l-1.153.273l-.228-.188l.041-1.184a.344.344 0 0 0-.49-.328l-1.076.49l-.262-.14l-.19-1.167a.348.348 0 0 0-.545-.226l-.96.69a9 9 0 0 0-.285-.086L14.597.453a.348.348 0 0 0-.578-.116l-.807.867a9 9 0 0 0-.294-.028L12.295.168a.346.346 0 0 0-.59 0l-.623 1.008l-.294.028L9.98.337a.346.346 0 0 0-.578.116l-.414 1.106l-.285.086l-.959-.69a.348.348 0 0 0-.545.226l-.19 1.167a9 9 0 0 0-.262.14l-1.076-.49a.346.346 0 0 0-.49.328l.041 1.184a8 8 0 0 0-.228.187l-1.153-.272a.347.347 0 0 0-.417.417l.271 1.153l-.186.227l-1.184-.042a.346.346 0 0 0-.328.49l.49 1.077a9 9 0 0 0-.14.262l-1.166.19a.348.348 0 0 0-.226.544l.69.958l-.087.286l-1.106.414a.348.348 0 0 0-.116.578l.866.807a9 9 0 0 0-.028.294l-1.008.623a.344.344 0 0 0 0 .59l1.008.623q.012.147.028.294l-.866.807a.346.346 0 0 0 .116.578l1.106.415q.042.144.087.285l-.69.959a.345.345 0 0 0 .227.544l1.166.19q.069.132.14.262l-.49 1.076a.346.346 0 0 0 .328.49l1.183-.041q.093.115.187.227l-.27 1.154a.346.346 0 0 0 .416.417l1.153-.272q.113.096.228.187l-.041 1.184a.344.344 0 0 0 .49.327l1.076-.49q.13.073.262.14l.19 1.167a.348.348 0 0 0 .545.227l.959-.69a9 9 0 0 0 .285.086l.414 1.107a.345.345 0 0 0 .578.115l.808-.865l.294.03l.623 1.006a.347.347 0 0 0 .59 0l.623-1.007q.148-.013.294-.03l.807.866a.348.348 0 0 0 .578-.115l.414-1.107a9 9 0 0 0 .285-.087l.959.69a.345.345 0 0 0 .545-.226l.19-1.166l.262-.14l1.076.49a.347.347 0 0 0 .49-.328l-.041-1.184a7 7 0 0 0 .227-.187l1.153.272a.347.347 0 0 0 .417-.416l-.272-1.155q.095-.112.187-.227l1.184.041a.344.344 0 0 0 .328-.49l-.49-1.076q.072-.13.141-.262l1.166-.19a.348.348 0 0 0 .226-.544l-.69-.959l.087-.285l1.106-.414a.346.346 0 0 0 .116-.579l-.866-.807q.016-.147.028-.294l1.008-.624a.344.344 0 0 0 0-.589zm-6.742 8.355a.714.714 0 0 1 .299-1.396a.714.714 0 1 1-.3 1.396zm-.342-2.314a.65.65 0 0 0-.771.5l-.358 1.669a8.7 8.7 0 0 1-3.619.78a8.7 8.7 0 0 1-3.695-.815L7.95 18.21a.65.65 0 0 0-.772-.5l-1.473.317a9 9 0 0 1-.761-.898h7.167c.081 0 .136-.014.136-.088v-2.536c0-.074-.054-.088-.136-.088h-2.096v-1.608h2.268c.206 0 1.106.059 1.393 1.209c.09.353.288 1.504.424 1.873c.134.413.683 1.238 1.268 1.238h3.572a1 1 0 0 0 .13-.013a9 9 0 0 1-.813.952zm-9.914 2.28a.714.714 0 1 1-.3-1.396a.714.714 0 0 1 .3 1.396M4.117 8.997a.714.714 0 1 1-1.303.58a.714.714 0 0 1 1.304-.58m-.834 1.981l1.534-.682a.65.65 0 0 0 .33-.858l-.316-.715h1.244v5.602H3.567a8.8 8.8 0 0 1-.284-3.348zm6.734-.543V8.784h2.96c.153 0 1.08.177 1.08.87c0 .574-.712.78-1.296.78zm10.757 1.486q0 .329-.024.651h-.9c-.09 0-.127.059-.127.148v.413c0 .973-.548 1.184-1.03 1.238c-.457.052-.964-.191-1.027-.472c-.27-1.518-.72-1.843-1.43-2.403c.882-.56 1.799-1.386 1.799-2.492c0-1.193-.82-1.945-1.377-2.315c-.783-.516-1.65-.62-1.883-.62H5.468a8.77 8.77 0 0 1 4.907-2.77l1.098 1.152a.65.65 0 0 0 .918.02l1.227-1.173a8.78 8.78 0 0 1 6.004 4.276l-.84 1.898a.65.65 0 0 0 .33.859l1.618.718q.042.43.042.872zm-9.3-9.6a.713.713 0 1 1 .984 1.032a.714.714 0 0 1-.984-1.031m8.339 6.71a.71.71 0 0 1 .939-.362a.714.714 0 1 1-.94.364z"
      ></path></svg>`,
      },
      {
        label: "Awesome Substrate",
        url: "https://github.com/substrate-developer-hub/awesome-substrate/blob/master/README.md",
        icon: `<svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        ><path
          fill="currentColor"
          d="m24 11.438l-6.154-5.645l-.865.944l5.128 4.7H1.895l5.128-4.705l-.865-.943l-6.154 5.649H0v3.72c0 1.683 1.62 3.053 3.61 3.053h3.795c1.99 0 3.61-1.37 3.61-3.051v-2.446h1.97v2.446c0 1.68 1.62 3.051 3.61 3.051h3.794c1.99 0 3.61-1.37 3.61-3.051v-3.721z"
        ></path></svg>`,
      },
      {
        label: "Polkadot Wiki",
        url: "https://wiki.polkadot.network/docs/build-guide",
        icon: `<svg
        class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        ><path
          fill="currentColor"
          d="M1 3v14h3v-2H3V5h1V3zm4 0v14h4v-2H7V5h2V3zm11 0v2h1v10h-1v2h3V3zm-5 0v2h2v10h-2v2h4V3z"
        ></path></svg>`,
      },
      {
        label: "Polkadot{.js}",
        url: "https://polkadot.js.org/",
        icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="none"><path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"/><path fill="currentColor" d="M8 3a1 1 0 0 1 .117 1.993L8 5H7a1 1 0 0 0-.993.883L6 6v4c0 .768-.289 1.47-.764 2c.428.478.704 1.093.755 1.772L6 14v4a1 1 0 0 0 .883.993L7 19h1a1 1 0 0 1 .117 1.993L8 21H7a3 3 0 0 1-2.995-2.824L4 18v-4a1 1 0 0 0-.883-.993L3 13a1 1 0 0 1-.117-1.993L3 11a1 1 0 0 0 .993-.883L4 10V6a3 3 0 0 1 2.824-2.995L7 3zm9 0a3 3 0 0 1 2.995 2.824L20 6v4a1 1 0 0 0 .883.993L21 11a1 1 0 0 1 .117 1.993L21 13a1 1 0 0 0-.993.883L20 14v4a3 3 0 0 1-2.824 2.995L17 21h-1a1 1 0 0 1-.117-1.993L16 19h1a1 1 0 0 0 .993-.883L18 18v-4c0-.768.289-1.47.764-2a2.988 2.988 0 0 1-.755-1.772L18 10V6a1 1 0 0 0-.883-.993L17 5h-1a1 1 0 0 1-.117-1.993L16 3z"/></g></svg>`,
      },
    ],
  },
  "smart-contracts": {
    name: "smart-contracts",
    label: "Smart Contracts",
    schema: SmartContractsSchema,
    tagline: "for ink! & Solidity devs",
    slug: "smart-contracts",
    icon: `<svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke="currentColor"><path d="M12.4846 4.61499H26.7098V9.94946V23.1078H12.4846V4.61499Z"></path><path d="M22.9999 8.68042H16.3901" stroke-miterlimit="10"></path><path d="M20.2458 12.6602H16.3901" stroke-miterlimit="10"></path><path d="M22.9999 19.3152H16.3901" stroke-miterlimit="10"></path><path d="M4.45978 14.1587L12.4465 14.1587" stroke-miterlimit="10" fill="none" data-nofill="true"></path><path d="M4.45977 5.18872L7.63774 5.18872L7.63774 23L4.45972 23" stroke-miterlimit="10" fill="none" data-nofill="true"></path><path d="M1.26074 5.18872L1.24995 5.18872"></path><path d="M1.26074 14.1587L1.24995 14.1587"></path><path d="M1.26074 23L1.24995 23"></path></svg>`,
  },
  dapps: {
    name: "dapps",
    label: "dApps",
    schema: DappsSchema,
    tagline: "for application devs",
    slug: "dapps",
    icon: `<svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke="currentColor"><g><path d="M14 4L6 4"></path><path d="M17.5976 5.5976L22.5161 10.5161"></path><path d="M4 17L4 6"></path><path d="M24 14L24 22"></path><path d="M12.5837 12.5837L5.84314 5.84314"></path><path d="M22.5171 22.5168L15.426 15.4258"></path><path d="M16 13.6001L22 12.2264"></path><path d="M14.4 12L15.5767 6.11652"></path><path d="M6 18L12 15"></path><path d="M5.84326 20L22 23.9999"></path><rect x="2" y="2" width="4" height="4" rx="2"></rect><rect x="26" y="26" width="4" height="4" rx="2" transform="rotate(-180 26 26)"></rect><rect x="2" y="17" width="4" height="4" rx="2"></rect><rect x="26" y="14" width="4" height="4" rx="2" transform="rotate(-180 26 14)"></rect><rect x="14" y="2" width="4" height="4" rx="2"></rect><rect x="16" y="16" width="4" height="4" rx="2" transform="rotate(-180 16 16)"></rect></g></svg>`,
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
