import React from "react"
import {Image} from "../images"

const centeredStyle = {
    display: "flex",
    height: "100%",
    alignItems: "flex-end",
    justifyContent: "center",
}

export const FailureOverlay = () => <div style={centeredStyle}>
    <img src={Image.DogLaughing} style={{height: "70%"}}/>
</div>
export const SuccessOverlay = () => <div style={centeredStyle}>
    <img src={Image.DogWithDucks} style={{height: "100%"}}/>
</div>
