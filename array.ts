import "./compiletimeArray"

export const initArray = <T extends Object>(
    values: ((index: number) => T) | T[],
    length: number
): T[] => {
    const arr: T[] = []
    for (let i = 0; i < length; i++) {
        arr[i] = typeof values === "function" ? values(i) : values[i]
    }
    return arr
}
