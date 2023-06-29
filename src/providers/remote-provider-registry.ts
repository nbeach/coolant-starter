import {githubPullRequestProvider} from "./github/github-pull-request-provider"
import {newRelicAlertProvider} from "./new-relic/new-relic-alert-provider"
import {exampleBuildProvider} from "./example/example-build-provider"
import {exampleAlertProvider} from "./example/example-alert-provider"
import {examplePullRequestProvider} from "./example/example-pull-request-provider"

export const remoteProviderRegistry = {
    "example-pull-request": examplePullRequestProvider,
    "example-build": exampleBuildProvider,
    "example-alert": exampleAlertProvider,
    "github-pull-request": githubPullRequestProvider,
    "new-relic-alert": newRelicAlertProvider,
}

export type RemoteProvider = keyof typeof remoteProviderRegistry
