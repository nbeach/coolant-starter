import {components} from "@octokit/openapi-types"
import {getSecret, isSecretReference, Secret} from "../core/secret"
import {Octokit, RestEndpointMethodTypes} from "@octokit/rest"

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
    readonly team: string
}

export type GitHubSimplePullRequest = components["schemas"]["pull-request-simple"]
export type GitHubPullRequestReview = components["schemas"]["pull-request-review"]
export type GitHubIssuesSearchResult = RestEndpointMethodTypes["search"]["issuesAndPullRequests"]["response"]["data"]["items"][number]
export type GitHubUser = RestEndpointMethodTypes["teams"]["listMembersInOrg"]["response"]["data"]

export const listPullRequests = async (repo: GitHubRepo, authToken: Secret): Promise<readonly GitHubSimplePullRequest[]> => {
    const client = await makeClient(authToken)
    return (await client.rest.pulls.list({ ...repo })).data
}

export const listPullRequestReviews = async (repo: GitHubRepo, pullNumber: number, authToken: Secret): Promise<readonly GitHubPullRequestReview[]> => {
    const client = await makeClient(authToken)
    return (await client.rest.pulls.listReviews({ ...repo, pull_number: pullNumber })).data
}

export const listTeamMembers = async (team: GitHubTeam, authToken: Secret): Promise<GitHubUser> => {
    const client = await makeClient(authToken)
    return (await client.rest.teams.listMembersInOrg({ org: team.owner, team_slug: team.team })).data
}

export const getPullRequestsForUsers = async (users: readonly string[], authToken: Secret): Promise<readonly GitHubIssuesSearchResult[]> => {
    const client = await makeClient(authToken)
    const queryFragments = users.map(user => `author:${user}`).join(" ")
    return (await client.rest.search.issuesAndPullRequests({q: `is:pr is:open ${queryFragments}`})).data.items
}
