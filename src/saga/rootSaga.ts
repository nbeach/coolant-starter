import {all, put, call} from "redux-saga/effects"
import {CoolantConfiguration} from "../model/CoolantConfiguration"
import {Build} from "../model/Build"
import {buildsLoadedAction} from "../model/action/BuildsLoadedAction"

const delay = (milliseconds: number) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

function* buildResolutionSaga(configuration: CoolantConfiguration) {
    while (true) {
        const builds: readonly Build[] = yield call(configuration.buildResolver)
        yield put(buildsLoadedAction({ builds }))
        yield call(delay, configuration.buildPollingIntervalMilliseconds)
    }
}

export const initializeRootSaga = (configuration: CoolantConfiguration) => {
    return function* rootSaga() {
        yield all([
            buildResolutionSaga(configuration),
        ])
    }
}
