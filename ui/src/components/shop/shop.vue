<template lang="pug">
v-card
  v-card-title Shop
  v-card-subtitle Owner: {{ owner.name }}
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
            :subtitle="`Price ${ip.price}$ | ${ip.type == 'buy' ? 'Stock ' + stock(ip.item_type) + 'x |' : ''} `",
            link,
            @click="() => (isSelected ? null : toggle())"
          )
            template(v-slot:append, v-if="isSelected")
              v-text-field(
                density="comfortable",
                style="width: 75px",
                type="number",
                hide-details,
                v-model="amount",
                variant="outlined"
              )

              v-btn.tw-ml-2(
                variant="tonal",
                @click="txn(ip)",
                :disabled="ip.type == 'buy' && stock(ip.item_type) === 0",
                :color="ip.type == 'buy' && stock(ip.item_type) === 0 ? 'red' : ''"
              ) {{ ip.type }}
</template>
  
  <script setup>
import lodash from "lodash";
import { useStore } from "@/store/index.js";
import { onMounted, ref, watch, defineProps } from "vue";
const store = useStore();

const props = defineProps(["shop_id"]);
const shop = ref({});
const owner = ref({});
const inventory = ref({});
const inventory_type = ref({});
const items = ref([]);
const amount = ref(1);
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

  owner.value = (
    await store.remoteRun({
      model: "player",
      method: "read",
      query: {
        filter: {
          pk: shop.value.owner,
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
          pk: shop.value.inventory,
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
          inventory: shop.value.inventory,
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
          shop: shop.value.id,
        },
      },
    })
  ).data;
});

const getItemType = function (id) {
  return lodash.find(store.data.item_type, { id });
};
const txn = async function (ip) {
  const res = await store.remoteRun({
    model: "shop_transaction",
    method: "create",
    body: {
      shop: shop.value.id,
      item_type: ip.item_type,
      amount: Number(amount.value),
      type: ip.type,
    },
  });
  console.log(res);
};

const stock = function (item_type) {
  const its = lodash.filter(items.value, {
    item_type,
  });
  return lodash.sumBy(its, "amount");
};
</script>
  
  <style>
</style>