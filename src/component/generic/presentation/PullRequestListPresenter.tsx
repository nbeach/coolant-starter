import React from "react"
import {PullRequestCardPresenter} from "./PullRequestCardPresenter"
import {ConnectedDataProp} from "../Connector"
import {styled} from "../styled"
import {PullRequest} from "../../../model/PullRequest"

const Container = styled("div", () => ({
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gridTemplateRows: "auto",
    rowGap: "10px",
    width: "100%",
}))

export const PullRequestListPresenter = (props: ConnectedDataProp<readonly PullRequest[]>) =>
<>
    { props.data.length === 0 ? <h2 style={{ width: "100%", textAlign: "center" }}>No Open Pull Requests!</h2> :
    <Container>
       {props.data.map((pullRequest, index) => <PullRequestCardPresenter key={pullRequest.id} pullRequest={pullRequest} row={index}/>)}
    </Container>
    }
</>
