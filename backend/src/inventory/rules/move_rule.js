module.exports = async function (ctx) {
    await ctx.lifecycle({
        name: "move_rule",
        wait: true,
        function: async function (payload, ctx, state) {
            // envanterde item var mı 
            const amount = await ctx.helpers.itemsAmount(payload.body.from, payload.body.item_type)
            if (amount < payload.body.amount) {
                return false
            }

            // target'in envanterinde yer var mı 
            const item_test = (await ctx.run({
                token: process.env.SYSTEM_TOKEN,
                model: "item",
                method: "test",
                body: {
                    inventory: payload.body.to,
                    item_type: payload.body.item_type,
                    amount: payload.body.amount,

                },
                options: {
                    method: "create"
                }
            })).data

            if (!item_test.status) {
                return false
            }
            return true
        }
    })
}