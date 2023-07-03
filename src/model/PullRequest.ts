import {Moment} from "moment"

export interface PullRequest {
    readonly id: string
    readonly repo: string
    readonly user: string
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
    ReadyToMerge,
    UnderReview,
    New,
    Draft,
}

