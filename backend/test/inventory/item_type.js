module.exports = async function (ctx) {
    await ctx.test({
        name: "item_type",
        function: async function (state) {

            const item_type_1_res = await ctx.run({
                token: state.system_token,
                model: "item_type",
                method: "create",
                body: {
                    name: "money",
                    weight: 0.001,
                    stack: 200,
                    image: "https://i.picsum.photos/id/600/200/200.jpg?hmac=x3_SXBDfy4wqgriXAHmONXmt4rEB-k8sVoY7P5q8Bgs"
                }
            })
            const item_type_2_res = await ctx.run({
                token: state.system_token,
                model: "item_type",
                method: "create",
                body: {
                    name: "food",
                    weight: 1,
                    stack: 5,
                    image: "https://i.picsum.photos/id/600/200/200.jpg?hmac=x3_SXBDfy4wqgriXAHmONXmt4rEB-k8sVoY7P5q8Bgs"
                }
            })
            if (!item_type_2_res.status || !item_type_2_res.status) throw Error("item type")

            const item_type_1 = item_type_1_res.data
            const item_type_2 = item_type_2_res.data

            state.item_type_1 = item_type_1
            state.item_type_2 = item_type_2




            // EXAMPLE ITEMS

            const list = ["iron", "copper", "wood", "plastic", "electronic", "clue", "screw", "lockpick", "water", "chocolate", "cola", "phone"]
            for (const i of list) {
                await ctx.run({
                    token: state.system_token,
                    model: "item_type",
                    method: "create",
                    body: {
                        name: i,
                        weight: Math.random(),
                        stack: 200,
                        image: "https://i.picsum.photos/id/600/200/200.jpg?hmac=x3_SXBDfy4wqgriXAHmONXmt4rEB-k8sVoY7P5q8Bgs"
                    }
                })
            }

        }
    })
}