module.exports = {
    name: 'member',
    database: process.env.DATABASE,
    schema: {
        faction: {
            relation: "faction",
        },
        character: {
            relation: "player",
        },
        role: {
            type: "string",
            required: true,
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

    }
}