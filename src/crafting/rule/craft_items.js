module.exports = async function (ctx) {
    await ctx.lifecycle({
        name: "craft_items",
        function: async function (payload, ctx, state) {
            return false

        }
    })
}