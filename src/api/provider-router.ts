import {APIGatewayProxyHandler} from "aws-lambda"
import {RemoteProvider, remoteProviderRegistry} from "../api-configuration";

export const handler: APIGatewayProxyHandler = async (event) =>  {
    const provider: RemoteProvider = event.pathParameters?.provider as RemoteProvider
    const configuration = JSON.parse(event.body ?? "")
    if (provider === undefined) {
        return { statusCode: 400, body: "No provider specified" }
    } else {
        return { statusCode: 200, body: JSON.stringify(remoteProviderRegistry[provider](configuration)) }
    }
}
