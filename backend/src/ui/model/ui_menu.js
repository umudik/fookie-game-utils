module.exports = async function (ctx) {
  await ctx.model({
    name: "active_menu",
    database: "store",
    schema: {
      tag: {
        type: "string",
        required: true,
      },
      entity: {
        type: "string",
        required: true,
      },
      player: {
        relation: "player",
        required: true
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
        accept: {
          logged_in: {
            modify: ["add_player_to_menu"]
          }
        },
        role: ["system", "logged_in"],
        effect: ["menu_open"]
      },
      delete: {
        role: ["system"],
      },
      count: {
        role: ["everybody"],
      },
    },
  });


  await ctx.lifecycle({
    name: "add_player_to_menu",
    function: async function (payload, ctx, state) {
      payload.body.player = state.user.fookie_id
    }
  })
};
