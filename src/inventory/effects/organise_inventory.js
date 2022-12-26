module.exports = async function (ctx) {
    await ctx.lifecycle({
        name: "organise_inventory",
        wait: true,
        function: async function (payload, ctx, state) {
            await ctx.helpers.organiseInventory(payload.body.inventory, payload.body.item_type)
        }
    })
}