import {components} from "@octokit/openapi-types"
import {Octokit} from "@octokit/rest"

const makeClient = (authToken: string) => new Octokit({ auth: authToken })
export interface GitHubRepo {
    readonly owner: string
    readonly repo: string
}

export interface GitHubTeam {
    readonly owner: string
    readonly name: string
}

export const listPRs = async (repo: GitHubRepo, authToken: string): Promise<ReadonlyArray<components["schemas"]["pull-request-simple"]>> => {
    return (await makeClient(authToken).rest.pulls.list({ ...repo })).data
}

export const listReviews = async (repo: GitHubRepo, pullNumber: number, authToken: string): Promise<ReadonlyArray<components["schemas"]["pull-request-review"]>> => {
    return (await  makeClient(authToken).rest.pulls.listReviews({ ...repo, pull_number: pullNumber })).data
}

