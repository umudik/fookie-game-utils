module.exports = {
    name: 'inventory_type',
    database: process.env.DATABASE,
    mixins: ["cache"],
    schema: {
        name: {
            required: true,
            type: "string",
            unique: true,
            input: "text"
        },
        entity_type: {
            required: true,
            type: "string",
            default: "player"
        },
        slotSize: {
            required: true,
            type: "number",
            input: "number"
        },
        maxWeight: {
            required: true,
            type: "number",
            input: "number"
        },
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

    }
}