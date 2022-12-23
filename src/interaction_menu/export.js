module.exports = async function (ctx) {
    await ctx.use(require("./models/interaction_menu.js"))
    await ctx.use(require("./menus/index.js"))
    await ctx.use(require("./filter/filter_not_avaible_im.js"))
}





