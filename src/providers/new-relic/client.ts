import axios from "axios"

const getClient = (apiKey: string) => {
    return axios.create({
        baseURL: "https://api.newrelic.com/v2/",
        headers: {
            "X-Api-Key": apiKey,
        },
    })
}

export interface Violation {
    readonly id: number,
    readonly condition_name: string,
    readonly opened_at: number,
    readonly label: string,
    readonly policy_name: string,
    readonly priority: string
    readonly links: {
        readonly policy_id: number,
    }
    readonly entity: {
        readonly name: string,
    }
}

export const getActiveAlerts = async (apiKey: string) => {
    const response = await getClient(apiKey)
        .get<{ readonly violations: readonly Violation[] }>("alerts_violations.json", { params: { only_open: true } })
    return response.data.violations
}
