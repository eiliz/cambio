export default {
  SET_CURRENCIES(state, payload) {
    state.currencies = payload;
  },
  SET_CONVERSION(state, { fromCurrency, toCurrency, toAmount, rate }) {
    state.fromCurrency = fromCurrency;
    state.toCurrency = toCurrency;
    state.toAmount = toAmount;
    state.rate = rate;
  },
  SET_REVERSE_CONVERSION(state) {
    state.fromAmount = (parseFloat(state.toAmount) / state.rate).toFixed(2);
  },
  SET_STATUS(state, status) {
    state.status = status;
  },
  SET_FROM_AMOUNT(state, amount) {
    state.fromAmount = amount;
  },
  SET_TO_AMOUNT(state, amount) {
    state.toAmount = amount;
  },
  SET_DATE(state, date) {
    state.date = date;
  },
  SET_CHART_DATA(state, payload) {
    state.chartData = payload;
  }
};
