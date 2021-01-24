import currencyService from "@/api/currencyService";
import statuses from "./statuses";

const months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(function(mon) {
  return new Date(2000, mon).toLocaleString({}, { month: "short" });
});

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
  async convertCurrency(
    { state, commit, dispatch },
    { fromCurrency, toCurrency }
  ) {
    try {
      const response = await currencyService.getRates({
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

      dispatch("fetchDataForChart", {
        fromCurrency,
        toCurrency
      });
    } catch (error) {
      console.log(error);
    }
  },
  reverseConversion({ commit }) {
    commit("SET_REVERSE_CONVERSION");

    commit("SET_STATUS", statuses.success);
  },
  async fetchDataForChart({ commit }, { fromCurrency, toCurrency }) {
    try {
      let pastDate = new Date();
      pastDate.setDate(pastDate.getDate() - 7);
      let date = new Date();

      const oneWeekAgo = `${pastDate.getFullYear()}-${pastDate.getMonth() +
        1}-${pastDate.getDate() - 2}`;

      const currentDate = `${date.getFullYear()}-${date.getMonth() +
        1}-${date.getDate()}`;

      const {
        data: { rates }
      } = await currencyService.getRatesForPeriod({
        base: fromCurrency,
        startAt: oneWeekAgo,
        endAt: currentDate
      });

      let chartData = [];

      for (let key in rates) {
        let d = new Date(key);
        let newDate = `${d.getDate()} ${months[d.getMonth()]}`;

        [rates[key]].map(item => {
          chartData.push({
            date: newDate,
            value: item[toCurrency].toFixed(2)
          });
        });
      }
      const sortedChartData = chartData.sort(function(a, b) {
        return new Date(a.date) - new Date(b.date);
      });

      commit("SET_CHART_DATA", sortedChartData);
    } catch (error) {
      console.log(error);
    }
  }
};
