module.exports = async function (ctx) {
    await ctx.model({
        name: 'crafting_table',
        database: process.env.DATABASE,
        mixins: [],
        schema: {
            name: {
                type: "string",
                input: "text"
            },
            desc: {
                type: "string",
                input: "text"
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
    }
    )
}
