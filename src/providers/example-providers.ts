import {cachingProvider, Provider} from "../util/Provider"
import {BuildStatus} from "../model/Build"
import {PullRequest, PullRequestStatus} from "../model/PullRequest"
import moment from "moment"
import {Alert, Severity} from "../model/Alert"

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
            repo: "SomeService",
            link: "https://www.google.com",
            name: "9675309 - Add the things",
            timeOpened: moment("2019-12-21T12:00:00Z"),
            status: Math.random() < 0.5 ? PullRequestStatus.New : PullRequestStatus.ReadyToMerge,
            reviewers: [{ name: "NB", approved: false}],
        },
        {
            id: "2",
            repo: "SomeService",
            link: "https://www.google.com",
            name: "9675309 - Add the things",
            timeOpened: moment("2019-12-21T16:00:00Z"),
            status: PullRequestStatus.New,
            reviewers: [{ name: "NB", approved: true}],
        },
        {
            id: "3",
            repo: "SomeOtherService",
            link: "https://www.google.com",
            name: "9675309 - Add the things",
            timeOpened: moment("2019-12-20T12:00:00Z"),
            status: PullRequestStatus.UnderReview,
            reviewers: [{ name: "NB", approved: false}],
        },
    ])
}

export const alertProvider: Provider<readonly Alert[]> = () => {
    return Promise.resolve([
        {
            id: "1",
            application: "SomeService",
            link: "https://www.google.com",
            title: "Thing done be messed up",
            severity: Severity.Low,
            timeStarted: moment("2019-12-21T12:00:00Z"),
        },
        {
            id: "2",
            application: "SomeService",
            link: "https://www.google.com",
            title: "This is fine",
            severity: Severity.Low,
            timeStarted: moment("2019-12-21T16:00:00Z"),
        },
        {
            id: "3",
            application: "SomeOtherService",
            link: "https://www.google.com",
            title: "PANIC!",
            severity: Severity.High,
            timeStarted: moment("2019-12-20T12:00:00Z"),
        },
    ])
}
