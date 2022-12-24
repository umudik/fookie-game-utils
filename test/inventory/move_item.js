module.exports = async function (ctx) {
    await ctx.test({
        name: "move_item",
        function: async function (state) {
            const move_item_res = await ctx.run({
                token: state.system_token,
                model: "item",
                method: "update",
                query: {
                    filter: {
                        pk: state.item_1[ctx.helpers.pk("item")]
                    }
                },
                body: {
                    inventory: state.inventory_2[ctx.helpers.pk("inventory")],
                    amount: 1

                }
            })

            console.log(move_item_res);

        }
    })
}