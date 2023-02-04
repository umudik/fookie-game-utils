<template lang="pug">
v-card
  v-card-title Race Edit
  v-card-subtitle {{ props }}
  v-card-text
    pre {{ race_types }}
</template>
  
  <script setup>
import lodash from "lodash";
import { useStore } from "@/store/index.js";
import { onMounted, ref, watch, defineProps, reactive } from "vue";
const store = useStore();

const props = defineProps(["player_id"]);
const race_types = ref([]);
const selected_type = reactive({ value: { race_type: 1 } });

onMounted(async function () {
  race_types.value = (
    await store.remoteRun({
      model: "race_type",
      method: "read",
      query: {
        filter: {},
      },
    })
  ).data;
});

const select = function (race_type) {
  selected_type.value = race_type;
};
</script>
  
  <style>
</style>