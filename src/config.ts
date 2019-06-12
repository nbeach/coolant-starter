import {CoolantConfiguration} from "./model/CoolantConfiguration"
import {BuildStatus} from "./model/BuildStatus"
import axios from "axios"

const circleCiStatusMap = {
    success: BuildStatus.Passed,
    failed: BuildStatus.Failed,
    running: BuildStatus.Running,
    queued: BuildStatus.Running,
}

export const configuration: CoolantConfiguration = {
    buildResolver: async () => {

        const { data: jobs } = await axios.get<any>("https://circleci.com/api/v1.1/project/gh/PillarTechnology/P-W-Digital-Twin-Frontend?circle-token=a40d06078b2e23d7787513d0b74a02c7f8e75d53&limit=50&offset=0")

        const masterJobStatus = jobs
            .filter((job: any) => job.branch === "master")
            .reduce((acc: any, next: any) => acc.queued_at > next.queued_at ? acc : next, {})


        return [{
            id: "master",
            name: "master",
            status: circleCiStatusMap[masterJobStatus.status],
        }]

    },
    onBuildCompletion: (build, oldStatus, newStatus) => {},
    buildPollingIntervalMilliseconds: 5000,
}
