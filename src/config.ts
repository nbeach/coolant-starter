import {CoolantConfiguration} from "./model/CoolantConfiguration"
import {BuildStatus} from "./model/BuildStatus"

export const configuration: CoolantConfiguration = {
    buildResolver: () => Promise.resolve([
        { id: "1", name: "Lorem ipsum",  status: BuildStatus.Passed },
        { id: "2", name: "Dolor sit amet", status: BuildStatus.Running },
        { id: "3", name: "Quis nostrud", status: BuildStatus.Failed },
        { id: "4", name: "Consectetur adipiscing", status: BuildStatus.Passed },
        { id: "5", name: "Duis aute irure", status: BuildStatus.Passed },
        { id: "6", name: "Non proident", status: BuildStatus.Running },
        { id: "7", name: "Excepteur sint", status: BuildStatus.Passed },
        { id: "8", name: "Lorem ipsum",  status: BuildStatus.Passed },
        { id: "9", name: "Dolor sit amet", status: BuildStatus.Passed },
        { id: "10", name: "Quis nostrud", status: BuildStatus.Passed },
        { id: "11", name: "Consectetur adipiscing", status: BuildStatus.Passed },
        { id: "12", name: "Duis aute irure", status: BuildStatus.Passed },
        { id: "13", name: "Non proident", status: BuildStatus.Running },
        { id: "14", name: "Excepteur sint", status: BuildStatus.Passed },
    ]),
    onBuildCompletion: (build, oldStatus, newStatus) => {},
    buildPollingIntervalMilliseconds: 5000,
}
