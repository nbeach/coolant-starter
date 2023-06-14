import {Moment} from "moment"

export interface PullRequest {
    readonly repo: string
    readonly id: string
    readonly name: string
    readonly link: string
    readonly timeOpened: Moment
    readonly status: PullRequestStatus
    readonly reviewers: readonly Reviewer[]
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

