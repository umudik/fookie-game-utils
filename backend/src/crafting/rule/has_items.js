module.exports = async function (ctx) {
    await ctx.lifecycle({
        name: "has_items",
        function: async function (payload, ctx, state) {
            for (const ci of state.craft_ins) {
                const amount = await ctx.helpers.itemsAmount(payload.body.inventory, ci.item_type)
                if (amount < ci.amount) {
                    return false
                }
            }
            return true
        }
    })
}