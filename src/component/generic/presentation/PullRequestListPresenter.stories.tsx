import {PullRequestListPresenter} from "./PullRequestListPresenter"
import {storiesOf} from "@storybook/react"
import React from "react"
import moment from "moment"
import {Radiator} from "../Radiator"
import {PullRequest, PullRequestStatus} from "../../../model/PullRequest"

const pullRequests: readonly PullRequest[] = [
    { id: "1", name: "Lorem ipsum",             timeOpened: moment("2023-02-05T12:00:00Z"), approvals: 0, status: PullRequestStatus.ReadyToMerge, reviewers: [{ name: "NB", approved: true}] },
    { id: "2", name: "Dolor sit amet",          timeOpened: moment("2023-02-05T12:00:00Z"), approvals: 1, status: PullRequestStatus.UnderReview, reviewers: [{ name: "NB", approved: false}, { name: "CK", approved: true}] },
    { id: "3", name: "Quis nostrud",            timeOpened: moment("2023-02-01T00:00:00Z"), approvals: 2, status: PullRequestStatus.UnderReview, reviewers: [] },
    { id: "4", name: "Consectetur adipiscing",  timeOpened: moment("2023-02-01T00:00:00Z"), approvals: 0, status: PullRequestStatus.New, reviewers: []  },
    { id: "5", name: "Duis aute irure",         timeOpened: moment("2023-02-01T00:00:00Z"), approvals: 1, status: PullRequestStatus.UnderReview, reviewers: []  },
    { id: "6", name: "Non proident",            timeOpened: moment("2023-02-01T00:00:00Z"), approvals: 3, status: PullRequestStatus.UnderReview, reviewers: []  },
    { id: "7", name: "Excepteur sint",          timeOpened: moment("2023-02-01T00:00:00Z"), approvals: 4, status: PullRequestStatus.ReadyToMerge, reviewers: []  },
    { id: "8", name: "Officia deserunt",        timeOpened: moment("2023-02-05T00:00:00Z"), approvals: 0, status: PullRequestStatus.New, reviewers: []  },
]

storiesOf("PullRequestListPresenter", module)
    .addDecorator((story) => <Radiator>{story()}</Radiator>)
    .add("many pull requests", () => <PullRequestListPresenter data={pullRequests}/>)
    .add("no pull requests", () => <PullRequestListPresenter data={[]}/>)
