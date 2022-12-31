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
                    default: false
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
                    rule: [],
                    modify: ["set_type"]
                },
                update: {
                    effect: [],
                    rule: [],
                    preRule: ["dont_spawn_twice"],
                    modify: ["set_type"]
                },
                delete: {
                    effect: [],
                    rule: [],
                    modify: ["set_type", "set_computed_data"]
                },
            }
        }
    })
}
