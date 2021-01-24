import currencyService from "@/api/currencyService";
import statuses from "./statuses";

export default {
  async fetchAllSupportedCurrencies({ commit }) {
    try {
      const {
        data: { base, rates }
      } = await currencyService.getAllRatesForBaseCurrency();

      // The default base currency is not included in the rates payload so we
      // have to merge it in the array of currencies
      const currencies = [base, ...Object.keys(rates)];

      commit("SET_CURRENCIES", currencies);
    } catch (err) {
      console.log(err);
    }
  },
  async convertCurrency({ commit, state }, { fromCurrency, toCurrency }) {
    try {
      const response = await currencyService.getRateForSymbols({
        base: fromCurrency,
        date: state.date
      });

      const { rates, date } = response.data;
      const toAmount = rates[toCurrency] * parseInt(state.fromAmount, 10);

      commit("SET_CONVERSION", {
        fromCurrency,
        toCurrency,
        toAmount,
        rate: rates[toCurrency],
        date
      });

      commit("SET_STATUS", statuses.success);

      // dispatch("fetchCurrencyChart", {
      //   currencyFrom,
      //   currencyTo
      // });
    } catch (error) {
      console.log(error);
    }
  },
  reverseConversion({ commit }) {
    commit("SET_REVERSE_CONVERSION");

    commit("SET_STATUS", statuses.success);
  }
};
