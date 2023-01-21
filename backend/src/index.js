(async () => {
    if (typeof process.env.DATABASE != "string") {
        require("dotenv").config();
    }
    const fookie = require("fookie");
    await fookie.init()
    await fookie.use(require("fookie-server"))

    await fookie.use(require("./global/export"))
    await fookie.use(require("./interaction_menu/export"))
    await fookie.use(require("./entity/export"))
    await fookie.use(require("./player/export"))
    await fookie.use(require("./vehicle/export"))
    await fookie.use(require("./inventory/export"))
    await fookie.use(require("./shop/export"))
    await fookie.use(require("./crafting/export"))
    await fookie.use(require("./drop/export"))
    await fookie.use(require("./faction/export"))
    await fookie.use(require("./house/export"))
    await fookie.use(require("./government/export"))
    await fookie.use(require("./phone/export"))
    await fookie.use(require("./ui/export.js"))
    await fookie.use(require("./bank/export.js"))
    await fookie.use(require("./item_bomb/export.js"))
    await fookie.use(require("./race/export.js"))

    // ADD SOMETHINGS
    await fookie.use(require("./house/menus/index.js"))
    await fookie.listen(2626)

    await require("../test/index.js")(fookie)
})()

