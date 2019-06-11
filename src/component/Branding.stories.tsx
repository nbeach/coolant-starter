import {storiesOf} from "@storybook/react"
import React from "react"
import {BrandingPresenter} from "./Branding"
import exampleLogo from "./example-logo.png"

storiesOf(BrandingPresenter.name, module)
    .add("name", () => <BrandingPresenter name={"Coolant Build Radiator"} />)
    .add("logo", () => <BrandingPresenter name={"Coolant Build Radiator"} logo={exampleLogo} />)
