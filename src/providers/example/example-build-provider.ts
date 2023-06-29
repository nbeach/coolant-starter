import {BuildStatus} from "../../model/Build"

export const exampleBuildProvider = () => {
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
