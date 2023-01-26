<template lang="pug">
v-card
  v-card-title Crafting
  v-card-text 
    v-row
      v-col(cols="4")
        v-list
          v-list-item(
            v-for="(ct, i) in craft_types",
            link,
            @click="select(ct)"
          ) {{ ct.name }}
      v-col(cols="8")
        v-row
          v-col Input
            v-list(:items="ins", item-props)
          v-col Output
            v-list(:items="outs", item-props)
        v-row
          v-col
            v-btn CRAFT
</template>
  
  <script setup>
import lodash from "lodash";
import { useStore } from "@/store/index.js";
import { onMounted, ref, watch, reactive, computed, defineProps } from "vue";
const store = useStore();

const item_types = ref([]);
const craft_types = ref([]);
const craft_ins = ref([]);
const craft_outs = ref([]);
const selected_ct = reactive({ value: { craft_type: 1 } });

onMounted(async function () {
  item_types.value = (
    await store.remoteRun({
      model: "item_type",
      method: "read",
    })
  ).data;

  craft_types.value = (
    await store.remoteRun({
      model: "craft_type",
      method: "read",
    })
  ).data;

  craft_ins.value = (
    await store.remoteRun({
      model: "craft_in",
      method: "read",
    })
  ).data;

  craft_outs.value = (
    await store.remoteRun({
      model: "craft_out",
      method: "read",
    })
  ).data;
});

const select = function (ct) {
  selected_ct.value = ct;
};

const ins = computed(function () {
  const arr = lodash.filter(craft_ins.value, {
    craft_type: selected_ct.value.id,
  });
  return arr.map(function (i) {
    return {
      subtitle: ``,
      title: getItemType(i.item_type).name + ` x${i.amount}`,
      prependAvatar: getItemType(i.item_type).image,
    };
  });
});

const outs = computed(function () {
  const arr = lodash.filter(craft_outs.value, {
    craft_type: selected_ct.value.id,
  });
  return arr.map(function (i) {
    return {
      subtitle: "hi",
      title: getItemType(i.item_type).name + ` x${i.amount}`,
      prependAvatar: getItemType(i.item_type).image,
    };
  });
});

const getItemType = function (id) {
  return lodash.find(item_types.value, { id: id });
};
</script>
  
  <style>
</style>