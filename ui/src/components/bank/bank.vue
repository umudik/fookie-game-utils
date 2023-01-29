<template lang="pug">
v-card
  v-card-title Bank
  v-card-subtitle Umut
  v-card-text Balance: {{ balance }}$
  v-divider
  v-card-text
    v-text-field(
      label="Amount",
      prefix="$",
      type="number",
      :rules="[(v) => v > 0 || 'min 0']"
    )
  v-card-actions 
    v-spacer
    v-btn Withdraw
    v-btn Deposit
    v-spacer
  v-card-text {{ items }}
</template>
  
  <script setup>
import lodash from "lodash";
import { useStore } from "@/store/index.js";
import { onMounted, ref, watch, defineProps } from "vue";
const store = useStore();

const bank_account = ref({});
const owner = ref({});
const inventory = ref({});
const items = ref([]);
const balance = ref(0);

onMounted(async function () {
  owner.value = (
    await store.remoteRun({
      model: "player",
      method: "read",
      query: {
        filter: {
          pk: store.player_id,
        },
      },
    })
  ).data[0];

  bank_account.value = (
    await store.remoteRun({
      model: "bank_account",
      method: "read",
      query: {
        filter: {
          player: owner.value.id,
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
          pk: bank_account.value.inventory,
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
          inventory: inventory.value.id,
        },
      },
    })
  ).data;
  balance.value = lodash.sumBy(items.value, "amount");
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