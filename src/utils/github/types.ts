import { Octokit } from "octokit"
import type {
  GetResponseTypeFromEndpointMethod,
  GetResponseDataTypeFromEndpointMethod,
} from "@octokit/types"

import type { CacheEntry } from "@src/utils/basic-cache/types"

const octokit = new Octokit()

export type Repo = GetResponseDataTypeFromEndpointMethod<
  typeof octokit.rest.repos.get
>

export type LanguagesResponseData = GetResponseDataTypeFromEndpointMethod<
  typeof octokit.rest.repos.listLanguages
>

export type Languages = {
  name: string
  count: number
  color: string
  url: string
}

export enum Order {
  Alphabetical,
  Count,
}

export type LanguagesConfig = {
  defaultColor: string
  orderBy: Order
}

export interface RepoCacheEntry extends CacheEntry {
  repo: Repo
  languages: Languages[]
}
