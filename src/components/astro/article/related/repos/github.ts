import { GitHubRepository } from "@src/utils/github/fetch-repo"
import { type Languages, type Repo } from "@src/utils/github/types"

type RepoData = Repo & { languages: Languages[] }

export const fetchRepos = async (
  repos: { owner: string; repo: string }[]
): Promise<RepoData[]> => {
  const repoData = repos.map(async ({ owner, repo }) => {
    const ghRepo = new GitHubRepository(owner, repo)
    const data = await ghRepo.get()
    return data
  })

  return Promise.all(repoData)
}
