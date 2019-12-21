import {atTime, buildFailed, buildNowPassing, onNewBuild, playSound} from "coolant"
import {buildProvider} from "./providers"
import {showOverlay} from "coolant/build/effect/Overlay"
import {FailureOverlay, SuccessOverlay} from "./components/overlays"
import React from "react"
import {Sound} from "./sounds"

const doFailureShaming = () => {
    playSound(Sound.DogLaughing)
    showOverlay(3, <FailureOverlay/>)
}

const doSuccessExclamation = () => {
    playSound(Sound.DogWithDucks)
    showOverlay(3, <SuccessOverlay/>)
}

onNewBuild(buildProvider, (priorBuild, currentBuild) => {
    if (buildNowPassing(priorBuild, currentBuild)) { doSuccessExclamation() }
    if (buildFailed(currentBuild)) { doFailureShaming() }
})

atTime("15:49", () => playSound(Sound.DangerZone))
