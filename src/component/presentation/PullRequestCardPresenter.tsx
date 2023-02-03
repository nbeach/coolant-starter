import moment, {Moment} from "moment"
import React from "react"
import {Card} from "./generic/Card"
import {Style} from "../../util/Style"
import {PullRequest, PullRequestStatus} from "../../model/PullRequest"

export const PullRequestCardPresenter = (props: { readonly pullRequest: PullRequest, readonly scaleFactor?: number}) =>
    <Card color={statusColorMap[props.pullRequest.status]} scaleFactor={props.scaleFactor}>
        <div>{props.pullRequest.name}</div>
        <div>
            {timeElapsed(props.pullRequest.timeOpened)}
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            +{props.pullRequest.approvals}
        </div>
    </Card>

const statusColorMap = {
    [PullRequestStatus.New]: Style.color.state.failed,
    [PullRequestStatus.UnderReview]: Style.color.state.inProgress,
    [PullRequestStatus.ReadyToMerge]: Style.color.state.success,
}
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
