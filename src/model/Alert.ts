import {Moment} from "moment"

export interface Alert {
    readonly id: string
    readonly application: string
    readonly title: string
    readonly link: string
    readonly severity: Severity
    readonly timeStarted: Moment
}

export enum Severity {
    High,
    Low,
}

