module.exports = async function (ctx) {
    await ctx.lifecycle({
        name: "item_in",
        wait: true,
        function: async function (payload, ctx, state) {

        }
    })
}