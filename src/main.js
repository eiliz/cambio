import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import currencyApi from "@/plugins/currencyApi";

import "@/assets/css/main.css";

import { registerBaseComponents } from "@/helpers/registerBaseComponents";
registerBaseComponents(Vue);

Vue.config.productionTip = false;

Vue.use(currencyApi);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
