import {playSound, showOverlay} from "coolant"
import React from "react"
import {Sound} from "./sounds"
import {FailureOverlay, SuccessOverlay} from "./components/Overlays"

export const doFailureShaming = () => {
    playSound(Sound.DogLaughing)
    showOverlay(3, <FailureOverlay/>)
}

export const doSuccessExclamation = () => {
    playSound(Sound.DogWithDucks)
    showOverlay(3, <SuccessOverlay/>)
}
