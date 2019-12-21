import {BuildStatus, cachingProvider, Provider, PullRequest, PullRequestStatus} from "coolant"
import moment from "moment"

export const buildProvider = cachingProvider(() => {
    return Promise.resolve([{
        id: "1",
        number: Math.random().toString(),
        name: "master",
        status: Math.random() < 0.5 ? BuildStatus.Failed : BuildStatus.Passed,
    }])
}, 10)


export const pullRequestProvider: Provider<readonly PullRequest[]> = () => {
    return Promise.resolve([{
        id: "1",
        number: Math.random().toString(),
        name: "master",
        approvals: 2,
        timeOpened: moment("2019-08-05T12:00:00Z"),
        status: Math.random() < 0.5 ? PullRequestStatus.New : PullRequestStatus.ReadyToMerge,
    }])
}
