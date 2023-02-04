module.exports = async function (ctx) {
    await ctx.lifecycle({
        name: "move_inventory_type_check",
        wait: true,
        function: async function (payload, ctx, state) {


            return true
        }
    })
}