module.exports = async function (ctx) {
    await ctx.model({
        name: 'contact',
        schema: {
            owner: {
                relation: "player",
            },
            other: {
                relation: "player",
            }
        },
        database: process.env.DATABASE,
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