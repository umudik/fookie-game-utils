module.exports = async function (ctx) {
    await ctx.lifecycle({
        name: "check_weight",
        function: async function (payload, ctx, state) {

            if (payload.method === "create") {
                let total = await currentWeight(ctx, payload.body.inventory)
                total += payload.body.amount * state.item_type.weight
                return state.inventory_type.maxWeight >= total
            }

            if (payload.method === "update") {
                for (const item of state.items) {
                    let total = await currentWeight(ctx, item.inventory)
                    console.log(total);
                    const item_type_res = await ctx.run({
                        token: process.env.SYSTEM_TOKEN,
                        method: "read",
                        model: "item_type",
                        query: {
                            filter: { pk: item.item_type }
                        }
                    })
                    const item_type = item_type_res.data[0]
                    total += payload.body.amount ? (payload.body.amount - item.amount) * item_type.weight : item.amount * item_type.weight
                    console.log(total);
                    const inventory = (await ctx.run({
                        token: process.env.SYSTEM_TOKEN,
                        method: "read",
                        model: "inventory",
                        query: {
                            filter: { pk: item.inventory }
                        }
                    })).data[0]

                    const inventory_type = (await ctx.run({
                        token: process.env.SYSTEM_TOKEN,
                        method: "read",
                        model: "inventory_type",
                        query: {
                            filter: { pk: inventory.inventory_type }
                        }
                    })).data[0]
                    if (inventory_type.maxWeight < total) {
                        return false
                    }
                }
            }
            return false
        }

    })

}


async function currentWeight(ctx, inventory_id) {
    let res = await ctx.run({
        token: process.env.SYSTEM_TOKEN,
        method: "read",
        model: "item",
        query: {
            filter: { inventory: inventory_id }
        }
    })

    const items = res.data
    let total = 0

    for (let item of items) {
        const item_type_res = await ctx.run({
            token: process.env.SYSTEM_TOKEN,
            method: "read",
            model: "item_type",
            query: {
                filter: { pk: item.item_type }
            }
        })

        const item_type = item_type_res.data[0]
        total += item.amount * item_type.weight
    }

    return total
}