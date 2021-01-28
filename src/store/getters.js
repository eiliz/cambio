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
      date,
      dateForConversion
    } = state;

    const rates = state.rates[date] || state.rates[dateForConversion];
    const rate = rates ? rates[toCurrency] : null;

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
  isChartPeriodOneDay(state) {
    return state.periodForChart === "day";
  },
  isChartPeriodOneWeek(state) {
    return state.periodForChart === "week";
  },
  isChartPeriodOneMonth(state) {
    return state.periodForChart === "month";
  },
  getFavorites(state) {
    return [...state.favorites].map(JSON.parse);
  },
  getCurrentCurrencyPair(state) {
    return {
      fromCurrency: state.fromCurrency,
      toCurrency: state.toCurrency
    };
  },
  isPairInFavorites(state) {
    return state.favorites.some(
      entry =>
        entry ===
        JSON.stringify({
          fromCurrency: state.fromCurrency,
          toCurrency: state.toCurrency
        })
    );
  }
};
