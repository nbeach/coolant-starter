import {applyMiddleware, compose, createStore} from "redux"
import {initializeRootReducer} from "./reducer/rootReducer"
import {initializeRootSaga} from "./saga/rootSaga"
import createSagaMiddleware from "@redux-saga/core"
import {CoolantConfiguration} from "./model/CoolantConfiguration"

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const initializeStore = (configuration: CoolantConfiguration) => {
    const sagaMiddleware = createSagaMiddleware()
    const store = createStore(initializeRootReducer(configuration), composeEnhancers(applyMiddleware(sagaMiddleware)))
    sagaMiddleware.run(initializeRootSaga(configuration))

    return store
}
