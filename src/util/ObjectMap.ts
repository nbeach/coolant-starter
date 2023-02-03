export interface ObjectMap<T> {
    readonly [key: string]: T
}

export const toObjectMap = <T>(objects: readonly T[], keySelector: (object: T) => string): ObjectMap<T> => {
    return objects
        .map(object => ({ [keySelector(object)]: object }))
        .reduce((acc, next) => ({...acc, ...next}), {})
}
