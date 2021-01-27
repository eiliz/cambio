// Using constants helps to take advantage of tools like linters and avoid
//accidental typos. Also, having a file with constant types can serve as a quick
//guide on what kind of getters, actions, and mutations a Vuex module deals with.
import * as types from "./types";

export default {
  [types.SET_CURRENCIES](state, payload) {
    state.currencies = payload;
  },
  [types.SET_CONVERSION](state, { toAmount, rate }) {
    state.toAmount = toAmount;
    state.rate = rate;
  },
  [types.SET_REVERSE_CONVERSION](state) {
    state.fromAmount = (parseFloat(state.toAmount) / state.rate).toFixed(2);
  },
  [types.SET_FROM_AMOUNT](state, amount) {
    state.fromAmount = amount;
  },
  [types.SET_TO_AMOUNT](state, amount) {
    state.toAmount = amount;
  },
  [types.SET_FROM_CURRENCY](state, currency) {
    state.fromCurrency = currency;
  },
  [types.SET_TO_CURRENCY](state, currency) {
    state.toCurrency = currency;
  },
  [types.SET_DATE](state, date) {
    state.date = date;
  },
  [types.SET_PERIOD_FOR_CHART](state, period) {
    state.periodForChart = period;
  },
  [types.SET_CHART_DATA](state, data) {
    state.chart.data = data;
  },
  [types.SET_CHART_STATUS](state, status) {
    state.chart.status = status;
  },
  [types.SET_FAVORITES](state, payload) {
    state.favorites = payload;

    localStorage.setItem("cambioFavorites", JSON.stringify(state.favorites));
  }
};
