<script setup>
import { useStore } from "@/store/index.js";
import { onMounted, ref, watch } from "vue";
import lodash from "lodash";
const store = useStore();

onMounted(async () => {});
</script>

<template lang="pug">
v-app(app)
  v-main(app)
    v-container(app)
      div hi
</template>


