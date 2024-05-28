import type { OctokitResponse } from "@octokit/types"

export class GithubRequestError extends Error {
  name: "GithubRequestError"
  response: OctokitResponse<unknown>

  constructor(message: string, response: OctokitResponse<unknown>) {
    super(message)

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor)
    }

    this.name = "GithubRequestError"
    this.response = response
  }
}
