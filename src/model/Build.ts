import {BuildStatus} from "./BuildStatus"

export interface Build {
    readonly id: string
    readonly name: string
    readonly status: BuildStatus
}
