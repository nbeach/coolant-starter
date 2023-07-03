import {GetSecretValueCommand, SecretsManagerClient} from "@aws-sdk/client-secrets-manager"
import {apiConfiguration} from "../../api-configuration"

export type Secret = string | SecretReference

export interface SecretReference {
    readonly secretKey: string
}

export const secretReference = (key: string): SecretReference => ({ secretKey: key })
export const isSecretReference = (value: Secret): value is SecretReference => (value as any).secretKey !== undefined

let secretCache: Promise<{ readonly [key: string]: string }> | undefined
export const getSecret = async ({secretKey}: SecretReference): Promise<string> => {
    secretCache = secretCache || (async () => {
        const client = new SecretsManagerClient({})
        const command = new GetSecretValueCommand({
            SecretId: `${apiConfiguration.stackName}-${apiConfiguration.secretName}`,
        })
        const response = await client.send(command)
        if (response.SecretString === undefined) {
            throw new Error(`Secret not found`)
        }
        const secrets = JSON.parse(response.SecretString)
        return secrets[secretKey]
    })()

    return (await secretCache)[secretKey]
}
