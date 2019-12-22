import ReactDOM from "react-dom"
import {TeamLogo} from "./components/TeamLogo"
import {atTime, buildFailed, BuildList, buildNowPassing, onNewBuild, playSound, Radiator, Muted} from "coolant"
import {buildProvider, pullRequestProvider} from "./providers"
import {PullRequestList} from "coolant/build/component/PullRequestList"
import React from "react"
import {Sound} from "./sounds"
import {doFailureShaming, doSuccessExclamation} from "./action"
import styled from "styled-components";

atTime("15:49", () => playSound(Sound.DangerZone))

onNewBuild(buildProvider, (priorBuild, currentBuild) => {
    if (buildNowPassing(priorBuild, currentBuild)) { doSuccessExclamation() }
    if (buildFailed(currentBuild)) { doFailureShaming() }
})

const Column = styled.div`flex-grow: 1;`

ReactDOM.render(<Radiator>
    <TeamLogo/>
    <Column>
        <BuildList provider={buildProvider}/>
        <h1><Muted>Open Pull Requests</Muted></h1>
        <PullRequestList provider={pullRequestProvider}/>
    </Column>
</Radiator>, document.getElementById("root"))

// alert("Some Coolant features, such as sound, require the user to interaction with the page before the browser will allow them. Dismissing this message will count as that interaction and enable them.")
