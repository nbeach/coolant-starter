import {APIGatewayProxyEvent, APIGatewayProxyHandler} from "aws-lambda"
import {RemoteProvider, remoteProviderRegistry} from "../providers/remote-provider-registry"
import {getSecret} from "../providers/core/secret"

export const handler: APIGatewayProxyHandler = async (event) =>  {
    if (!(await authenticationTokenValid(event))) { return { statusCode: 401, body: "Unauthorized" } }

    const provider: RemoteProvider = event.pathParameters?.provider as RemoteProvider
    const configuration = JSON.parse(event.body ?? "")
    if (provider === undefined) {
        return { statusCode: 400, body: "No provider specified" }
    } else {
        return { statusCode: 200, body: JSON.stringify(remoteProviderRegistry[provider](configuration)) }
    }
}

const authenticationTokenValid = async (event: APIGatewayProxyEvent): Promise<boolean> => {
    const token = event.headers["x-auth-token"]
    if (token === undefined) { return false }
    const validTokens: readonly string[] = await getSecret({ secretKey: "authTokens"}) as any
    return validTokens.includes(token)
}
