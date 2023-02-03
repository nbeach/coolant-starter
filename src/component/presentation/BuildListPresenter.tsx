import React from "react"
import {BuildCardPresenter} from "./BuildCardPresenter"
import {ConnectedDataProp} from "../Connector"
import {styled} from "../styled"
import {Build} from "../../model/Build"

export interface BuildListPresenterProps {
    readonly scaleFactor?: number
}

const Container = styled("div", () => ({
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
}))

export const BuildListPresenter = (props: ConnectedDataProp<readonly Build[]> & BuildListPresenterProps) => <Container>
    {props.data.map(build => <BuildCardPresenter key={build.id} scaleFactor={props.scaleFactor} {...build}/>)}
</Container>


