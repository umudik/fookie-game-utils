module.exports = async function (ctx) {
    await ctx.model({
        name: 'entity_type',
        database: "store",
        schema: {
            model: {
                required: true,
                unique: true,
                type: "string",
            },
            pool: {
                required: true,
                type: "string",
            },
            spawnAtStart: {
                type: "boolean",
                required: true,
                default: true
            },
            last_sync: {
                t, ype: "number",
            },
            sync_rate: {
                type: "number",
            }
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
            count: {
                role: ["everybody"],
            },
        }
    })



    const entityTypes = [
        {
            model: "vehicle",
            pool: "vehicles",
            spawnAtStart: true,
            sync_rate: 1000,
        },
        {
            model: "object",
            pool: "objects",
            spawnAtStart: true,
            sync_rate: 2000,
        },
        {
            model: "marker",
            pool: "markers",
            spawnAtStart: true,
            sync_rate: 1000,
        },
        {
            model: "blip",
            pool: "blips",
            spawnAtStart: true,
            sync_rate: 1000,
        },
        {
            model: "colshape",
            pool: "colshapes",
            spawnAtStart: true,
            sync_rate: 1000,
        },
        {
            model: "label",
            pool: "labels",
            spawnAtStart: true,
            sync_rate: 1000,
        },
        {
            model: "checkpoint",
            pool: "checkpoints",
            spawnAtStart: true,
            sync_rate: 1000,
        },
        {
            model: "player",
            pool: "players",
            spawnAtStart: false,
            sync_rate: 1000,
        },


    ]

    for (const et of entityTypes) {
        let res = await ctx.run({
            token: process.env.SYSTEM_TOKEN,
            model: "entity_type",
            method: "create",
            body: et
        })
    }
}