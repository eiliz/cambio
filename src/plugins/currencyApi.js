import Vue from "vue";
import currencyApi from "@/api/currencyApi";

const currencyApiPlugin = {
  install(Vue) {
    Object.defineProperty(Vue.prototype, "$currencyApi", {
      value: currencyApi
    });
  }
};

Vue.use(currencyApiPlugin);
