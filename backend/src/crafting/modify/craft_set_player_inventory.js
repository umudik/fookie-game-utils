module.exports = async function (ctx) {
    await ctx.lifecycle({
        name: "craft_set_player_inventory",
        function: async function (payload, ctx, state) {
            payload.body.inventory = state.user.inventory

        }
    })
}