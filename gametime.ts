import { setInterval } from "./timer"

let elapsedTime = 0.0

const updateTime = 30

const gameTimer = setInterval(updateTime, () => (elapsedTime += updateTime))

export const getElapsedTime = () => elapsedTime + TimerGetElapsed(gameTimer)
