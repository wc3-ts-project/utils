export const newThread = <T extends any>(func: () => T) => {
    const co = coroutine.create(func)
    const result = coroutine.resume(co)
    if (!result[0]) {
        print(result[1])
        return result[0]
    } else {
        return result[1]
    }
}

export const wait = (time: real) => {
    const timer = CreateTimer()
    const co = coroutine.running()

    TimerStart(timer, time, false, () => coroutine.resume(co[0]))

    coroutine.yield()

    PauseTimer(timer)
    DestroyTimer(timer)
}

const getHandledCallback = <T extends any>(callback: () => T) => () => {
    const result = pcall(callback)
    if (!result[0]) {
        print(result[1])
        return result[0]
    } else {
        return result[1]
    }
}

const getHandledThread = (callback: code) => () => newThread(getHandledCallback(callback))

export const timerStart = (
    whichTimer: timer,
    timeout: real,
    periodic: boolean,
    handlerFunc: code
) => TimerStart(whichTimer, timeout, periodic, getHandledThread(handlerFunc))

export const triggerAddAction = (whichTrigger: trigger, actionFunc: code) =>
    TriggerAddAction(whichTrigger, getHandledThread(actionFunc))

export const getCondition = func => Condition(getHandledThread(func))

export const getFilter = func => Filter(getHandledThread(func))

export const forForce = (whichForce: force, callback: code) =>
    ForForce(whichForce, getHandledThread(callback))

export const forGroup = (whichGroup: group, callback: code) =>
    ForGroup(whichGroup, getHandledThread(callback))

export const enumDestructablesInRect = (r: rect, filterFunc, actionFunc: code) =>
    EnumDestructablesInRect(r, getFilter(filterFunc), getHandledThread(actionFunc))

export const enumItemsInRect = (r: rect, filterFunc, actionFunc: code) =>
    EnumItemsInRect(r, getFilter(filterFunc), getHandledThread(actionFunc))
