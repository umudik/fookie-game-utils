

module.exports = async function (ctx) {
    await ctx.model({
        name: 'craft',
        database: process.env.DATABASE,
        schema: {
            craft_type: {
                relation: "craft_type",
                required: true,
            },
            inventory: {
                relation: "inventory",
                required: true,
            }
        },
        lifecycle: {
            read: {
                role: ["everybody"],
            },
            update: {
                role: ["system"],
            },
            create: {
                modify: [],
                rule: ["craft_sets", "has_items", "control_slot", "control_weight"],
                role: ["system", "logged_in"],
                effect: ["craft_items"],
                accept: {
                    logged_in: {
                        modify: ["craft_set_player_inventory"]
                    }
                }
            },
            delete: {
                role: ["system"],
            },
            count: {
                role: ["system"],
            },

        }
    })
}
