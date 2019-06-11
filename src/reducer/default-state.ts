import {CoolantState} from "../model/CoolantState"
import {CoolantConfiguration} from "../model/CoolantConfiguration"

export const defaultState = (configuration: CoolantConfiguration): CoolantState => ({
    name: configuration.name,
    logo: configuration.logo,
    builds: [],
})
