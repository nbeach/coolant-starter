import {Provider, ProviderConfigurator} from "../core/provider"
import {Alert, Severity} from "../../model/Alert"
import moment from "moment/moment"

export const exampleAlertProvider: ProviderConfigurator<{}, readonly Alert[]> = (_configuration: {}) => () => {
    return Promise.resolve([
        {
            id: "1",
            application: "SomeService",
            link: "https://www.google.com",
            title: "Thing done be messed up",
            severity: Severity.Low,
            timeStarted: moment("2019-12-21T12:00:00Z"),
        },
        {
            id: "2",
            application: "SomeService",
            link: "https://www.google.com",
            title: "This is fine",
            severity: Severity.Low,
            timeStarted: moment("2019-12-21T16:00:00Z"),
        },
        {
            id: "3",
            application: "SomeOtherService",
            link: "https://www.google.com",
            title: "PANIC!",
            severity: Severity.High,
            timeStarted: moment("2019-12-20T12:00:00Z"),
        },
    ])
}
