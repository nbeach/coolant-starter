export interface Build {
    readonly id: string
    readonly number: string
    readonly name: string
    readonly status: BuildStatus
}

export enum BuildStatus {
    Passed,
    ReadyToDeploy,
    Running,
    Failed ,
}
