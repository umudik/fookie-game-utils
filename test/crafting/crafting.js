module.exports = async function (ctx) {
    await ctx.test({
        name: "crafting",
        function: async function (state) {
            console.log(2);
        }
    })
}