import {BuildStatus, cachingProvider, Provider, PullRequest, PullRequestStatus} from "coolant"
import moment from "moment"

export const buildProvider = cachingProvider(() => {
    return Promise.resolve([
        {
            id: "1",
            number: Math.random().toString(),
            name: "Server",
            status: Math.random() < 0.5 ? BuildStatus.Failed : BuildStatus.Passed,
        },
        {
            id: "2",
            number: "1",
            name: "Frontend",
            status: BuildStatus.Failed,
        },
        {
            id: "3",
            number: "1",
            name: "Admin",
            status: BuildStatus.Passed,
        },
    ])
}, 10)


export const pullRequestProvider: Provider<readonly PullRequest[]> = () => {
    return Promise.resolve([
        {
            id: "1",
            name: "9675309 - Add the things",
            approvals: 2,
            timeOpened: moment("2019-12-21T12:00:00Z"),
            status: Math.random() < 0.5 ? PullRequestStatus.New : PullRequestStatus.ReadyToMerge,
        },
        {
            id: "2",
            name: "9675309 - Add the things",
            approvals: 2,
            timeOpened: moment("2019-12-21T16:00:00Z"),
            status: PullRequestStatus.New,
        },
        {
            id: "3",
            name: "9675309 - Add the things",
            approvals: 2,
            timeOpened: moment("2019-12-20T12:00:00Z"),
            status: PullRequestStatus.ReadyToMerge,
        },
    ])
}
