import {CoolantState} from "../model/CoolantState"
import {CoolantConfiguration} from "../model/CoolantConfiguration"

export const defaultState = (configuration: CoolantConfiguration): CoolantState => ({
    builds: [],
})
