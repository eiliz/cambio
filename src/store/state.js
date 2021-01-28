import apiStatus from "@/api/constants/apiStatus";
import { format } from "date-fns";

const favorites = localStorage.getItem("cambioFavorites");

export default {
  // This is the list of all the currencies the API used supports
  currencies: [],
  fromCurrency: "EUR",
  toCurrency: "USD",
  fromAmount: 1,
  toAmount: 1,
  rates: {},
  date: format(new Date(), "yyyy-MM-dd"),
  dateForConversion: format(new Date(), "yyyy-MM-dd"),
  periodForChart: "week",
  chart: {
    status: apiStatus.INITIAL,
    data: { labels: [], values: [] }
  },
  favorites: favorites ? JSON.parse(favorites) : []
};
