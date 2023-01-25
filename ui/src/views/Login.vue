<template lang="pug">
.tw-flex.tw-justify-center.tw-items-center.tw-min-h-screen
  v-card(width="600")
    v-card-title Login
    v-card-text
      v-text-field(
        label="E-mail",
        v-model="email",
        prepend-icon="mdi-account",
        :rules="[(v) => !!v || 'Username is required']"
      )
      v-text-field(
        label="Password",
        v-model="password",
        prepend-icon="mdi-lock",
        type="password",
        :rules="[(v) => !!v || 'Password is required']"
      )
    v-card-actions
      v-spacer
      v-btn(color="primary", dark, @click="login") login
</template>

<script setup>
import axios from "axios";
import { useStore } from "@/store/index.js";
import { onMounted, ref, watch } from "vue";
import lodash from "lodash";
import router from "@/plugins/router";
const store = useStore();

const email = ref("umut");
const password = ref("umut");

const login = async function () {
  const res = (
    await axios.post("http://localhost:2626", {
      model: "player",
      method: "login",
      query: {
        filter: {
          email: email.value,
          password: password.value,
        },
      },
    })
  ).data;

  if (res.status) {
    store.token = res.data.token;
    store.player_id = res.data.id;
    store.player = (
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
    router.push({ name: "game" });
  }
};
</script>
