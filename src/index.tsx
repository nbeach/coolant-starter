import React from "react"
import ReactDOM from "react-dom"
import {Branding} from "coolant/build/component/Branding"
import {
    atTime,
    Build,
    BuildList,
    BuildStatus,
    onBuildStatusChange,
    buildNowPassing,
    playSound, buildNowFailing,
} from "coolant"
// @ts-ignore
import logo from "./logo.png"
// @ts-ignore
import gotDucks from "./sounds/got-ducks.wav"
// @ts-ignore
import dogLaugh from "./sounds/dog-laugh.wav"
// @ts-ignore
import dangerZone from "./sounds/danger-zone.mp3"


let buildPassing = BuildStatus.Failed

setInterval(() => { buildPassing = Math.random() < 0.5 ? BuildStatus.Failed : BuildStatus.Passed}, 1000)
const buildProvider = async (): Promise<ReadonlyArray<Build>> => {
   return Promise.resolve([{
            id: "1",
            name: "master",
            status: buildPassing,
        }])
}

atTime("15:49", () => playSound(dangerZone))

onBuildStatusChange(buildProvider, (priorBuild, currentBuild) => {
    if (buildNowPassing(priorBuild, currentBuild)) { playSound(gotDucks) }
    if (buildNowFailing(priorBuild, currentBuild)) { playSound(dogLaugh) }
})

ReactDOM.render(<>
    <Branding><img src={logo} style={{maxWidth: "40vw"}}/></Branding>
    <BuildList provider={buildProvider}/>
</>, document.getElementById("root"))
