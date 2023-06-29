import axios from "axios"
import {getSecret, isSecretReference, Secret} from "../core/secret"

const getClient = async (apiKey: Secret) => {
    const resolvedKey = isSecretReference(apiKey) ? await getSecret(apiKey) : apiKey

    return axios.create({
        baseURL: "https://api.newrelic.com/v2/",
        headers: {
            "X-Api-Key": resolvedKey,
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

export const getActiveAlerts = async (apiKey: Secret) => {
    const client = await getClient(apiKey)
    const response = await client
        .get<{ readonly violations: readonly Violation[] }>("alerts_violations.json", { params: { only_open: true } })
    return response.data.violations
}
