module.exports = async function (ctx) {
    await ctx.mixin({
        name: "entity",
        object: {
            schema: {
                tag: {
                    type: "string",
                    required: true,
                    default: "-"
                },
                parent_id: {
                    type: "string",
                    required: true,
                    default: "-",
                },
                spawned: {
                    type: "boolean",
                    required: true,
                    default: true
                },
                dimension: {
                    type: "number",
                    default: 0,
                },
                position: {
                    required: true,
                    type: "object",
                },
                heading: {
                    type: "number",
                    default: 0
                },
            },
            lifecycle: {
                read: {
                },
                create: {
                    effect: [],
                    role: ["system"],
                    rule: [],
                    modify: []
                },
                update: {
                    effect: [],
                    rule: [],
                    preRule: [],

                },
                delete: {
                    effect: [],
                    rule: [],
                    modify: []
                },
            }
        }
    })
}
