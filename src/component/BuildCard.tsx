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

const Card = styled.div<{ readonly status: BuildStatus, readonly scaleFactor: number}>`
    background-color: ${({status}) => statusColorMap[status]};
    color: rgb(255,255,255);
    padding: 1rem 3.5rem 1rem 3.5rem;
    margin: 0.25rem;
    box-shadow: 5px 5px 7px rgb(200, 200, 200);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
    width: auto;
    font-size: ${({scaleFactor}) => 9.28 * Math.pow(scaleFactor, -0.63)}rem;
`

const Name = styled.div`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`

export const BuildCard = ({ name, status, scaleFactor }: Build & { readonly scaleFactor: number }) =>
    <Card status={status} scaleFactor={scaleFactor}>
        {statusGlpyhMap[status]}&nbsp;&nbsp;<Name> {name}</Name>
    </Card>
