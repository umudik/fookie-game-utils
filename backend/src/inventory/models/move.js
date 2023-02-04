module.exports = async function (ctx) {
    await ctx.model({
        name: "move_item",
        database: process.env.DATABASE,
        mixins: [],
        schema: {
            from: {
                relation: "inventory",
                required: true,
            },
            to: {
                relation: "inventory",
                required: true,
            },
            item_type: {
                relation: "item_type",
                required: true,
            },
            amount: {
                required: true,
                type: "number",
                min: 1
            },
        },
        lifecycle: {
            create: {
                modify: [],
                rule: ["move_rule", "move_inventory_type_check"],
                role: ["system", "logged_in"],
                effect: ["move_effect"],
                accept: {
                    logged_in: {
                        rule: ["logged_in_move_rule"]
                    }
                }
            },
            read: {
                role: ["everybody"],
            },
            update: {
                role: ["system"],
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
