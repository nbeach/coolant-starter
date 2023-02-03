import React from "react"
import {storiesOf} from "@storybook/react"
import {BuildListPresenter} from "./BuildListPresenter"
import {Radiator} from "../Radiator"
import {Build, BuildStatus} from "../../../model/Build"

const builds: readonly Build[] = [
    { id: "1", number: "", name: "Lorem ipsum",  status: BuildStatus.Passed },
    { id: "2", number: "", name: "Dolor sit amet", status: BuildStatus.Running },
    { id: "3", number: "", name: "Quis nostrud", status: BuildStatus.Failed },
    { id: "4", number: "", name: "Consectetur adipiscing", status: BuildStatus.Passed },
    { id: "5", number: "", name: "Duis aute irure", status: BuildStatus.Passed },
    { id: "6", number: "", name: "Non proident", status: BuildStatus.Running },
    { id: "7", number: "", name: "Excepteur sint", status: BuildStatus.Failed },
    { id: "8", number: "", name: "Officia deserunt", status: BuildStatus.Passed },
]

storiesOf("BuildListPresenter", module)
    .addDecorator((story) => <Radiator>{story()}</Radiator>)
    .add("one build", () => <BuildListPresenter data={[builds[0]]}/>)
    .add("many builds", () => <BuildListPresenter data={builds}/>)
    .add("many builds scaled 2x", () => <BuildListPresenter data={builds} scaleFactor={2}/>)
