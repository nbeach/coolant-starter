import {Build, BuildStatus} from "../../model/Build"
import {ProviderConfigurator} from "../core/provider"

export const exampleBuildProvider: ProviderConfigurator<{}, readonly Build[]> = (_configuration: {}) => () => {
    return Promise.resolve([
        {
            id: "1",
            number: Math.random().toString(),
            name: "Server",
            status: Math.random() < 0.5 ? BuildStatus.Failed : BuildStatus.Passed,
        },
        {
            id: "2",
            number: "1",
            name: "Frontend",
            status: BuildStatus.Failed,
        },
        {
            id: "3",
            number: "1",
            name: "Admin",
            status: BuildStatus.Passed,
        },
    ])
}
