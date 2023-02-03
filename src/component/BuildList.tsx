import {ConnectorProps, Connector} from "./Connector"
import {BuildListPresenterProps, BuildListPresenter} from "./presentation/BuildListPresenter"
import React from "react"
import {Build} from "../model/Build"

export const BuildList = (props: ConnectorProps<readonly Build[]> & BuildListPresenterProps) =>
    <Connector component={BuildListPresenter} otherComponentProps={{ scaleFactor: props.scaleFactor}} {...props}/>
