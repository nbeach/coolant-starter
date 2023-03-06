import React from "react"
import {PullRequestListPresenter} from "./presentation/PullRequestListPresenter"
import {Connector, ConnectorProps} from "./Connector"
import {PullRequest} from "../../model/PullRequest"

export const PullRequestList = (props: ConnectorProps<readonly PullRequest[]>) =>
    <Connector component={PullRequestListPresenter} otherComponentProps={{}} {...props}/>
