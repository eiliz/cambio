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
      console.log(err);
    }
  },
  async convertCurrency({ state, commit, dispatch }) {
    try {
      const response = await currencyApi.getRates({
        base: state.fromCurrency,
        date: state.date
      });

      const { rates } = response.data;
      const rateForToCurrency = rates[state.toCurrency];

      const toAmount = (
        rateForToCurrency * parseFloat(state.fromAmount)
      ).toFixed(2);

      commit(types.SET_CONVERSION, {
        toAmount,
        rate: rateForToCurrency
      });

      dispatch("fetchDataForChart");
    } catch (error) {
      console.log(error);
    }
  },
  async fetchDataForChart({ state, commit }) {
    try {
      commit(types.SET_CHART_STATUS, apiStatus.PENDING);

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

      const {
        data: { rates }
      } = await currencyApi.getRatesForPeriod({
        base: state.fromCurrency,
        startAt,
        endAt
      });

      const chartData = {
        labels: [],
        values: []
      };

      const sortedDates = Object.keys(rates).sort(function(a, b) {
        return new Date(a) - new Date(b);
      });

      // The dates have to be sorted because Object.keys does not guarantee it
      // maintains the same order as the one received from the API response so
      // most of the time the dates are shuffled.
      sortedDates.forEach(date => {
        chartData.labels.push(format(new Date(date), "dd MMM"));
        chartData.values.push(rates[date][state.toCurrency]);
      });

      commit(types.SET_CHART_DATA, chartData);
      commit(types.SET_CHART_STATUS, apiStatus.SUCCESS);
    } catch (error) {
      commit(types.SET_CHART_DATA, null);
      commit(types.SET_CHART_STATUS, apiStatus.ERROR);
      console.log(error);
    }
  },
  updatePeriodForChart({ commit, dispatch }, period) {
    commit(types.SET_PERIOD_FOR_CHART, period);

    dispatch("fetchDataForChart");
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
  setCurrentCurrencies({ commit, dispatch }, { fromCurrency, toCurrency }) {
    commit(types.SET_FROM_CURRENCY, fromCurrency);
    commit(types.SET_TO_CURRENCY, toCurrency);
    dispatch("convertCurrency");
  }
};
