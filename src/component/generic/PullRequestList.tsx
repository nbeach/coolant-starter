import React from "react"
import {PullRequestCardPresenterProps, PullRequestListPresenter} from "./presentation/PullRequestListPresenter"
import {Connector, ConnectorProps} from "./Connector"
import {PullRequest} from "../../model/PullRequest"

export const PullRequestList = (props: ConnectorProps<readonly PullRequest[]> & PullRequestCardPresenterProps) =>
    <Connector component={PullRequestListPresenter} otherComponentProps={{ scaleFactor: props.scaleFactor}} {...props}/>
