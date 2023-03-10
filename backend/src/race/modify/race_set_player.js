module.exports = async function (ctx) {
    await ctx.lifecycle({
        name: "race_set_player",
        wait: true,
        function: async function (payload, ctx, state) {
            payload.body.player = state.user[ctx.helpers.pk("player")]
        }
    })
}