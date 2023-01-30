<template lang="pug">
v-card
  v-card-title Bank
  v-card-subtitle {{ owner.name }}
  v-card-text Balance: {{ balance }}$
  v-divider
  v-card-text
    v-text-field(
      v-model="amount",
      min="0",
      label="Amount",
      prefix="$",
      type="number",
      :rules="[(v) => v > 0 || 'min 0']"
    )
  v-card-actions 
    v-spacer
    v-btn(@click="withdraw") Withdraw
    v-btn(@click="deposit") Deposit
    v-spacer
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
const amount = ref(0);
const money = lodash.find(store.data.item_type, { name: "money" });

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

const withdraw = async function () {
  const res = await store.remoteRun({
    model: "move_item",
    method: "create",
    body: {
      from: bank_account.value.inventory,
      to: owner.value.inventory,
      item_type: money.id,
      amount: Number(amount.value),
    },
  });
  console.log(res);
};

const deposit = async function () {
  const res = await store.remoteRun({
    model: "move_item",
    method: "create",
    body: {
      from: owner.value.inventory,
      to: bank_account.value.inventory,
      item_type: money.id,
      amount: Number(amount.value),
    },
  });
};
</script>
  
  <style>
</style>