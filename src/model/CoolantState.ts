import {Build} from "./Build"

export interface CoolantState {
    readonly name: string
    readonly logo?: string
    readonly builds: readonly Build[]
}
