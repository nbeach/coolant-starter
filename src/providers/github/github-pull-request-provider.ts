import {PullRequest, PullRequestStatus, Reviewer} from "../../model/PullRequest"
import moment from "moment/moment"
import {ProviderConfigurator} from "../core/provider"
import {GitHubRepo, GitHubTeam, listPRs, listReviews} from "./client"
import {uniqBy} from "ramda"
import {Secret} from "../core/secret"

const getStatus = (reviews: readonly Reviewer[]) => {
    const approved = reviews.some(review => review.approved)
    const hasComments = reviews.length > 0

    if (approved) { return PullRequestStatus.ReadyToMerge }
    if (hasComments) { return PullRequestStatus.UnderReview }
    return PullRequestStatus.New
}

const getReviews = async (repo: GitHubRepo, pullNumber: number, authToken: Secret): Promise<readonly Reviewer[]> => {
    const reviews = (await listReviews(repo, pullNumber, authToken))
        .map(review => ({name: review.user?.login || "", approved: review.state === "APPROVED"}))
    return uniqBy(review => review.name + review.approved.toString(), reviews)
}

const getPRsForRepo = async (repo: GitHubRepo, authToken: Secret ): Promise<readonly PullRequest[]> => {
    const prList = (await listPRs(repo, authToken))
        .filter(pull => pull.state === "open")

    return await Promise.all(prList.map(async (pull) => {
        const reviews = await getReviews(repo, pull.number, authToken)

        return {
            repo: repo.repo,
            id: pull.number.toString(),
            name: pull.title,
            link: pull.html_url,
            timeOpened: moment(pull.created_at),
            status: getStatus(reviews),
            reviewers: reviews,
        }
    })) as readonly PullRequest[]
}

export interface GithubPullRequestProviderConfiguration {
    readonly authToken: Secret,
    readonly repos: readonly GitHubRepo[],
    readonly teams: readonly GitHubTeam[],
}
export const githubPullRequestProvider: ProviderConfigurator<GithubPullRequestProviderConfiguration, readonly PullRequest[]> = (configuration) => {
    return async () => {
        const pulls = configuration.repos.map(repo => getPRsForRepo(repo, configuration.authToken))
        return (await Promise.all(pulls)).flat()
    }
}
