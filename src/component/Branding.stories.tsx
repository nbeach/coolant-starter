import {storiesOf} from "@storybook/react"
import React from "react"
import {Branding} from "./Branding"
import exampleLogo from "./example-logo.png"

storiesOf(Branding.name, module)
    .add("name", () => <Branding><h1>Coolant Build Radiator</h1></Branding>)
    .add("logo", () => <Branding><img src={exampleLogo}/></Branding>)
