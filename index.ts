import "./compiletimeObject"

export const init = () => {
    compiletime(() => {
        require("./lualib_bundle")
    })
}
