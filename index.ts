import "./compiletimeObject"
import "./compiletimeArray"

export const init = () => {
    compiletime(() => {
        require("./lualib_bundle")
    })
}
