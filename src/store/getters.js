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
  chartData(state) {
    return state.chart.data;
  },
  chartStatus(state) {
    return state.chart.status;
  },
  getFavorites(state) {
    return state.getFavorites;
  },
  hasFavorites(state) {
    return state.favorites && state.favorites.length > 0;
  }
};
