export const chance = (ch: real) => math.random(0.01, 100) <= ch

export const randomAngle = () => math.random(0, 360)

export const rawToStr = (id: rawcode) => {
    let result
    if (typeof id === "number") result = string.pack(">I4", id)
    else result = id
    return result
}

export const fourCC = (id: rawcode): number => {
    let result
    if (typeof id == "string") result = FourCC(id)
    else result = id
    return result
}
