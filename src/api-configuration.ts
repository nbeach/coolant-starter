import {CoolantStackConfiguration} from "./api/stack"
import {examplePullRequestProvider} from "./providers/example/example-pull-request-provider";
import {exampleBuildProvider} from "./providers/example/example-build-provider";
import {exampleAlertProvider} from "./providers/example/example-alert-provider";
import {githubPullRequestProvider} from "./providers/github/github-pull-request-provider";
import {newRelicAlertProvider} from "./providers/new-relic/new-relic-alert-provider";

export const apiConfiguration: CoolantStackConfiguration = {
    stackName: "coolant-app",
    secretName: "provider-secrets",
    tags: {
        someTag: "some value",
    },
}

export const remoteProviderRegistry = {
    "example-pull-request": examplePullRequestProvider,
    "example-build": exampleBuildProvider,
    "example-alert": exampleAlertProvider,
    "github-pull-request": githubPullRequestProvider,
    "new-relic-alert": newRelicAlertProvider,
}

export type RemoteProvider = keyof typeof remoteProviderRegistry
