import "./assets/main.css";
import "vue-final-modal/style.css";

import { createApp } from "vue";
import { createVfm } from "vue-final-modal";

import setDefaultValidationRules from "../config/validation.js";

import App from "./App.vue";
const vfm = createVfm();
setDefaultValidationRules();
createApp(App).use(vfm).mount("#app");
