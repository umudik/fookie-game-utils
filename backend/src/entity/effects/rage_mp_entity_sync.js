module.exports = async function (ctx) {
    await ctx.lifecycle({
        name: "rage_mp_entity_sync",
        async: false,
        function: async function (payload, ctx, state) {

        }
    })
}
