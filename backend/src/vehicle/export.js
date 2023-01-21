module.exports = async function (ctx) {
    await ctx.use(require("./models/vehicle.js"))
    await ctx.use(require("./models/vehicle_type.js"))
    await ctx.use(require("./menus/index"))
    setInterval(() => {
        console.log("fuel--");
    }, 60 * 1000);
}


