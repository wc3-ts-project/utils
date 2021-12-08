import { timerStart } from "./debug"

export const setTimeout = (time: real, callback: code, noDestroy = false) => {
    const timer = CreateTimer()
    timerStart(timer, time, false, () => {
        callback()
        if (!noDestroy) {
            PauseTimer(timer)
            DestroyTimer(timer)
        }
    })
    return timer
}

export const setInterval = (time: real, callback: code) => {
    const timer = CreateTimer()
    timerStart(timer, time, true, () => {
        callback()
    })
    return timer
}
