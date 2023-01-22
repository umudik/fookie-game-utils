import { defineStore } from "pinia";
import axios from 'axios'
export const useStore = defineStore("store", {
    state: () => {
        return {
            entites: {
                model: [],
                database: [],
                lifecycle: [],
                setting: [],
                mixin: [],
            },
            url: "http://localhost:2626",
            player: null,
            token: "",
            player_id: ""
        };
    },
    actions: {
        async run(payload) {
            const url = this.url
            const token = this.token
            const res = await axios.post(url, {
                ...payload, token
            })
            return res.data
        },
    },
});