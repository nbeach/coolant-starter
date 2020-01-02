import ReactDOM from "react-dom"
import {TeamLogo} from "./components/TeamLogo"
import {
    atTime,
    buildFailed,
    BuildList,
    buildNowPassing,
    onNewBuild,
    playSound,
    Radiator,
    Muted,
    showOverlay,
} from "coolant"
import {buildProvider, pullRequestProvider} from "./providers"
import {PullRequestList} from "coolant/build/component/PullRequestList"
import React, {PropsWithChildren} from "react"
import DangerZoneMusic from "./sounds/danger-zone.mp3"
import DogLaughingSound from "./sounds/dog-laughing.wav"
import {FailureOverlay, SuccessOverlay} from "./components/Overlays"
import DogWithDucksSound from "./sounds/dog-with-ducks.wav"

atTime("15:49", () => playSound(DangerZoneMusic))

onNewBuild(buildProvider, (priorBuild, currentBuild) => {
    if (buildNowPassing(priorBuild, currentBuild)) {
        playSound(DogWithDucksSound)
        showOverlay(3, <SuccessOverlay/>)
    }
    if (buildFailed(currentBuild)) {
        playSound(DogLaughingSound)
        showOverlay(3, <FailureOverlay/>)
    }
})

const Column = (props: PropsWithChildren<{}>) => <div style={{flexGrow: 1 }}>{props.children}</div>

ReactDOM.render(<Radiator>
    <TeamLogo/>
    <Column>
        <BuildList provider={buildProvider}/>
        <h1><Muted>Open Pull Requests</Muted></h1>
        <PullRequestList provider={pullRequestProvider}/>
    </Column>
</Radiator>, document.getElementById("root"))

// alert("Some Coolant features, such as sound, require the user to interaction with the page before the browser will allow them. Dismissing this message will count as that interaction and enable them.")
