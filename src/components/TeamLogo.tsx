import {Branding} from "coolant/build/component/Branding"
import React from "react"
import {Image} from "../images"

export const TeamLogo = () => <Branding>
    <img src={Image.TeamLogo} style={{maxWidth: "40vw"}}/>
</Branding>
