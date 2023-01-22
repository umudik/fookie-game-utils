<template lang="pug">
v-app(app)
  system_bar
  v-main(app, color="transparent")
    v-container
      v-row
        v-col(cols="12", sm="5")
          f_inventory(:inventory_id="store.player.inventory")
</template>

<script setup>
import system_bar from "@/components/layout/system-bar.vue";
import f_inventory from "@/components/inventory/inventory.vue";
import { useStore } from "@/store/index.js";
import { onBeforeMount, onMounted, ref, watch } from "vue";
const store = useStore();
</script>
