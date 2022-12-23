module.exports = {
    name: 'item_type',
    database: process.env.DATABASE,
    mixins: ["cache"],
    schema: {
        name: {
            require: true,
            type: "string",
        },
        weight: {
            require: true,
            type: "number",
            default: 1,

        },
        stack: {
            require: true,
            type: "number",
            default: 1
        },
        description: {
            type: "string",
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