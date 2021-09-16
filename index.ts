import { init } from "./src/test";

compiletime(() => {
  require("./lualib_bundle")
})

init(CreateUnit(Player(0), FourCC('Hblm'), 0., 0., GetRandomReal(0., 360.)))