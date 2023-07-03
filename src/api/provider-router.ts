import {APIGatewayProxyHandler} from "aws-lambda"
import {RemoteProvider, remoteProviderRegistry} from "../remote-provider-registry"


const headers = {
    "Access-Control-Allow-Headers" : "Content-Type",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
}

const response = (statusCode: number, body: string) => ({ headers, statusCode, body })

export const handler: APIGatewayProxyHandler = async (event) =>  {
    const providerName: RemoteProvider = event.pathParameters?.provider as RemoteProvider
    const configuration = JSON.parse(event.body ?? "")

    try {
        if (providerName === undefined || remoteProviderRegistry[providerName] === undefined) {
            return response(400, "Provider not found or no provider specified")
        } else {
            const provider = remoteProviderRegistry[providerName](configuration)
            return response(200, JSON.stringify(await provider()))
        }
    } catch (e: any) {
        return  response(500, e.stack)
    }

}
