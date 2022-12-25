

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
                role: ["system"],
            },
            delete: {
                role: ["system"],
            },

        }
    })
}
