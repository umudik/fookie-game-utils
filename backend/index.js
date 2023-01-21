module.exports = async function (ctx) {
    if (typeof process.env.DATABASE != "string") {
        require("dotenv").config();
    }
    await ctx.init()

    await ctx.use(require("./src/global/export"))
    await ctx.use(require("fookie-databases").mongodb)
    await ctx.use(require("./src/interaction_menu/export"))
    await ctx.use(require("./src/entity/export"))
    await ctx.use(require("./src/player/export"))
    await ctx.use(require("./src/vehicle/export"))
    await ctx.use(require("./src/inventory/export"))
    await ctx.use(require("./src/shop/export"))
    await ctx.use(require("./src/crafting/export"))
    await ctx.use(require("./src/drop/export"))
    await ctx.use(require("./src/faction/export"))
    await ctx.use(require("./src/house/export"))
    await ctx.use(require("./src/government/export"))
    await ctx.use(require("./src/phone/export"))
    await ctx.use(require("./src/db_sync/index.js"))




    // ADD SOMETHINGS
    await ctx.use(require("./src/house/menus/index.js"))
}