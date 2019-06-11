import {all, put, call} from "redux-saga/effects"
import {CoolantConfiguration} from "../model/CoolantConfiguration"
import {Build} from "../model/Build"
import {buildsLoadedAction} from "../model/action/BuildsLoadedAction"

function* buildResolutionSaga(configuration: CoolantConfiguration) {
    const builds: readonly Build[] = yield call(configuration.buildResolver)
    yield put(buildsLoadedAction({ builds }))
}

export const initializeRootSaga = (configuration: CoolantConfiguration) => {
    return function* rootSaga() {
        yield all([
            buildResolutionSaga(configuration),
        ])
    }
}
