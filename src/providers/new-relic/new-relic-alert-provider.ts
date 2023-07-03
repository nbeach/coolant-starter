import {Alert, Severity} from "../../model/Alert"
import {ProviderConfigurator} from "../core/provider"
import {getActiveAlerts} from "./client"
import moment from "moment"
import {Secret} from "../core/secret"

export interface NewRelicAlertProviderConfiguration {
    readonly apiKey: Secret,
    readonly policyIds: readonly number[],
}
export const newRelicAlertProvider: ProviderConfigurator<NewRelicAlertProviderConfiguration, readonly Alert[]> = (configuration) => {
    return async () => {
        const allViolations = await getActiveAlerts(configuration.apiKey)
        return allViolations
            .filter(violation => configuration.policyIds.includes(violation.links.policy_id))
            .map(violation => ({
                id: violation.id.toString(),
                application: violation.policy_name,
                title: `${violation.condition_name} - ${violation.entity.name}`,
                link: "",
                severity: violation.priority === "Critical" ? Severity.High : Severity.Low,
                timeStarted: moment(violation.opened_at),
            }))
    }
}
