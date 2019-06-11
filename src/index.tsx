import React from "react"
import ReactDOM from "react-dom"

import "./style/index.scss"
import * as serviceWorker from "./serviceWorker"
import {Coolant} from "./component/Coolant"
import {configuration} from "./config"
import {Branding} from "./component/Branding"
import {BuildList} from "./component/build/BuildList"

ReactDOM.render(<Coolant configuration={configuration}>
    <Branding/>
    <BuildList/>
</Coolant>, document.getElementById("root"))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
