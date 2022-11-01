import { createApp } from "vue";
import { createPinia } from "pinia";
import "@/config/vee-validate/rules.js";
import "@/config/vee-validate/messages.js";
import { markRaw } from 'vue'


import App from "./App.vue";
import router from "./router";

import "./style.css";

const app = createApp(App);
app.use(router);
const pinia = createPinia();
pinia.use(({ store }) => { store.router = markRaw(router) });
app.use(pinia);
// app.use(createPinia());



app.mount("#app");
