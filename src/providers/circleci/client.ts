import axios from "axios"

const getClient = (apiKey: string) => {
    return axios.create({
        baseURL: "https://circleci.com/api/v2",
        headers: {
            "Circle-Token": apiKey,
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

export const getPipelines = async (projectSlug: string, branch: string, apiKey: string): Promise< readonly CircleCiPipeline[]> => {
    const response = await getClient(apiKey)
        .get<{ readonly items: readonly CircleCiPipeline[] }>(`project/${projectSlug}/pipeline`)
    return response.data.items
}

export const getWorkflows = async (id: string, apiKey: string): Promise< readonly CircleCiWorkflow[]> => {
    const response = await getClient(apiKey)
        .get<{ readonly items: readonly CircleCiWorkflow[] }>(`pipeline/${id}/workflow`)
    return response.data.items
}
