import {Build} from "./Build"
import {BuildStatus} from "./BuildStatus"

export interface CoolantConfiguration {
    readonly name: string
    readonly logo?: string
    readonly buildResolver: () => Promise<ReadonlyArray<Build>>
    readonly onBuildCompletion?: (build: Build, oldStatus: BuildStatus, newStatus: BuildStatus) => void
}
