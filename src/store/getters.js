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
    // If we select the same currency for both options, rates[toCurrency] is
    // going to be undefined because the API response doesn't include an entry
    // for the base rate in the rates payload so we set it to 1 for this case
    // where both currencies are the same.
    const rate = rates?.[toCurrency] || 1;

    return {
      fromCurrency,
      toCurrency,
      fromAmount,
      toAmount,
      rate,
      date
    };
  },
  ratesStatus(state) {
    return state.ratesStatus;
  },
  chartData(state) {
    return state.chartData;
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
