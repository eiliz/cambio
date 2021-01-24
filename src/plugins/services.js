import currencyService from "@/api/currencyService";

export default {
  install(Vue) {
    Object.defineProperty(Vue.prototype, "$currencyService", {
      value: currencyService
    });
  }
};
