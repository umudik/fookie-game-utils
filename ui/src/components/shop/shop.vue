<template lang="pug">
v-card
  v-card-title Shop
  v-card-text
    v-item-group
      v-list
        v-item(
          v-for="ip of shop_item_type_prices",
          v-slot="{ isSelected, selectedClass, toggle }"
        )
          v-list-item(
            :title="getItemType(ip.item_type).name",
            :prepend-avatar="getItemType(ip.item_type).image",
            :subtitle="`${ip.type} ${ip.price}$`",
            link,
            @click="() => (isSelected ? null : toggle())"
          )
            template(v-slot:append, v-if="isSelected")
              v-btn(@click="txn(ip)") {{ ip.type }}
</template>
  
  <script setup>
import lodash from "lodash";
import { useStore } from "@/store/index.js";
import { onMounted, ref, watch, defineProps } from "vue";
const store = useStore();

const props = defineProps(["shop_id"]);
const shop = ref({});
const inventory = ref({});
const inventory_type = ref({});
const items = ref([]);
const shop_item_type_prices = ref([]);

onMounted(async function () {
  shop.value = (
    await store.remoteRun({
      model: "shop",
      method: "read",
      query: {
        filter: {
          pk: props.shop_id,
        },
      },
    })
  ).data[0];

  inventory.value = (
    await store.remoteRun({
      model: "inventory",
      method: "read",
      query: {
        filter: {
          pk: shop.inventory,
        },
      },
    })
  ).data[0];

  inventory_type.value = (
    await store.remoteRun({
      model: "inventory_type",
      method: "read",
      query: {
        filter: {
          name: "shop",
        },
      },
    })
  ).data[0];

  items.value = (
    await store.remoteRun({
      model: "item",
      method: "read",
      query: {
        filter: {
          inventory: shop.inventory,
        },
      },
    })
  ).data;

  shop_item_type_prices.value = (
    await store.remoteRun({
      model: "shop_item_type_price",
      method: "read",
      query: {
        filter: {
          shop: props.shop_id,
        },
      },
    })
  ).data;
});

const getItemType = function (id) {
  return lodash.find(store.data.item_type, { id });
};
const txn = async function (data) {
  console.log(data.type);
};
</script>
  
  <style>
</style>