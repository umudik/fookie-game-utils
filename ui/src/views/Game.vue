<template lang="pug">
v-app(app)
  system_bar
  v-main(app, color="transparent")
    v-container
      v-tabs(v-model="tab")
        v-tab(value="player_inventory") Inventory
        v-tab(value="crafting") Crafting
        v-tab(value="shop") Shop
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
          span shop
</template>

<script setup>
import lodash from "lodash";
import system_bar from "@/components/layout/system-bar.vue";
import f_inventory from "@/components/inventory/inventory.vue";
import f_crafting from "@/components/crafting/crafting.vue";
import { useStore } from "@/store/index.js";
import { onBeforeMount, onMounted, ref, watch } from "vue";
const store = useStore();

const tab = ref("player_inventory");

onMounted(async function () {
  const fookie = await store.fookie();
  const res = await store.remoteRun({
    model: "model",
    method: "read",
  });
  console.log(res);
});
</script>
