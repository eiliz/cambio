export default {
  currencies(state) {
    return state.currencies;
  },
  conversionResult(state) {
    const {
      fromCurrency,
      toCurrency,
      fromAmount,
      toAmount,
      rate,
      date
    } = state;
    return {
      fromCurrency,
      toCurrency,
      fromAmount,
      toAmount,
      rate,
      date
    };
  },
  isInitial(state) {
    return state.status === "INTIAL";
  },
  isLoading(state) {
    return state.status === "LOADING";
  },
  isSuccess(state) {
    return state.status === "SUCCESS";
  },
  isError(state) {
    return state.status === "ERROR";
  },
  chartData(state) {
    return state.chartData;
  }
};
