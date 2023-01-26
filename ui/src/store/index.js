import { defineStore } from "pinia";
import axios from "axios"
import fookie from "fookie"
import { reactive } from "vue"
process.env.SYSTEM_TOKEN = "local"
const fs = reactive({})
const init = fookie.init(fs)
export const useStore = defineStore("store", {
    state: function () {
        return {
            entites: {
                model: [],
                database: [],
                lifecycle: [],
                setting: [],
                mixin: [],
            },
            store: fs,
            url: "http://localhost:2626",
            player: null,
            token: "",
            player_id: ""
        };
    },
    actions: {
        async remoteRun(payload) {
            const url = this.url
            const token = this.token
            const res = await axios.post(url, {
                ...payload, token
            })
            return res.data
        },
        async fookie() {
            await init
            return fookie
        }
    },
});