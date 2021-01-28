// Using constants helps to take advantage of tools like linters and avoid
//accidental typos. Also, having a file with constant types can serve as a quick
//guide on what kind of getters, actions, and mutations a Vuex module deals with.
import * as types from "./types";

export default {
  [types.SET_CURRENCIES](state, payload) {
    state.currencies = payload;
  },

  [types.SET_REVERSE_CONVERSION](state) {
    // Handle the case where the user deletes the toAmount input value so that
    // we don't attempt arithmetics on NaNs.
    if (isNaN(parseFloat(state.toAmount))) {
      state.fromAmount = "";
      return;
    }

    // The API doesn't include weekend dates so if the selected date is one of
    // those we instead use the most recent date the ones returned.
    let dateForConversion = state.date;

    if (!state.rates[state.date]) {
      dateForConversion = Object.keys(state.rates).sort(function(a, b) {
        return new Date(b) - new Date(a);
      })[0];
    }

    state.fromAmount = (
      parseFloat(state.toAmount) /
      state.rates[dateForConversion][state.toCurrency]
    ).toFixed(2);
  },
  [types.SET_FROM_AMOUNT](state, amount) {
    state.fromAmount = amount;
  },
  [types.SET_TO_AMOUNT](state, amount) {
    state.toAmount = amount;
  },
  [types.SET_RATES](state, rates) {
    state.rates = rates;
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
