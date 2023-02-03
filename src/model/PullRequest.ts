import {Moment} from "moment"

export interface PullRequest {
    readonly id: string,
    readonly name: string,
    readonly timeOpened: Moment,
    readonly approvals: number,
    readonly status: PullRequestStatus
}

export enum PullRequestStatus {
    New,
    UnderReview,
    ReadyToMerge,
}

