<script setup>
import { useStore } from "@/store/index.js";
import { onMounted, ref, watch } from "vue";
import router from "@/plugins/router";
import lodash from "lodash";
const store = useStore();
watch(
  () => store.token,
  function (n) {
    if (!n) {
      router.push({ name: "login" });
    }
  }
);
</script>

<template lang="pug">
v-app(app, dark)
  v-main(app)
    router-view
</template>


