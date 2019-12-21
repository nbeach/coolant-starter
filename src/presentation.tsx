import ReactDOM from "react-dom"
import {BuildList} from "coolant"
import {buildProvider, pullRequestProvider} from "./providers"
import {PullRequestList} from "coolant/build/component/PullRequestList"
import React from "react"
import {TeamLogo} from "./components/TeamLogo"

ReactDOM.render(<>
    <TeamLogo/>
    <BuildList provider={buildProvider}/>
    <PullRequestList provider={pullRequestProvider}/>
</>, document.getElementById("root"))

