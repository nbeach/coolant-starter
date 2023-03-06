import moment, {Moment} from "moment"
import React from "react"
import {Style} from "../../../util/Style"
import {PullRequest, PullRequestStatus} from "../../../model/PullRequest"
import {FaComment, FaThumbsUp} from "react-icons/fa"
import {styled} from "../styled"

export const PullRequestCardPresenter = (props: { readonly pullRequest: PullRequest, readonly row: number}) =>
<>
    <Cell column={1} row={props.row} status={props.pullRequest.status}>{props.pullRequest.name}</Cell>
    <Cell column={2} row={props.row} status={props.pullRequest.status}>
        {timeElapsed(props.pullRequest.timeOpened)}
    </Cell>
    <Cell column={3} row={props.row} status={props.pullRequest.status}>
        +{props.pullRequest.approvals}
    </Cell>
    <Cell column={4} row={props.row} status={props.pullRequest.status}>
        {props.pullRequest.reviewers.map(reviewer => <>{reviewer.name} {reviewer.approved ? <FaThumbsUp/> : <FaComment/>} </>)}
    </Cell>
</>

const statusColorMap = {
    [PullRequestStatus.New]: Style.color.state.failed,
    [PullRequestStatus.UnderReview]: Style.color.state.inProgress,
    [PullRequestStatus.ReadyToMerge]: Style.color.state.success,
}

const Cell = styled<{readonly column: number, readonly row: number, readonly status: PullRequestStatus}>("div", ({column, row, status}) => ({
    gridColumn: column,
    gridRow: row,
    backgroundColor: statusColorMap[status],
    padding: "10px",
}))

const timeElapsed = (startTime: Moment): string => {
    const timeDifference = moment().diff(startTime)
    const elapsedMinutes =  moment.duration(timeDifference).asMinutes()

    const days = Math.floor(elapsedMinutes / (60 * 24))
    const daysRemainder = elapsedMinutes % (60 * 24)
    const hours = Math.floor(daysRemainder / 60)
    const hoursRemainder = daysRemainder % 60
    const minutes = Math.floor(hoursRemainder)

    const formattedDays = days > 0 ? `${days}d ` : ""
    const formattedHours = hours > 0 ? `${hours}h ` : ""
    const formattedMinutes = minutes > 0 ? `${minutes}m` : ""

    return formattedDays + formattedHours + formattedMinutes
}
