export const AllPlayers: player[] = []

const max_slots = GetBJMaxPlayerSlots()
for (let i = 0; i < max_slots; i++) {
  AllPlayers.push(Player(i))
}
