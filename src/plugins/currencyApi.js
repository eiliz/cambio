import currencyApi from "@/api/currencyApi";

export default {
  install(Vue) {
    Object.defineProperty(Vue.prototype, "$currencyApi", {
      value: currencyApi
    });
  }
};
