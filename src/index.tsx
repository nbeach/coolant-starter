import React from "react"
import ReactDOM from "react-dom"

import "./style/index.scss"
import * as serviceWorker from "./serviceWorker"
import {Coolant} from "./component/Coolant"
import {Branding} from "./component/Branding"
import {BuildList} from "./component/BuildList"
import logo from "./logo.png"
import {BuildStatus} from "./model/BuildStatus"
import {CoolantConfiguration} from "./model/CoolantConfiguration"
import axios from "axios"
import {groupBy} from "lodash"
import {playStandupSound} from "./util/StandupMusic"


const circleCiStatusMap = {
    success: BuildStatus.Passed,
    failed: BuildStatus.Failed,
    running: BuildStatus.Running,
    queued: BuildStatus.Running,
}

export const configuration: CoolantConfiguration = {
    buildResolver: async () => {
        const { data: jobs } = await axios.get<any>("https://circleci.com/api/v1.1/project/gh/PillarTechnology/P-W-Digital-Twin-Frontend?circle-token=a40d06078b2e23d7787513d0b74a02c7f8e75d53&limit=50&offset=0")

        return Object.entries(groupBy(jobs, (job: any) => job.branch))
            .map(([_, groupedJobs]) => groupedJobs)
            .map(groupedJobs => groupedJobs.reduce(mostRecent, {}))
            .map( (job: any) => ({
                id: job.branch,
                name: job.branch,
                status: circleCiStatusMap[job.status],
            }))
            .filter(build => build.name === "master")
    },
    onBuildCompletion: (build, oldStatus, newStatus) => {},
    buildPollingIntervalMilliseconds: 5000,
}

const mostRecent = (acc: any, next: any) => acc.queued_at > next.queued_at ? acc : next
playStandupSound("danger-zone.mp3",  "09:44")

ReactDOM.render(<Coolant configuration={configuration}>
    <Branding>
        <img src={logo} style={{maxWidth: "40vw"}}/>
    </Branding>
    <BuildList/>
</Coolant>, document.getElementById("root"))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
