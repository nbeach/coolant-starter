import React from "react"
import ReactDOM from "react-dom"
import {Branding} from "coolant/build/component/Branding"
import {atTime, Build, buildFailed, BuildList, buildNowPassing, BuildStatus, onNewBuild, playSound} from "coolant"
// @ts-ignore
import logo from "./images/team-logo.png"
// @ts-ignore
import dogLaughingImage from "./images/dog-laugh.gif"
// @ts-ignore
import dogWithDucks from "./images/dog-with-duck.jpg"
// @ts-ignore
import gotDucks from "./sounds/got-ducks.wav"
// @ts-ignore
import dogLaugh from "./sounds/dog-laugh.wav"
// @ts-ignore
import dangerZone from "./sounds/danger-zone.mp3"
import {showOverlay} from "coolant/build/effect/overlay"


let buildPassing = BuildStatus.Failed

setInterval(() => { buildPassing = Math.random() < 0.5 ? BuildStatus.Failed : BuildStatus.Passed}, 1000)
const buildProvider = async (): Promise<ReadonlyArray<Build>> => {
   return Promise.resolve([{
            id: "1",
            number: Math.random().toString(),
            name: "master",
            status: buildPassing,
        }])
}

atTime("15:49", () => playSound(dangerZone))

const failureOverlay = <div style={{ display: "flex",  height: "100%", alignItems: "flex-end", justifyContent: "center" }}>
    <img src={dogLaughingImage} style={{height: "70%"}}/>
</div>
const successOverlay = <div style={{ display: "flex",  height: "100%", alignItems: "flex-end", justifyContent: "center" }}>
    <img src={dogWithDucks} style={{height: "100%"}}/>
</div>

onNewBuild(buildProvider, (priorBuild, currentBuild) => {
    if (buildNowPassing(priorBuild, currentBuild)) {
        playSound(gotDucks)
        showOverlay(3, successOverlay)
    }
    if (buildFailed(currentBuild)) {
        playSound(dogLaugh)
        showOverlay(3, failureOverlay)
    }
})

ReactDOM.render(<>
    <Branding><img src={logo} style={{maxWidth: "40vw"}}/></Branding>
    <BuildList provider={buildProvider}/>
</>, document.getElementById("root"))
