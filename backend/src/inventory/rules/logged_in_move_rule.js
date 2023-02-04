module.exports = async function (ctx) {
    await ctx.lifecycle({
        name: "logged_in_move_rule",
        wait: true,
        function: async function (payload, ctx, state) {
            state.from_inventory = (await ctx.run({
                token: process.env.SYSTEM_TOKEN,
                model: "inventory",
                method: "read",
                query: {
                    filter: {
                        pk: payload.body.from,
                    }
                },

            })).data[0]

            state.to_inventory = (await ctx.run({
                token: process.env.SYSTEM_TOKEN,
                model: "inventory",
                method: "read",
                query: {
                    filter: {
                        pk: payload.body.to,
                    }
                },

            })).data[0]

            state.from_type = (await ctx.run({
                token: process.env.SYSTEM_TOKEN,
                model: "inventory_type",
                method: "read",
                query: {
                    filter: {
                        pk: state.from_inventory.inventory_type
                    }
                },

            })).data[0]

            state.to_type = (await ctx.run({
                token: process.env.SYSTEM_TOKEN,
                model: "inventory_type",
                method: "read",
                query: {
                    filter: {
                        pk: state.to_inventory.inventory_type
                    }
                },

            })).data[0]


            if (state.to_type.name === "drop" || state.from_type.name === "drop") {
                if (state.to_type.name === "drop" && state.from_type.name !== "player") {
                    return false
                }

                if (state.to_type.name === "player" && state.from_type.name !== "drop") {
                    return false
                }

                const player_inventory = state.to_type.name === "player" ? payload.body.to : payload.body.from

                if (player_inventory !== state.user.inventory) {
                    return false
                }
            }

            if (state.to_type.name === "bank" || state.from_type.name === "bank") {
                if (state.to_type.name === "bank" && state.from_type.name !== "player") {
                    return false
                }

                if (state.to_type.name === "player" && state.from_type.name !== "bank") {
                    return false
                }

                const bank_inventory = state.to_type.name === "bank" ? payload.body.to : payload.body.from
                const bank_account = (await ctx.run({
                    token: process.env.SYSTEM_TOKEN,
                    model: "bank_account",
                    method: "read",
                    query: {
                        filter: {
                            inventory: bank_inventory
                        }
                    },

                })).data[0]

                if (bank_account.player !== state.user[ctx.helpers.pk("player")]) {
                    return false
                }
            }

            if (state.to_type.name === "shop" || state.from_type.name === "shop") {

                if (state.to_type.name === "shop" && state.from_type.name !== "player") {
                    return false
                }

                if (state.to_type.name === "player" && state.from_type.name !== "shop") {
                    return false
                }

                const shop_inventory = state.to_type.name === "shop" ? payload.body.to : payload.body.from
                const shop = (await ctx.run({
                    token: process.env.SYSTEM_TOKEN,
                    model: "bank_account",
                    method: "read",
                    query: {
                        filter: {
                            inventory: shop_inventory
                        }
                    },
                })).data[0]

                if (shop.player !== state.user[ctx.helpers.pk("player")]) {
                    return false
                }


            }


            if (state.to_type.name === "player" && state.from_type.name === "player") {
                if (payload.body.to !== state.user.inventory || payload.body.from !== state.user.inventory) {
                    return false
                }
            }

            return true
        }
    })
}