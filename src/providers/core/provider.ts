import axios from "axios/index"
import {periodically} from "../../event/Time"
import {RemoteProvider} from "../../api-configuration";

export type Provider<T> =  () => Promise<T>
export type ProviderConfigurator<C, T> = (configuration: C) => () => Promise<T>

export const remoteProvider = <T, C = any>(apiUrl: string, registeredName: RemoteProvider, configuration: C): Provider<T> => {
    return async () => (
        await axios
            .create({ baseURL: apiUrl})
            .post<T>(`providers/${registeredName}`, configuration)
    ).data
}

export const withCaching = (cacheDurationSeconds: number): <T>(provider: Provider<T>) => Provider<T> => {
    return <T>(provider: Provider<T>) => {
        let cache: Promise<T> | null = null
        periodically(cacheDurationSeconds)(() => {
            cache = provider()
        })

        return () => cache!
    }
}
