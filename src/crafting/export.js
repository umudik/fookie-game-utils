module.exports = async function (ctx) {
    await ctx.use(require("./model/craft"))
    await ctx.use(require("./model/craft_in"))
    await ctx.use(require("./model/craft_out"))
    await ctx.use(require("./model/craft_type"))

    await ctx.use(require("./modify/craft_sets"))

    await ctx.use(require("./rule/craft_items"))
    await ctx.use(require("./rule/has_items"))
    await ctx.use(require("./rule/inventory_control"))



}