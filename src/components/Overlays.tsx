import React from "react"
import DogLaughingImage from "../images/dog-laughing.gif"
import DogWithDucksImage from "../images/dog-with-ducks.jpg"

const centeredStyle = {
    display: "flex",
    height: "100%",
    alignItems: "flex-end",
    justifyContent: "center",
}

export const FailureOverlay = () => <div style={centeredStyle}>
    <img src={DogLaughingImage} style={{height: "70%"}}/>
</div>
export const SuccessOverlay = () => <div style={centeredStyle}>
    <img src={DogWithDucksImage} style={{height: "100%"}}/>
</div>
