import React from "react"
import {ConnectedDataProp, Connector, ConnectorProps} from "./generic/Connector"
import {Alert, Severity} from "../model/Alert"
import {timeElapsed} from "../util/Time"

export const Alerts = (props: ConnectorProps<readonly Alert[]>) =>
    <Connector component={AlertsPresenter} otherComponentProps={{}} {...props}/>

export const AlertsPresenter = (props: ConnectedDataProp<readonly Alert[]>) =>
    <>
        { props.data.length === 0 ? <h2 className="text-center text-white">No Active Alerts!</h2> :
            <table className="table table-striped">
                <tbody>
                {props.data.map((alert, index) => <AlertRowPresenter key={alert.id} alert={alert} row={index}/>)}
                </tbody>
            </table>
        }
    </>

const AlertRowPresenter = (props: { readonly alert: Alert, readonly row: number}) =>
    <tr>
        <td className={severityStyleMap[props.alert.severity]}>{props.alert.application}</td>
        <td className={severityStyleMap[props.alert.severity]}><a className="link-light" href={props.alert.link} target="_blank">{props.alert.title}</a></td>
        <td className={severityStyleMap[props.alert.severity]}>{timeElapsed(props.alert.timeStarted)}</td>
    </tr>

const severityStyleMap = {
    [Severity.High]: "bg-danger text-white",
    [Severity.Low]: "bg-warning text-white",
}
