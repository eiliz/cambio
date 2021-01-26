import currencyApi from "@/api/currencyApi";
import status from "@/status";

const months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(function(mon) {
  return new Date(2000, mon).toLocaleString({}, { month: "short" });
});

export default {
  async fetchAllSupportedCurrencies({ commit }) {
    try {
      const {
        data: { base, rates }
      } = await currencyApi.getAllRatesForBaseCurrency();

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
      const response = await currencyApi.getRates({
        base: fromCurrency,
        date: state.date
      });

      const { rates, date } = response.data;
      const toAmount = (
        rates[toCurrency] * parseFloat(state.fromAmount)
      ).toFixed(2);

      commit("SET_CONVERSION", {
        fromCurrency,
        toCurrency,
        toAmount,
        rate: rates[toCurrency],
        date
      });

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
  },
  async fetchDataForChart({ commit }, { fromCurrency, toCurrency }) {
    try {
      commit("SET_CHART_STATUS", status.loading);

      let pastDate = new Date();
      pastDate.setDate(pastDate.getDate() - 7);
      let date = new Date();

      const oneWeekAgo = `${pastDate.getFullYear()}-${pastDate.getMonth() +
        1}-${pastDate.getDate() - 2}`;

      const currentDate = `${date.getFullYear()}-${date.getMonth() +
        1}-${date.getDate()}`;

      const {
        data: { rates }
      } = await currencyApi.getRatesForPeriod({
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

      setTimeout(() => {
        commit("SET_CHART_DATA", sortedChartData);
        commit("SET_CHART_STATUS", status.completed);
      }, 1500);
    } catch (error) {
      commit("SET_CHART_DATA", null);
      commit("SET_CHART_STATUS", status.failed);
      console.log(error);
    }
  }
};
