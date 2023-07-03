import {components} from "@octokit/openapi-types"
import {Octokit, RestEndpointMethodTypes} from "@octokit/rest"

const makeClient = (authToken: string) => new Octokit({ auth: authToken })
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

export const listPullRequests = async (repo: GitHubRepo, authToken: string): Promise<readonly GitHubSimplePullRequest[]> => {
    return (await makeClient(authToken).rest.pulls.list({ ...repo })).data
}

export const listPullRequestReviews = async (repo: GitHubRepo, pullNumber: number, authToken: string): Promise<readonly GitHubPullRequestReview[]> => {
    return (await  makeClient(authToken).rest.pulls.listReviews({ ...repo, pull_number: pullNumber })).data
}

export const listTeamMembers = async (team: GitHubTeam, authToken: string): Promise<GitHubUser> => {
    return (await makeClient(authToken).rest.teams.listMembersInOrg({ org: team.owner, team_slug: team.team })).data
}

export const getPullRequestsForUsers = async (users: readonly string[], authToken: string): Promise<readonly GitHubIssuesSearchResult[]> => {
    const queryFragments = users.map(user => `author:${user}`).join(" ")
    return (await makeClient(authToken).rest.search.issuesAndPullRequests({q: `is:pr is:open ${queryFragments}`})).data.items
}