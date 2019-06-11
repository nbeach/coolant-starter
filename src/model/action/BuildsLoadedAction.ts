import {createActionFactory} from "../../util/action-util"
import {Build} from "../Build"

export interface BuildsLoadedAction {
    readonly builds: readonly Build[]
}

export const buildsLoadedAction = createActionFactory<BuildsLoadedAction>("BUILDS_LOADED_ACTION")
