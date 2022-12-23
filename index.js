const fookie = require("fookie");

module.exports = async function () {
    if (typeof process.env.DATABASE != "string") {
        require("dotenv").config();
    }
    await fookie.init()

    await fookie.use(require("./src/global/export"))
    await fookie.use(require("fookie-databases").mongodb)
    await fookie.use(require("./src/interaction_menu/export"))
    await fookie.use(require("./src/entity/export"))
    await fookie.use(require("./src/player/export"))
    await fookie.use(require("./src/vehicle/export"))
    await fookie.use(require("./src/inventory/export"))
    await fookie.use(require("./src/shop/export"))
    await fookie.use(require("./src/crafting/export"))
    await fookie.use(require("./src/drop/export"))
    await fookie.use(require("./src/faction/export"))
    await fookie.use(require("./src/house/export"))
    await fookie.use(require("./src/government/export"))
    await fookie.use(require("./src/phone/export"))
    await fookie.use(require("./src/db_sync/index.js"))




    // ADD SOMETHINGS
    await fookie.use(require("./src/house/menus/index.js"))
    return fookie
}