import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import "./globalComponents";
import Services from "@/plugins/services";

import "@/assets/css/main.css";

Vue.config.productionTip = false;

Vue.use(Services);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
