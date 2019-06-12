import React from "react"
import {storiesOf} from "@storybook/react"
import {BuildCard} from "./BuildCard"
import {Build} from "../model/Build"
import {BuildStatus} from "../model/BuildStatus"

const passingState: Build = {
    id: "1",
    name: "Example Project",
    status: BuildStatus.Passed,
}

const runningState: Build = {
    ...passingState,
    status: BuildStatus.Running,
}

const failingState: Build = {
    ...passingState,
    status: BuildStatus.Failed,
}

storiesOf(BuildCard.name, module)
    .add("passing build", () => <BuildCard scaleFactor={1} {...passingState}/>)
    .add("failing build", () => <BuildCard scaleFactor={1} {...failingState}/>)
    .add("running build", () => <BuildCard scaleFactor={1} {...runningState}/>)
