export const angleBetweenCoords = (
  x1: number,
  y1: number,
  x2: number,
  y2: number
) => math.deg(math.atan(y2 - y1, x2 - x1))

export const distBetweenCoords = (
  x1: number,
  y1: number,
  x2: number,
  y2: number
) => math.sqrt(((x2 - x1) ^ 2) + ((y2 - y1) ^ 2))

export class Point {
  x: number
  y: number
  z: number

  constructor(x: number, y: number, z?: number) {
    this.x = x
    this.y = y
    this.z = z || 0
    return this
  }

  setCoords(x: number, y: number, z?: number) {
    this.x = x
    this.y = y
    if (z) this.z = z
    return this
  }

  setPoint(p: Point) {
    return this.setCoords(p.x, p.y, p.z)
  }

  offsetXRad(offset: number, angle: real) {
    this.x += offset * math.cos(angle)
    return this
  }

  offsetYRad(offset: number, angle: real) {
    this.y += offset * math.sin(angle)
    return this
  }

  offsetX(offset: number, angle: real) {
    return this.offsetXRad(offset, math.rad(angle))
  }

  offsetY(offset: number, angle: real) {
    return this.offsetYRad(offset, math.rad(angle))
  }

  offsetRad(offset: number, angle: real) {
    return this.offsetX(offset, angle).offsetY(offset, angle)
  }

  offset(offset: number, angle: real) {
    return this.offsetRad(offset, math.rad(angle))
  }

  angleBetween(p: Point) {
    return angleBetweenCoords(this.x, this.y, p.x, p.y)
  }

  distBetween(p: Point) {
    return distBetweenCoords(this.x, this.y, p.x, p.y)
  }
}

const getPointHandle =
  <T extends handle>(
    getterX: (arg: T) => real,
    getterY: (arg: T) => real,
    getterZ?: ((arg: T) => real) | 0
  ) =>
  (arg: T) => {
    if (getterZ) {
      let z
      if (typeof getterZ == 'function') {
        z = getterZ(arg)
      } else z = getterZ
      return new Point(getterX(arg), getterY(arg), z)
    } else return new Point(getterX(arg), getterY(arg))
  }
const getPointI =
  (
    getterX: (arg: integer) => real,
    getterY: (arg: integer) => real,
    getterZ?: (arg: integer) => real
  ) =>
  (arg: integer) => {
    if (getterZ) return new Point(getterX(arg), getterY(arg), getterZ(arg))
    else return new Point(getterX(arg), getterY(arg))
  }
const getPoint =
  (getterX: () => real, getterY: () => real, getterZ?: () => real) => () => {
    if (!getterZ) return new Point(getterX(), getterY())
    return new Point(getterX(), getterY(), getterZ())
  }

export const cameraSetupGetDestPoint = (whichSetup: camerasetup) =>
  getPointHandle(
    CameraSetupGetDestPositionX,
    CameraSetupGetDestPositionY
  )(whichSetup)
export const getCameraBoundMinPoint = () =>
  getPoint(GetCameraBoundMinX, GetCameraBoundMinY)()
export const getCameraBoundMaxPoint = () =>
  getPoint(GetCameraBoundMaxX, GetCameraBoundMaxY)()
export const getCameraTargetPoint = () =>
  getPoint(GetCameraTargetPositionX, GetCameraTargetPositionY)()
export const getCameraEyePoint = () =>
  getPoint(GetCameraEyePositionX, GetCameraEyePositionY)()

export const getDestructablePoint = (d: destructable) =>
  getPointHandle(GetDestructableX, GetDestructableY)(d)

export const getItemPoint = (i: item) => getPointHandle(GetItemX, GetItemY)(i)

export const getStartLocationPoint = (whichStartLocation: integer) =>
  getPointI(GetStartLocationX, GetStartLocationY)(whichStartLocation)

export const getPointFromLoc = (whichLocation: location) =>
  getPointHandle(GetLocationX, GetLocationY, GetLocationZ)(whichLocation)

export const getRectCenterPoint = (whichRect: rect) =>
  getPointHandle(GetRectCenterX, GetRectCenterY)(whichRect)
export const getRectMinPoint = (whichRect: rect) =>
  getPointHandle(GetRectMinX, GetRectMinY)(whichRect)
export const getRectMaxPoint = (whichRect: rect) =>
  getPointHandle(GetRectMaxX, GetRectMaxY)(whichRect)

export const getSpecialEffectPoint = (whichEffect: effect) =>
  getPointHandle(
    BlzGetLocalSpecialEffectX,
    BlzGetLocalSpecialEffectY,
    BlzGetLocalSpecialEffectZ
  )(whichEffect)

export const getOrderPoint = () => getPoint(GetOrderPointX, GetOrderPointY)()
export const getSpellTargetPoint = () =>
  getPoint(GetSpellTargetX, GetSpellTargetY)

export const getTriggerPlayerMousePoint = () =>
  getPoint(BlzGetTriggerPlayerMouseX, BlzGetTriggerPlayerMouseY)()

export const getUnitPoint = (whichUnit: unit, isZ = false) => {
  let z: ((whichUnit: unit) => real) | 0
  if (isZ) z = BlzGetUnitZ
  else z = 0
  return getPointHandle(GetUnitX, GetUnitY, z)(whichUnit)
}
export const waygateGetDestinationPoint = (waygate: unit) =>
  getPointHandle(WaygateGetDestinationX, WaygateGetDestinationY)(waygate)

export const getWidgetPoint = (whichWidget: widget) =>
  getPointHandle(GetWidgetX, GetWidgetY)(whichWidget)

export const getAbilityPos = (abilCode: integer) =>
  getPointI(BlzGetAbilityPosX, BlzGetAbilityPosY)(abilCode)
