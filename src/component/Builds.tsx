import {ConnectorProps, Connector, ConnectedDataProp} from "./generic/Connector"
import React from "react"
import {Build, BuildStatus} from "../model/Build"
import {FaCheck, FaClock, FaExclamation} from "react-icons/fa"

export const Builds = (props: ConnectorProps<readonly Build[]>) =>
    <Connector component={BuildsPresenter} otherComponentProps={{}} {...props}/>

export const BuildsPresenter = (props: ConnectedDataProp<readonly Build[]>) =>
    <table className="table table-striped">
        <tbody>
            {props.data.map(build => <BuildRowPresenter key={build.id} {...build}/>)}
        </tbody>
    </table>

const BuildRowPresenter = ({ name, status }: Build) =>
    <tr>
        <td className={statusStyleMap[status]}><span>{name}</span> {statusGlyphMap[status]}</td>
    </tr>

const statusStyleMap: { readonly [key: number]: string} = {
    [BuildStatus.Passed]: "bg-success text-center",
    [BuildStatus.Running]: "bg-primary text-center",
    [BuildStatus.Failed]: "bg-danger text-center",
}

const statusGlyphMap: { readonly [key: number]: React.ReactElement} = {
    [BuildStatus.Passed]: <FaCheck/>,
    [BuildStatus.Running]: <FaClock/>,
    [BuildStatus.Failed]: <FaExclamation/>,
}




