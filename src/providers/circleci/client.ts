import axios from "axios"
import {getSecret, isSecretReference, Secret} from "../core/secret"

const getClient = async (apiKey: Secret) => {
    return axios.create({
        baseURL: "https://circleci.com/api/v2",
        headers: {
            "Circle-Token": isSecretReference(apiKey) ? await getSecret(apiKey) : apiKey,
        },
    })
}


export interface CircleCiPipeline {
    readonly id: string
    readonly created_at: string
    readonly vcx: {
        readonly branch: string,
    }
}

export interface CircleCiWorkflow {
    readonly id: string
    readonly status: string
    readonly project_slug: string
    readonly created_at: string
}

export const getPipelines = async (projectSlug: string, branch: string, apiKey: Secret): Promise< readonly CircleCiPipeline[]> => {
    const client = await getClient(apiKey)
    const response = await client
        .get<{ readonly items: readonly CircleCiPipeline[] }>(`project/${projectSlug}/pipeline`)
    return response.data.items
}

export const getWorkflows = async (id: string, apiKey: Secret): Promise< readonly CircleCiWorkflow[]> => {
    const client = await getClient(apiKey)
    const response = await client
        .get<{ readonly items: readonly CircleCiWorkflow[] }>(`pipeline/${id}/workflow`)
    return response.data.items
}
