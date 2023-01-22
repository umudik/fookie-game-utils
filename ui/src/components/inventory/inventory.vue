<template lang="pug">
v-card
  v-card-title Inventory
  v-card-subtitle {{ inventory_id }}
  v-card-text 
    v-row.drop 
      v-col.drop_item(
        v-for="(item, index) of inventory_type.slotSize",
        :key="item.id"
      )
        v-menu(offset-x)
          template(v-slot:activator="{ props }")
            v-img(
              v-if="getItem(index)",
              :src="getItemType(getItem(index).item_type).image",
              aspect-ratio="1",
              height="110",
              width="110",
              contain
            )
              v-sheet.d-flex(
                color="transparent",
                height="110",
                width="110",
                elevation="4",
                v-bind="props"
              )
                span.tw-text-xs {{ index + 1 }}
                v-sheet.mt-auto {{ getItemType(getItem(index).item_type).name }}
                v-sheet.mt-auto.ml-auto
                  span.tw-text-3xl {{ getItem(index).amount }}x
            v-sheet(
              v-if="!getItem(index)",
              height="110",
              width="110",
              elevation="1"
            )
              span.tw-text-xs {{ index + 1 }}
          v-list(dense)
            v-list-item(link) Use
            v-list-item(link) Drop
  v-card-text
</template>
  
  <script setup>
import lodash from "lodash";
import { useStore } from "@/store/index.js";
import { onMounted, ref, watch, defineProps } from "vue";
const store = useStore();

const props = defineProps(["inventory_id"]);
const inventory = ref({});
const inventory_type = ref({});
const items = ref([]);
const item_types = ref([]);

onMounted(async function () {
  inventory.value = (
    await store.run({
      model: "inventory",
      method: "read",
      query: {
        filter: {
          pk: props.inventory_id,
        },
      },
    })
  ).data[0];

  items.value = (
    await store.run({
      model: "item",
      method: "read",
      query: {
        filter: {
          inventory: props.inventory_id,
        },
      },
    })
  ).data;

  item_types.value = (
    await store.run({
      model: "item_type",
      method: "read",
    })
  ).data;

  inventory_type.value = (
    await store.run({
      model: "inventory_type",
      method: "read",
      query: {
        filter: {
          pk: inventory.value.inventory_type,
        },
      },
    })
  ).data[0];
});

const getItem = function (index) {
  return lodash.find(items.value, { slot: index });
};

const getItemType = function (id) {
  return lodash.find(item_types.value, { id: id });
};
</script>
  
  <style>
</style>