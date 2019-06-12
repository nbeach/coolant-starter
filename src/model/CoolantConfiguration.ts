import {Build} from "./Build"
import {BuildStatus} from "./BuildStatus"

export type BuildResolver = () => Promise<ReadonlyArray<Build>>

export interface CoolantConfiguration {
    readonly buildResolver: BuildResolver
    readonly onBuildCompletion?: (build: Build, oldStatus: BuildStatus, newStatus: BuildStatus) => void
    readonly buildPollingIntervalMilliseconds: number,
}
