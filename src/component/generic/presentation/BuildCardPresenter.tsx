import React from "react"
import {FaCheck, FaClock, FaExclamation} from "react-icons/fa"
import {Card} from "./generic/Card"
import {styled} from "../styled"
import {Style} from "../../../util/Style"
import {Build, BuildStatus} from "../../../model/Build"

const statusColorMap = {
    [BuildStatus.Passed]: Style.color.state.success,
    [BuildStatus.Running]: Style.color.state.inProgress,
    [BuildStatus.Failed]: Style.color.state.failed,
}

const statusGlyphMap = {
    [BuildStatus.Passed]: <FaCheck/>,
    [BuildStatus.Running]: <FaClock/>,
    [BuildStatus.Failed]: <FaExclamation/>,
}

const Name = styled("div", () => ({
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
}))

export const BuildCardPresenter = ({ name, status, scaleFactor }: Build & { readonly scaleFactor?: number }) =>
    <Card color={statusColorMap[status]} scaleFactor={scaleFactor}>
       <Name>{name}</Name> {statusGlyphMap[status]}
    </Card>
