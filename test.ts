import { getFilter, wait } from "./debug"

export const init = (
    unit: unit = CreateUnit(Player(0), FourCC("Hblm"), 0, 0, GetRandomReal(0, 360))
) => {
    wait(2)
    print(DoNothing)
    print(bj_ALLIANCE_ALLIED)
    const group = CreateGroup()
    GroupEnumUnitsOfPlayer(
        group,
        Player(0),
        getFilter(() => GetFilterUnit() == unit)
    )
    print(BlzGroupGetSize(group))
    ForGroup(group, () => {
        print(GetUnitName(GetEnumUnit()))
    })
    DestroyGroup(group)
}
