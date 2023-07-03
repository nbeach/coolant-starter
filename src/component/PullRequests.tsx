import React from "react"
import {ConnectedDataProp, Connector, ConnectorProps} from "./generic/Connector"
import {PullRequest, PullRequestStatus} from "../model/PullRequest"
import {timeElapsed} from "../util/Time"
import {FaComment, FaThumbsUp} from "react-icons/fa"
import {sortBy} from "ramda";

export const PullRequests = (props: ConnectorProps<readonly PullRequest[]>) =>
    <Connector component={PullRequestsPresenter} otherComponentProps={{}} {...props}/>

export const PullRequestsPresenter = (props: ConnectedDataProp<readonly PullRequest[]>) =>
    <>
        { props.data.length === 0 ? <h2 className="text-center text-white">No Open Pull Requests</h2> :
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Repository</th>
                        <th>User</th>
                        <th>Title</th>
                        <th>Time Open</th>
                        <th>Reviewers</th>
                    </tr>
                </thead>
                <tbody>
                {sortBy( pull => (pull.status + 1) * pull.timeOpened.valueOf(), props.data)
                    .map((pullRequest, index) => <PullRequestRowPresenter key={pullRequest.id} pullRequest={pullRequest} row={index}/>)}
                </tbody>
            </table>
        }
    </>

const PullRequestRowPresenter = (props: { readonly pullRequest: PullRequest, readonly row: number}) =>
    <tr className="text-white">
        <td className={statusStyleMap[props.pullRequest.status]}>{props.pullRequest.repo}</td>
        <td className={statusStyleMap[props.pullRequest.status]}>{props.pullRequest.user}</td>
        <td className={statusStyleMap[props.pullRequest.status]}><a className="link-light" href={props.pullRequest.link} target="_blank">{props.pullRequest.name}</a></td>
        <td className={statusStyleMap[props.pullRequest.status]}>{timeElapsed(props.pullRequest.timeOpened)}</td>
        <td className={statusStyleMap[props.pullRequest.status]}>{props.pullRequest.reviewers.map(reviewer => <span key={reviewer.name + reviewer.approved.toString()}>{reviewer.name} {reviewer.approved ? <FaThumbsUp/> : <FaComment/>} </span>)}</td>
    </tr>

const statusStyleMap = {
    [PullRequestStatus.Draft]: "bg-secondary text-white",
    [PullRequestStatus.New]: "bg-danger text-white",
    [PullRequestStatus.UnderReview]: "bg-info text-white",
    [PullRequestStatus.ReadyToMerge]: "bg-success text-white",
}
