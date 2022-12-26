module.exports = async function (ctx) {
    await ctx.lifecycle({
        name: "item_out",
        wait: true,
        function: async function (payload, ctx, state) {
        }
    })
}