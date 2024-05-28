import { BasicCache } from "@src/utils/basic-cache/basic-cache"
import { config } from "@config/config"
import { GithubRequestError } from "./errors"
import { languagesMeta } from "./language-meta"
import { Octokit } from "octokit"
import {
  type Languages,
  type LanguagesResponseData,
  type LanguagesConfig,
  type Repo,
  type RepoCacheEntry,
  Order,
} from "./types"
import type { OctokitResponse } from "@octokit/types"

export class GitHubRepository {
  private ownerName: string
  private repoName: string
  private _repo: Repo | undefined
  private _languages: Languages[] | undefined
  private langConfig: LanguagesConfig
  private octokit: Octokit
  private cache: BasicCache<RepoCacheEntry>

  constructor(
    ownerName: string,
    repoName: string,
    langConfig: LanguagesConfig = {
      defaultColor: "#f9cd08",
      orderBy: Order.Count,
    }
  ) {
    this.ownerName = ownerName
    this.repoName = repoName
    this.langConfig = langConfig
    this.octokit = new Octokit({
      auth: config.GITHUB_TOKEN,
    })
    this.cache = new BasicCache<RepoCacheEntry>({
      path: config.cache.github.PATH,
      dataPathRoot: config.cache.github.DATA_PATH_ROOT,
      ttl: config.cache.github.TTL,
    })
  }

  private async request<T>(
    url: string,
    data: Record<string, unknown> = {}
  ): Promise<OctokitResponse<T>> {
    const response = await this.octokit.request(url, data)
    if (response.status !== 200) {
      throw new GithubRequestError(
        `Request to <${url}> with data <${JSON.stringify(data)}> failed with status <${response.status}>`,
        response
      )
    }
    return response
  }

  private async getRepo(): Promise<Repo> {
    const response = await this.request<Repo>(
      `GET /repos/${this.ownerName}/${this.repoName}`,
      { owner: this.ownerName, repo: this.repoName }
    )

    return response.data
  }

  private async getLanguages(): Promise<Languages[]> {
    const response = await this.request<LanguagesResponseData>(
      `GET /repos/${this.ownerName}/${this.repoName}/languages`,
      { owner: this.ownerName, repo: this.repoName }
    )

    return Object.entries(response.data)
      .map(([name, count]) => ({
        name,
        count,
        color: languagesMeta[name]?.color ?? this.langConfig.defaultColor,
        url: languagesMeta[name]?.url ?? "",
      }))
      .sort((a, b) => {
        if (this.langConfig.orderBy === Order.Alphabetical) {
          return a.name.localeCompare(b.name)
        } else {
          return b.count - a.count
        }
      })
  }

  public async get(): Promise<Repo & { languages: Languages[] }> {
    const cacheEntry = await this.cache.get(
      `${this.ownerName}/${this.repoName}`
    )

    if (cacheEntry) {
      return {
        ...cacheEntry.repo,
        languages: cacheEntry.languages,
      }
    }

    this._repo = this._repo ?? (await this.getRepo())
    this._languages = this._languages ?? (await this.getLanguages())

    await this.cache.update(`${this.ownerName}/${this.repoName}`, {
      repo: this._repo,
      languages: this._languages,
    })

    return { ...this._repo, languages: this._languages }
  }
}
