<template lang="pug">
v-app(app)
  system_bar
  v-main(app, color="transparent")
    v-container
      v-tabs(v-model="tab")
        v-tab(value="player_inventory") Inventory
        v-tab(value="crafting") Crafting
        v-tab(value="shop") Shop
        v-tab(value="bank") Bank
        v-tab(value="race_edit") Race Edit

      v-window(v-model="tab")
        v-window-item(value="player_inventory")
          v-row
            v-col(cols="12", sm="5")
              f_inventory(:inventory_id="store.player.inventory")
        v-window-item(value="crafting")
          v-row
            v-col(cols="12", sm="5")
              f_inventory(:inventory_id="store.player.inventory")
            v-col(cols="12", sm="7")
              f_crafting
        v-window-item(value="shop")
          v-row
            v-col(cols="12", sm="5")
              f_inventory(:inventory_id="store.player.inventory")
            v-col(cols="12", sm="7")
              f_shop
              v-window-item(value="shop")
        v-window-item(value="bank")
          v-row
            v-col(cols="12", sm="5")
              f_inventory(:inventory_id="store.player.inventory")
            v-col(cols="12", sm="7")
              f_bank
        v-window-item(value="race_edit")
          v-row
            v-col(cols="12", sm="5", offset="7")
              f_race(:player_id="store.player_id")
</template>

<script setup>
import lodash from "lodash";
import system_bar from "@/components/layout/system-bar.vue";
import f_inventory from "@/components/inventory/inventory.vue";
import f_crafting from "@/components/crafting/crafting.vue";
import f_shop from "@/components/shop/shop.vue";
import f_bank from "@/components/bank/bank.vue";
import f_race from "@/components/race/race.vue";
import { useStore } from "@/store/index.js";
import { onBeforeMount, onMounted, ref, watch } from "vue";
const store = useStore();
const tab = ref("player_inventory");
onMounted(async function () {
  const res = await store.remoteRun({
    model: "model",
    method: "read",
  });

  for (let model of res.data) {
    store.data[model.name] = [];
  }

  const list = ["item_type", "craft_type", "craft_in", "craft_out"];
  for (const m of list) {
    const response = await store.remoteRun({
      model: m,
      method: "read",
    });
    store.data[m] = response.data;
  }
});
</script>
