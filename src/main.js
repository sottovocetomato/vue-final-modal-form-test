import "./assets/main.css";
import "vue-final-modal/style.css";
import { vMaska } from "maska/vue";

import { createApp } from "vue";
import { createVfm } from "vue-final-modal";

import setDefaultValidationRules from "../config/validation.js";

import App from "./App.vue";
const vfm = createVfm();
setDefaultValidationRules();
const Vue = createApp(App);
Vue.use(vfm);
Vue.directive("maska", vMaska);
Vue.mount("#app");
