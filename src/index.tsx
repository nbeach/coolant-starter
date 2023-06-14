import {TeamLogo} from "./component/TeamLogo"
import React, {PropsWithChildren} from "react"
import DangerZoneMusic from "url:./sounds/danger-zone.mp3"
import DogLaughingSound from "url:./sounds/dog-laughing.wav"
import {FailureOverlay, SuccessOverlay} from "./component/Overlays"
import DogWithDucksSound from "url:./sounds/dog-with-ducks.wav"
import {buildFailed, buildNowPassing, onNewBuild} from "./event/Build"
import {atTime} from "./event/Time"
import {Muted, Radiator} from "./component/generic/Radiator"
import {BuildList} from "./component/generic/BuildList"
import {PullRequestList} from "./component/generic/PullRequestList"
import {playSound} from "./effect/Sound"
import {showOverlay} from "./effect/Overlay"
import {createRoot} from "react-dom/client"
import {buildProvider, pullRequestProvider} from "./providers/example-providers"

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

const Column = (props: PropsWithChildren<any>) => <div style={{flexGrow: 1 }}>{props.children}</div>

const container = document.getElementById("root")
const root = createRoot(container!)
root.render(<Radiator>
    <TeamLogo/>
    <Column>
        <BuildList provider={buildProvider}/>
        <h1><Muted>Open Pull Requests</Muted></h1>
        <PullRequestList provider={pullRequestProvider}/>
    </Column>
</Radiator>)

alert("Some Coolant features, such as sound, require the user to interaction with the page before the browser will allow them. Dismissing this message will count as that interaction and enable them.")
