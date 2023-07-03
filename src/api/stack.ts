import {Construct, Duration, Stack, StackProps, Tags} from "@aws-cdk/core"
import {Cors, LambdaRestApi} from "@aws-cdk/aws-apigateway"
import {NodejsFunction} from "@aws-cdk/aws-lambda-nodejs"
import {join} from "path"
import {Secret} from "@aws-cdk/aws-secretsmanager"
import {Role, ServicePrincipal} from "@aws-cdk/aws-iam"
import {apiConfiguration} from "../api-configuration";

export interface CoolantStackConfiguration extends StackProps {
  readonly stackName: string
  readonly secretName: string
  readonly tags: { readonly [key: string]: string }
}

export class CoolantStack extends Stack {
  constructor(scope: Construct, id: string, props: CoolantStackConfiguration) {
    super(scope, id, props)

    const handler = new NodejsFunction(this, `${props.stackName}-router`, {
      entry: join(__dirname, "provider-router.ts"),
      handler: "handler",
      role: new Role(this, "lambda-role", { assumedBy: new ServicePrincipal("lambda.amazonaws.com") }),
      timeout: Duration.minutes(1),
    })

    const api = new LambdaRestApi(this, `${props.stackName}-api`, {
      handler,
      proxy: false,
      defaultCorsPreflightOptions: {
        allowMethods: Cors.ALL_METHODS,
        allowOrigins: Cors.ALL_ORIGINS,
        allowHeaders: Cors.DEFAULT_HEADERS,
      },
    })
    const providers = api.root.addResource("providers")
    const  provider = providers.addResource("{provider}")
    provider.addMethod("POST")

    const secret = new Secret(this, `${props.stackName}-${props.secretName}`, { secretName: `${props.stackName}-${props.secretName}`})
    secret.grantRead(handler);

    [this, handler, secret, api].map((construct: Construct) => tagConstruct(construct, props.tags))
  }
}


const tagConstruct = (construct: Construct, tags: { readonly [key: string]: string }): void => {
  Object.entries(tags).forEach(([key, value]) => Tags.of(construct).add(key, value))
}
