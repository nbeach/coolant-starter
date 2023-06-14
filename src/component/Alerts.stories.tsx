import {storiesOf} from "@storybook/react"
import React from "react"
import {AlertsPresenter} from "./Alerts"
import {Alert, Severity} from "../model/Alert"
import moment from "moment/moment"


const alerts: readonly Alert[] = [
    { id: "1", application: "SomeService", title: "High database latency", link: "https://www.google.com", severity: Severity.High, timeStarted: moment("2023-02-05T00:00:00Z") },
    { id: "2", application: "OtherService", title: "Items on dead letter queue", link: "https://www.google.com", severity: Severity.Low, timeStarted: moment("2023-02-05T00:00:00Z") },
    { id: "3", application: "Kitchen", title: "Low on snacks", link: "https://www.google.com", severity: Severity.Low, timeStarted: moment("2023-02-05T00:00:00Z") },
]

storiesOf("Alerts", module)
    .add("many pull requests", () => <AlertsPresenter data={alerts}/>)
    .add("no pull requests", () => <AlertsPresenter data={[]}/>)
