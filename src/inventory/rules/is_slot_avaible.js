module.exports = async function (ctx) {
    await ctx.lifecycle({
        name: "is_slot_avaible",
        function: async function (payload, ctx, state) {
            let res = await ctx.run({
                token: process.env.SYSTEM_TOKEN,
                method: "count",
                model: "item",
                query: {
                    filter: {
                        inventory: payload.body.inventory,
                        slot: payload.body.slot,
                    }
                }
            })
            return res.data === 0
        }
    })
}