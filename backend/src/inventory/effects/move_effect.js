module.exports = async function (ctx) {
    await ctx.lifecycle({
        name: "move_effect",
        wait: true,
        function: async function (payload, ctx, state) {
            await ctx.helpers.removeItems(payload.body.from, payload.body.item_type, payload.body.amount)

            const item = (await ctx.run({
                token: process.env.SYSTEM_TOKEN,
                model: "item",
                method: "create",
                body: {
                    inventory: payload.body.to,
                    item_type: payload.body.item_type,
                    amount: payload.body.amount
                },
                options: {
                    dont_organise: true
                }
            })).data
        }
    })
}