import React from "react"
import DangerZoneMusic from "url:./sounds/danger-zone.mp3"
import DogLaughingSound from "url:./sounds/dog-laughing.wav"
import {FailureOverlay, SuccessOverlay} from "./component/Overlays"
import DogWithDucksSound from "url:./sounds/dog-with-ducks.wav"
import {buildFailed, buildNowPassing, onNewBuild} from "./event/Build"
import {atTime} from "./event/Time"
import {playSound} from "./effect/Sound"
import {showOverlay} from "./effect/Overlay"
import {createRoot} from "react-dom/client"
import {PullRequests} from "./component/PullRequests"
import {Alerts} from "./component/Alerts"
import {Builds} from "./component/Builds"
import "bootstrap/dist/css/bootstrap.css"
import {TeamLogo} from "./component/TeamLogo"
import {examplePullRequestProvider} from "./providers/example/example-pull-request-provider"
import {exampleAlertProvider} from "./providers/example/example-alert-provider"
import {exampleBuildProvider} from "./providers/example/example-build-provider"
import {withCaching} from "./providers/core/provider"

atTime("15:49", () => playSound(DangerZoneMusic))

onNewBuild(exampleBuildProvider, (priorBuild, currentBuild) => {
    if (buildNowPassing(priorBuild, currentBuild)) {
        playSound(DogWithDucksSound)
        showOverlay(3, <SuccessOverlay/>)
    }
    if (buildFailed(currentBuild)) {
        playSound(DogLaughingSound)
        showOverlay(3, <FailureOverlay/>)
    }
})

const container = document.getElementById("root")
const root = createRoot(container!)
root.render(<>
    <div className="container-fluid">
        <div className="row align-items-start">
            <div className="col">
                <TeamLogo/>
            </div>
            <div className="col">
                <h2>Open Pull Requests</h2>
                <PullRequests provider={withCaching(60)(examplePullRequestProvider)}/>
            </div>
            <div className="col">
                <h2>Active Alerts</h2>
                <Alerts provider={withCaching(60)(exampleAlertProvider)}/>
            </div>
        </div>
        <div className="row align-items-start">
            <div className="col">
                <h2>Builds</h2>
                <Builds provider={withCaching(60)(exampleBuildProvider)}/>
            </div>
        </div>
    </div>
</>)

alert("Some Coolant features, such as sound, require the user to interaction with the page before the browser will allow them. Dismissing this message will count as that interaction and enable them.")
