module.exports = async function (ctx) {
    ctx.helpers.currentWeight = async function (ctx, inventory_id) {
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

    ctx.helpers.itemsAmount = async function (inventory, item_type) {
        const items = (await ctx.run({
            token: process.env.SYSTEM_TOKEN,
            model: "item",
            method: "read",
            query: {
                filter: {
                    inventory,
                    item_type,
                }
            }
        })).data
        return ctx.lodash.sumBy(items, "amount")
    }

    ctx.helpers.itemsByType = async function (inventory, item_type) {
        const items = (await ctx.run({
            token: process.env.SYSTEM_TOKEN,
            model: "item",
            method: "read",
            query: {
                filter: {
                    inventory,
                    item_type,
                }
            }
        })).data
        return items
    }

    ctx.helpers.removeItems = async function (inventory, item_type, remain) {
        const items = await ctx.helpers.itemsByType(inventory, item_type)

        if (await ctx.helpers.itemsAmount(inventory, item_type) < remain) {
            return false
        }

        for (const item of items) {
            for (; ;) {
                if (remain >= item.amount) {
                    await ctx.run({
                        token: process.env.SYSTEM_TOKEN,
                        model: "item",
                        method: "delete",
                        query: {
                            filter: {
                                pk: item[ctx.helpers.pk("item")]
                            }
                        }
                    })
                } else {
                    await ctx.run({
                        token: process.env.SYSTEM_TOKEN,
                        model: "item",
                        method: "update",
                        query: {
                            filter: {
                                pk: item[ctx.helpers.pk("item")]
                            }
                        },
                        body: {
                            amount: item.amount - remain
                        }
                    })
                }

                remain = remain - item.amount
                if (remain <= 0) {
                    break
                }
            }

        }
    }

    ctx.helpers.organiseInventory = async function (inventory, it_id) {

        const its = await ctx.helpers.itemsByType(inventory, it_id)
        const items = ctx.lodash.sortBy(its, "slot")

        if (items.length === 0) {
            return false
        }


        console.log(items);
        const item_type = (await ctx.run({
            token: process.env.SYSTEM_TOKEN,
            model: "item_type",
            method: "read",
            query: {
                filter: {
                    pk: it_id
                }
            }
        })).data[0]

        for (const item of items) {
            await ctx.run({
                token: process.env.SYSTEM_TOKEN,
                model: "item",
                method: "delete",
                query: {
                    filter: {
                        pk: item[ctx.helpers.pk("item")],
                    }
                }
            })
        }



        let flag = true
        const slot = items[0].slot
        const total = ctx.lodash.sumBy(items, "amount")
        let remain = parseInt(total)

        for (; ;) {
            const amount = remain > item_type.stack ? item_type.stack : remain
            await ctx.run({
                token: process.env.SYSTEM_TOKEN,
                model: "item",
                method: "create",
                body: {
                    slot: flag ? slot : undefined,
                    inventory: inventory,
                    amount: amount,
                    item_type: item_type[ctx.helpers.pk("item_type")],
                }
            })
            remain = remain - amount
            if (remain === 0) {
                break
            }
        }

    }
}