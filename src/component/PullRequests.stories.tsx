import {storiesOf} from "@storybook/react"
import React from "react"
import moment from "moment"
import {PullRequest, PullRequestStatus} from "../model/PullRequest"
import {PullRequestsPresenter} from "./PullRequests"

const pullRequests: readonly PullRequest[] = [
    { id: "1", repo: "some-repo", name: "Lorem ipsum",             timeOpened: moment("2023-02-05T12:00:00Z"), link: "https://www.google.com", status: PullRequestStatus.ReadyToMerge, reviewers: [{ name: "NB", approved: true}] },
    { id: "2", repo: "some-repo", name: "Dolor sit amet",          timeOpened: moment("2023-02-05T12:00:00Z"), link: "https://www.google.com", status: PullRequestStatus.UnderReview, reviewers: [{ name: "NB", approved: false}, { name: "CK", approved: true}] },
    { id: "3", repo: "some-repo", name: "Quis nostrud",            timeOpened: moment("2023-02-01T00:00:00Z"), link: "https://www.google.com", status: PullRequestStatus.UnderReview, reviewers: [] },
    { id: "4", repo: "some-repo", name: "Consectetur adipiscing",  timeOpened: moment("2023-02-01T00:00:00Z"), link: "https://www.google.com", status: PullRequestStatus.New, reviewers: []  },
    { id: "5", repo: "some-repo", name: "Duis aute irure",         timeOpened: moment("2023-02-01T00:00:00Z"), link: "https://www.google.com", status: PullRequestStatus.UnderReview, reviewers: []  },
    { id: "6", repo: "some-repo", name: "Non proident",            timeOpened: moment("2023-02-01T00:00:00Z"), link: "https://www.google.com", status: PullRequestStatus.UnderReview, reviewers: []  },
    { id: "7", repo: "some-repo", name: "Excepteur sint",          timeOpened: moment("2023-02-01T00:00:00Z"), link: "https://www.google.com", status: PullRequestStatus.ReadyToMerge, reviewers: []  },
    { id: "8", repo: "some-repo", name: "Officia deserunt",        timeOpened: moment("2023-02-05T00:00:00Z"), link: "https://www.google.com", status: PullRequestStatus.New, reviewers: []  },
]

storiesOf("PullRequests", module)
    .add("many pull requests", () => <PullRequestsPresenter data={pullRequests}/>)
    .add("no pull requests", () => <PullRequestsPresenter data={[]}/>)
