import {PullRequest, PullRequestStatus, Reviewer} from "../../model/PullRequest"
import moment from "moment/moment"
import {cachingProvider, Provider} from "../../util/Provider"
import {
    getPullRequestsForUsers,
    GitHubIssuesSearchResult,
    GitHubRepo,
    GitHubSimplePullRequest,
    GitHubTeam,
    listPullRequestReviews,
    listPullRequests,
    listTeamMembers,
} from "./client"
import {uniqBy} from "ramda"

const getStatus = (pull: GitHubSimplePullRequest | GitHubIssuesSearchResult, reviews: readonly Reviewer[]) => {
    const approved = reviews.some(review => review.approved)
    const hasComments = reviews.length > 0

    if (pull.draft) { return PullRequestStatus.Draft }
    if (approved) { return PullRequestStatus.ReadyToMerge }
    if (hasComments) { return PullRequestStatus.UnderReview }
    return PullRequestStatus.New
}

const getReviews = async (repo: GitHubRepo, pullNumber: number, authToken: string): Promise<readonly Reviewer[]> => {
    const reviews = (await listPullRequestReviews(repo, pullNumber, authToken))
        .map(review => ({name: review.user?.login || "", approved: review.state === "APPROVED"}))
    return uniqBy(review => review.name + review.approved.toString(), reviews)
}


const toPullRequest = async (repo: GitHubRepo, pull: GitHubSimplePullRequest | GitHubIssuesSearchResult, authToken: string): Promise<PullRequest> => {
    const owner = pull.user?.login || ""
    const reviews = (await getReviews(repo, pull.number, authToken)).filter(review => review.name !== owner)
    return {
        repo: repo.repo,
        id: pull.number.toString(),
        user: owner,
        name: pull.title,
        link: pull.html_url,
        timeOpened: moment(pull.created_at),
        status: getStatus(pull, reviews),
        reviewers: reviews,
    }
}

const getPRsForRepo = async (repo: GitHubRepo, authToken: string): Promise<readonly PullRequest[]> => {
    const pulls = (await listPullRequests(repo, authToken))
        .filter(pull => pull.state === "open")

    return await Promise.all(pulls.map(async (pull) => toPullRequest(repo, pull, authToken)))
}

const getPRsForUsers = async (users: readonly string[], team: GitHubTeam, authToken: string) => {
    const pulls = (await getPullRequestsForUsers(users, authToken))
        .filter(pull => pull.repository_url.includes(`repos/${team.owner}`))


    return await Promise.all(pulls.map(async (pull) => {
        const repo = pull.repository_url.split("/").pop()!
        return toPullRequest({ owner: team.owner, repo }, pull, authToken)
    }))
}

export interface GitHubPullRequestProviderConfiguration {
    readonly authToken: string,
    readonly repos: readonly GitHubRepo[],
    readonly team: GitHubTeam,
}
export const pullRequestProvider = (configuration: GitHubPullRequestProviderConfiguration): Provider<readonly PullRequest[]> => {
    return  cachingProvider(async () => {
        const repoPulls = ( await Promise.all(configuration.repos.map(repo => getPRsForRepo(repo, configuration.authToken)))).flat()
        const users = (await listTeamMembers(configuration.team, configuration.authToken)).map(user => user.login)
        const teamPulls = (await getPRsForUsers(users, configuration.team, configuration.authToken))

        return uniqBy(pull => pull.id + pull.repo, [...repoPulls, ...teamPulls])
    }, 60 * 5)
}
