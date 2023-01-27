const jwt = require('jsonwebtoken');
module.exports = async function (ctx) {
  await ctx.lifecycle({
    name: "set_user",
    function: async function (payload, ctx, state) {
      if (payload.token) {
        try {
          const obj = jwt.verify(payload.token, process.env.SYSTEM_TOKEN);
          state.user = (await ctx.run({
            token: process.env.SYSTEM_TOKEN,
            model: "player",
            method: "read",
            query: {
              filter: {
                email: obj.email //TEST İÇİN DEĞİŞTİRDİN PK ÜSTÜNDEN BAK
              }
            }
          })).data[0]
        } catch (error) {
        }
      }
    }
  })
};
