module.exports = async function (ctx) {
    await ctx.lifecycle({
        name: "set_type",
        function: async function (payload, ctx, state) {
            state.entity_type = (await ctx.run({
                token: process.env.SYSTEM_TOKEN,
                model: "entity_type",
                method: "read",
                query: { filter: { pk: payload.body.entity_type } }
            })).data[0]
        }
    })
}