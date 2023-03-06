import {Moment} from "moment"

export interface PullRequest {
    readonly id: string
    readonly name: string
    readonly timeOpened: Moment
    readonly approvals: number
    readonly status: PullRequestStatus
    readonly reviewers: ReadonlyArray<Reviewer>
}

export interface Reviewer {
    readonly name: string
    readonly approved: boolean
}

export enum PullRequestStatus {
    New,
    UnderReview,
    ReadyToMerge,
}

