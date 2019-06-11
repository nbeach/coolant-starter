import {Action} from "redux"
import {defaultState} from "./default-state"
import {CoolantState} from "../model/CoolantState"
import {CoolantConfiguration} from "../model/CoolantConfiguration"
import {isAction} from "../util/action-util"
import {buildsLoadedAction} from "../model/action/BuildsLoadedAction"

export const initializeRootReducer = (configuration: CoolantConfiguration) => {
    return (previousState: CoolantState = defaultState(configuration), action: Action): CoolantState => {
        if (isAction(buildsLoadedAction, action)) {
            return {
                ...previousState,
                builds: action.builds,
            }
        }

        return previousState
    }
}

