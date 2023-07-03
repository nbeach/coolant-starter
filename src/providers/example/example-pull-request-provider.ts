import {Provider} from "../core/provider"
import {PullRequest, PullRequestStatus} from "../../model/PullRequest"
import moment from "moment/moment"

export const examplePullRequestProvider: Provider<readonly PullRequest[]> = () => {
    return Promise.resolve([
        {
            id: "1",
            repo: "SomeService",
            link: "https://www.google.com",
            user: "John Doe",
            name: "9675309 - Add the things",
            timeOpened: moment("2019-12-21T12:00:00Z"),
            status: Math.random() < 0.5 ? PullRequestStatus.New : PullRequestStatus.ReadyToMerge,
            reviewers: [{ name: "NB", approved: false}],
        },
        {
            id: "2",
            repo: "SomeService",
            link: "https://www.google.com",
            user: "Sally Doe",
            name: "9675309 - Add the things",
            timeOpened: moment("2019-12-21T16:00:00Z"),
            status: PullRequestStatus.New,
            reviewers: [{ name: "NB", approved: true}],
        },
        {
            id: "3",
            repo: "SomeOtherService",
            link: "https://www.google.com",
            user: "Santa Doe",
            name: "9675309 - Add the things",
            timeOpened: moment("2019-12-20T12:00:00Z"),
            status: PullRequestStatus.UnderReview,
            reviewers: [{ name: "NB", approved: false}],
        },
    ])
}
