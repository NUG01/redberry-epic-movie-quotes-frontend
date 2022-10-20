import { createApp } from "vue";
import { createPinia } from "pinia";
import "@/config/rules.js";
import "@/config/messages.js";


import App from "./App.vue";
import router from "./router";

import "./style.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");
