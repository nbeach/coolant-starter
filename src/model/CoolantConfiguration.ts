import {Build} from "./Build"
import {BuildStatus} from "./BuildStatus"

export interface CoolantConfiguration {
    readonly buildResolver: () => Promise<ReadonlyArray<Build>>
    readonly onBuildCompletion?: (build: Build, oldStatus: BuildStatus, newStatus: BuildStatus) => void
    readonly buildPollingIntervalMilliseconds: number,
}
