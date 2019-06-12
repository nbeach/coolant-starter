import React from "react"
import {storiesOf} from "@storybook/react"
import {BuildListPresenter} from "./BuildList"
import {BuildStatus} from "../model/BuildStatus"
import {Build} from "../model/Build"

const builds: ReadonlyArray<Build> = [
    { id: "1", name: "Lorem ipsum",  status: BuildStatus.Passed },
    { id: "2", name: "Dolor sit amet", status: BuildStatus.Running },
    { id: "3", name: "Quis nostrud", status: BuildStatus.Failed },
    { id: "4", name: "Consectetur adipiscing", status: BuildStatus.Passed },
    { id: "5", name: "Duis aute irure", status: BuildStatus.Passed },
    { id: "6", name: "Non proident", status: BuildStatus.Running },
    { id: "7", name: "Excepteur sint", status: BuildStatus.Failed },
    { id: "8", name: "Officia deserunt", status: BuildStatus.Passed },
]

storiesOf(BuildListPresenter.name, module)
    .add("one build", () => <BuildListPresenter builds={[builds[0]]}/>)
    .add("many builds", () => <BuildListPresenter builds={builds}/>)
