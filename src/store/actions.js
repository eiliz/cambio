import currencyApi from "@/api/currencyApi";
import apiStatus from "@/api/constants/apiStatus";

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
  async convertCurrency({ state, commit, dispatch }) {
    try {
      const response = await currencyApi.getRates({
        base: state.fromCurrency,
        date: state.date
      });

      const { rates, date } = response.data;
      const toAmount = (
        rates[state.toCurrency] * parseFloat(state.fromAmount)
      ).toFixed(2);

      commit("SET_CONVERSION", {
        toAmount,
        rate: rates[state.toCurrency],
        date
      });

      dispatch("fetchDataForChart");
    } catch (error) {
      console.log(error);
    }
  },
  reverseConversion({ commit }) {
    commit("SET_REVERSE_CONVERSION");
  },
  async fetchDataForChart({ state, commit }) {
    try {
      commit("SET_CHART_STATUS", apiStatus.PENDING);

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
        base: state.fromCurrency,
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
            value: item[state.toCurrency].toFixed(2)
          });
        });
      }
      const sortedChartData = chartData.sort(function(a, b) {
        return new Date(a.date) - new Date(b.date);
      });

      setTimeout(() => {
        commit("SET_CHART_DATA", sortedChartData);
        commit("SET_CHART_STATUS", apiStatus.SUCCESS);
      }, 2500);
    } catch (error) {
      commit("SET_CHART_DATA", null);
      commit("SET_CHART_STATUS", apiStatus.ERROR);
      console.log(error);
    }
  },
  onFavorite({ state, commit, getters }) {
    const currentCurrencyPair = JSON.stringify(getters.getCurrentCurrencyPair);

    if (getters.isPairInFavorites) {
      commit(
        "SET_FAVORITES",
        state.favorites.filter(entry => entry !== currentCurrencyPair)
      );

      return;
    }

    commit("SET_FAVORITES", [...state.favorites, currentCurrencyPair]);
  },
  setCurrentCurrencies({ commit, dispatch }, { fromCurrency, toCurrency }) {
    commit("SET_FROM_CURRENCY", fromCurrency);
    commit("SET_TO_CURRENCY", toCurrency);
    dispatch("convertCurrency");
  }
};
