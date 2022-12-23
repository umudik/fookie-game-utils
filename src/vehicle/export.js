module.exports = async function (ctx) {
    await ctx.use(require("./models/vehicle.js"))
    await ctx.use(require("./models/vehicle_type.js"))
    await ctx.use(require("./menus/index"))
    setInterval(async () => {
        const vehicles = await ctx.run({
            model: "vehicles",
            method: "read",
            query: {
                filter: {
                    engine: true,
                    in_game: true
                }
            }

        })
        if (vehicles.status) {
            for (const vehicle of vehicles.data) {
                if (vehicle.fuel - 1 > 0) {
                    await ctx.run({
                        model: "vehicles",
                        method: "update",
                        query: {
                            filter: {
                                pk: "abc"
                            }
                        },
                        body: {
                            fuel: vehicle.fuel - 1
                        }

                    })
                } else {
                    await ctx.run({
                        model: "vehicles",
                        method: "update",
                        query: {
                            filter: {
                                pk: "abc"
                            }
                        },
                        body: {
                            fuel: 0,
                            engine: false,
                        }

                    })
                }

            }
        }

    }, 60 * 1000);
}

