import React from "react"
import styled from "styled-components"
import {Style} from "../util/Style"
import {FaCheck, FaClock, FaExclamation} from "react-icons/fa"
import {Build} from "../model/Build"
import {BuildStatus} from "../model/BuildStatus"

const statusColorMap = {
    [BuildStatus.Passed]: Style.color.state.passed,
    [BuildStatus.Running]: Style.color.state.running,
    [BuildStatus.Failed]: Style.color.state.failed,
}

const statusGlpyhMap = {
    [BuildStatus.Passed]: <FaCheck/>,
    [BuildStatus.Running]: <FaClock/>,
    [BuildStatus.Failed]: <FaExclamation/>,
}

const Card = styled.div<{ readonly status: BuildStatus}>`
    background-color: ${({status}) => statusColorMap[status]};
    padding: 1rem 3.5rem 1rem 3.5rem;
    margin: 0.25rem;
    box-shadow: 5px 5px 7px rgb(200, 200, 200);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
    width: auto;

`

const Name = styled.div`
    font-size: 3.75rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`
const Indicator = styled.div`
    font-size: 1.75rem;
`

export const BuildCard = ({ name, status }: Build) =>
    <Card status={status}>
        <Indicator>{statusGlpyhMap[status]}</Indicator>&nbsp;&nbsp;<Name> {name}</Name>
    </Card>
