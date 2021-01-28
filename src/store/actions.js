import currencyApi from "@/api/currencyApi";
import apiStatus from "@/api/constants/apiStatus";
import * as types from "./types";
import { format } from "date-fns";
import { subDays, subWeeks, subMonths } from "date-fns";

// I've stored the date format that the exchangeratesapi.io API requires and
// reuse it in multiple place so that it's easy to update it in case it needs to
// be changed.
import { dateFormat as apiDateFormat } from "@/api/constants/dateFormat";

export default {
  // Gets and stores the list of all currencies that can be used in the
  // converter.
  async fetchAllSupportedCurrencies({ commit }) {
    try {
      const {
        data: { base, rates }
      } = await currencyApi.getAllRatesForBaseCurrency();

      // The default base currency is not included in the rates payload so we
      // have to merge it in the array of currencies
      const currencies = [base, ...Object.keys(rates)];

      commit(types.SET_CURRENCIES, currencies);
    } catch (err) {
      console.error(err);
    }
  },
  // Fetches the rates for the current fromCurrency and the currently selected
  // period, relative to the selected date. This way we can avoid making one API
  // call for the selected date and one separate call to get the data for the
  // selected period.
  async fetchRatesForCurrentPeriod({ state, commit, dispatch }) {
    commit(types.SET_RATES_STATUS, apiStatus.PENDING);

    try {
      let startAt;

      switch (state.periodForChart) {
        case "week":
          startAt = format(subWeeks(new Date(state.date), 1), apiDateFormat);
          break;
        case "month":
          startAt = format(subMonths(new Date(state.date), 1), apiDateFormat);
          break;
        default:
          startAt = format(subDays(new Date(state.date), 1), apiDateFormat);
      }

      const endAt = format(new Date(state.date), apiDateFormat);

      let {
        data: { rates }
      } = await currencyApi.getRatesForPeriod({
        base: state.fromCurrency,
        startAt,
        endAt
      });

      /* If the user selected a non trading day for the date like a weekend day
      or Christmas and a period of one day for the chart, the API will return an
      empty object as the rates.
      
      In that case we make an extra call to another endpoint that gives us
      the rate for the most recent trading day, as well as the date for it so
      we can build the rates object to have the same shape as for the regular
      API call with the date as the key and the actual rates as the values.
       */
      if (!Object.keys(rates).length) {
        const { data: ratesForLastTradedDay } = await currencyApi.getRates({
          base: state.fromCurrency,
          date: format(new Date(state.date), apiDateFormat)
        });

        rates = {
          [ratesForLastTradedDay.date]: ratesForLastTradedDay.rates
        };
      }

      commit(types.SET_RATES, rates);
      commit(types.SET_RATES_STATUS, apiStatus.SUCCESS);

      // The API doesn't include weekend dates so if the selected date is one of
      // those we instead use the most recent date the ones returned.
      let dateForConversion = state.date;

      if (!rates[state.date]) {
        dateForConversion = Object.keys(rates).sort(function(a, b) {
          return new Date(b) - new Date(a);
        })[0];

        commit("SET_DATE_FOR_CONVERSION", dateForConversion);
      }

      dispatch("setDataForChart");
    } catch (error) {
      commit(types.SET_RATES_STATUS, apiStatus.ERROR);
      console.error(error);
    }
  },
  calculateConversionResult({ state, commit }) {
    if (isNaN(parseFloat(state.fromAmount))) {
      commit(types.SET_TO_AMOUNT, "");
      return;
    }

    if (state.fromCurrency === state.toCurrency) {
      commit(types.SET_TO_AMOUNT, state.fromAmount);
      return;
    }

    const rates =
      state.rates[state.date] || state.rates[state.dateForConversion];

    const toAmount = (
      rates[state.toCurrency] * parseFloat(state.fromAmount)
    ).toFixed(2);

    commit(types.SET_TO_AMOUNT, toAmount);
  },
  setDataForChart({ state, commit }) {
    const chartData = {
      labels: [],
      values: []
    };

    const sortedDates = Object.keys(state.rates).sort(function(a, b) {
      return new Date(a) - new Date(b);
    });

    // The dates have to be sorted because Object.keys does not guarantee it
    // maintains the same order as the one received from the API response so
    // most of the time the dates are shuffled.
    sortedDates.forEach(date => {
      chartData.labels.push(format(new Date(date), "dd MMM"));
      chartData.values.push(state.rates[date][state.toCurrency] || 1);
    });

    commit(types.SET_CHART_DATA, chartData);
  },
  async updatePeriodForChart({ commit, dispatch }, period) {
    commit(types.SET_PERIOD_FOR_CHART, period);

    await dispatch("fetchRatesForCurrentPeriod");
  },
  onFavorite({ state, commit, getters }) {
    const currentCurrencyPair = JSON.stringify(getters.getCurrentCurrencyPair);

    // If the current pair of currencies exists in the favorites list, remove it
    if (getters.isPairInFavorites) {
      commit(
        types.SET_FAVORITES,
        state.favorites.filter(entry => entry !== currentCurrencyPair)
      );

      return;
    }

    // If it does not exist, add it
    commit(types.SET_FAVORITES, [...state.favorites, currentCurrencyPair]);
  },
  async setCurrentCurrencies(
    { state, commit, dispatch },
    { fromCurrency, toCurrency }
  ) {
    // Don't do anything if the current currencies are already of the same values.
    if (
      state.fromCurrency === fromCurrency &&
      state.toCurrency === toCurrency
    ) {
      return;
    }

    commit(types.SET_FROM_CURRENCY, fromCurrency);
    commit(types.SET_TO_CURRENCY, toCurrency);
    await dispatch("fetchRatesForCurrentPeriod");
    dispatch("calculateConversionResult");
  }
};
