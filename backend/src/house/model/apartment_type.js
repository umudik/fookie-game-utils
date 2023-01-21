module.exports = async function (ctx) {
    await ctx.model({
        name: 'apartment_type',
        database: process.env.DATABASE,
        mixins: [],
        schema: {
            name: {
                type: "string",
                required: true,
                unique: true,
            },
            code: {
                type: "string",
                required: true,
            },
            flat_size: {
                type: "number",
                required: true,
            },
            location: {
                type: "object",
                required: true,
            }
        },
        lifecycle: {
            create: {
                role: ["system"],
            },
            read: {
                role: ["everybody"],
            },
            update: {
                role: ["system"],
                filter: ["set_computed_data"],
                effect: ["apartment_type_door"]
            },
            delete: {
                role: ["system"],
            },
        }
    })

    const array = [
        {
            name: "Model 1 Apartment",
            code: "apa_v_mp_h_01_a",
            location: {
                x: -786.8663,
                y: 315.7642,
                z: 218.0385
            },
            flat_size: 5
        },
        {
            name: "Model 2 Apartment",
            code: "apa_v_mp_h_01_c",
            location: {
                x: -786.8663,
                y: 315.6229,
                z: 188.4136
            },
            flat_size: 5
        },
        {
            name: "Modern 3 Apartment",
            code: "apa_v_mp_h_01_b",
            location: {
                x: -774.0126,
                y: 342.0428,
                z: 197.0
            },
            flat_size: 5
        },
        {
            name: "Mody 1 Apartment",
            code: "apa_v_mp_h_02_a",
            location: {
                x: - 787.0749,
                y: 315.8198,
                z: 218.0386
            },
            flat_size: 5
        },

    ]


}







