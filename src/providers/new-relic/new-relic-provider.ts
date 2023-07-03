import {cachingProvider, Provider} from "../../util/Provider"
import {Alert, Severity} from "../../model/Alert"
import {getActiveAlerts} from "./client"
import moment from "moment"


export interface NewRelicAlertProviderConfiguration {
    readonly apiKey: string,
    readonly policyIds: readonly number[],
}
export const alertProvider = (configuration: NewRelicAlertProviderConfiguration): Provider<readonly Alert[]> => {
    return  cachingProvider(async () => {
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
    }, 60 * 5)
}
