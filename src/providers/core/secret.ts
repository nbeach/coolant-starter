import {GetSecretValueCommand, SecretsManagerClient} from "@aws-sdk/client-secrets-manager"

export type Secret = string | SecretReference

export interface SecretReference {
    readonly secretKey: string
}

export const secretReference = (key: string): SecretReference => ({ secretKey: key })
export const isSecretReference = (value: Secret): value is SecretReference => (value as any).secretKey !== undefined

let secretCache: { readonly [key: string]: string } = {}
export const getSecret = async ({secretKey}: SecretReference): Promise<string> => {
    if (secretCache[secretKey]) { return secretCache[secretKey] }
    const client = new SecretsManagerClient({ })
    const command = new GetSecretValueCommand({ SecretId: secretKey })
    const response = await client.send(command)
    if (response.SecretString === undefined) { throw new Error(`Secret "${secretKey}" not found`) }
    secretCache = { ...secretCache, [secretKey]: response.SecretString }
    return response.SecretString
}
