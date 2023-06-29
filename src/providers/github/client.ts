import {components} from "@octokit/openapi-types"
import {Octokit} from "@octokit/rest"
import {getSecret, isSecretReference, Secret} from "../core/secret"

const makeClient = async (authToken: Secret) => {
    const resolvedToken = isSecretReference(authToken) ? await getSecret(authToken) : authToken
    return new Octokit({ auth: resolvedToken })
}
export interface GitHubRepo {
    readonly owner: string
    readonly repo: string
}

export interface GitHubTeam {
    readonly owner: string
    readonly name: string
}

export const listPRs = async (repo: GitHubRepo, authToken: Secret): Promise<ReadonlyArray<components["schemas"]["pull-request-simple"]>> => {
    const client = await makeClient(authToken)
    return (await client.rest.pulls.list({ ...repo })).data
}

export const listReviews = async (repo: GitHubRepo, pullNumber: number, authToken: Secret): Promise<ReadonlyArray<components["schemas"]["pull-request-review"]>> => {
    const client = await makeClient(authToken)
    return (await client.rest.pulls.listReviews({ ...repo, pull_number: pullNumber })).data
}

