import {Construct, Stack, StackProps, Tags} from "@aws-cdk/core"
import {LambdaRestApi} from "@aws-cdk/aws-apigateway"
import {NodejsFunction} from "@aws-cdk/aws-lambda-nodejs"
import {join} from "path"
import {Secret} from "@aws-cdk/aws-secretsmanager"

export interface CoolantStackConfiguration extends StackProps {
  readonly stackName: string
  readonly secretName: string
  readonly tags: { readonly [key: string]: string }
}

export class CoolantStack extends Stack {
  constructor(scope: Construct, id: string, props: CoolantStackConfiguration) {
    super(scope, id, props)

    const handler = new NodejsFunction(this, "provider-router", {
      entry: join(__dirname, "provider-router.ts"),
      handler: "handler",
    })

    const secret = new Secret(this, props.secretName)
    secret.grantRead(handler)

    const api = new LambdaRestApi(this, "api", { handler, proxy: false })
    const providers = api.root.addResource("providers")
    const  provider = providers.addResource("{provider}")
    provider.addMethod("POST");

    [this, handler, secret, api].map((construct: Construct) => tagConstruct(construct, props.tags))
  }
}


const tagConstruct = (construct: Construct, tags: { readonly [key: string]: string }): void => {
  Object.entries(tags).forEach(([key, value]) => Tags.of(construct).add(key, value))
}
