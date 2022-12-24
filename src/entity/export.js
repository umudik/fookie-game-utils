module.exports = async function (ctx) {
    await ctx.use(require("./modifies/set_type.js"))
    await ctx.use(require("./rule/need_type.js"))
    await ctx.use(require("./mixin/entity"))
    await ctx.use(require("./models/entity_type"))
    await ctx.use(require("./rule/dont_spawn_twice"))
    await ctx.use(require("./models/marker.js"))
    await ctx.use(require("./models/object.js"))
    await ctx.use(require("./models/blip.js"))
    await ctx.use(require("./models/colshape.js"))
    await ctx.use(require("./models/label.js"))
    await ctx.use(require("./models/checkpoint.js"))
}





