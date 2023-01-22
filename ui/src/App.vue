<script setup>
import { useStore } from "@/store/index.js";
import { onMounted, ref, watch } from "vue";
import lodash from "lodash";
const store = useStore();

onMounted(async () => {});
</script>

<template lang="pug">
v-app(app, dark)
  v-main(app)
    router-view
</template>


