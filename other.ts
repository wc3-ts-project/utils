export const chance = (ch: real) => math.random(0.01, 100) <= ch

export const randomAngle = () => math.random(0, 360)

export const rawToStr = (id: rawcode): string => (typeof id === "number" ? string.pack(">I4", id) : id)

export const fourCC = (id: rawcode): number => (typeof id === 'string' ? FourCC(id) : id)