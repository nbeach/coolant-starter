import {Construct, Stack, StackProps} from "@aws-cdk/core"
import {LambdaRestApi} from "@aws-cdk/aws-apigateway"
import {NodejsFunction} from "@aws-cdk/aws-lambda-nodejs"
import {join} from "path"

export class CoolantStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props)

    const handler = new NodejsFunction(this, "provider-router", {
      entry: join(__dirname, "provider-router.ts"),
      handler: "handler",
    })

    const api = new LambdaRestApi(this, "api", { handler, proxy: false })

    const providers = api.root.addResource("providers")
    const  provider = providers.addResource("{provider}")
    provider.addMethod("POST")
  }
}
