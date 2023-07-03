import {getPipelines, getWorkflows} from "./client"
import {Build, BuildStatus} from "../../model/Build"
import {ProviderConfigurator} from "../core/provider"
import {Secret} from "../core/secret";

export interface CircleCiProject {
    readonly slug: string
    readonly mainBranch: string
}
export interface CircleCiBuildProviderConfiguration {
    readonly apiKey: Secret,
    readonly projects: readonly CircleCiProject[],
}

const getStatus = (circleCiStatus: string): BuildStatus => {
    if (circleCiStatus === "success") { return BuildStatus.Passed }
    if (circleCiStatus === "running") { return BuildStatus.Running }
    if ( circleCiStatus === "on_hold") { return BuildStatus.ReadyToDeploy }
    return BuildStatus.Failed
}
export const circleCiBuildProvider: ProviderConfigurator<CircleCiBuildProviderConfiguration, readonly Build[]> = (configuration) => {
    return  async () => {
        const piplines = await Promise.all(configuration
           .projects
           .map(project => getPipelines(project.slug, project.mainBranch, configuration.apiKey)))

        const projectWorkflows = await Promise.all(piplines
            .map(pipeline => pipeline[0].id)
            .map(piplineId => getWorkflows(piplineId, configuration.apiKey)))

        return projectWorkflows
            .map(workflows => workflows[0] )
            .map(latestWorkflow => ({
                id: latestWorkflow.id,
                number: latestWorkflow.id,
                name: latestWorkflow.project_slug.split("/").pop()!,
                status: getStatus(latestWorkflow.status),
            }))
    }
}
