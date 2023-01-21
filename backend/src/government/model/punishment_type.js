module.exports = async function (ctx) {
    await ctx.model({
        name: 'punishment_type',
        database: process.env.DATABASE,
        schema: {
            name: {
                type: "string",
                required: true,
            },
            description: {
                type: "string",
                required: true,
            },
            price: {
                type: "string",
                required: true,
            },

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