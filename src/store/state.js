import apiStatus from "@/api/constants/apiStatus";
import { format } from "date-fns";

export default {
  // This is the list of all the currencies the API used supports
  currencies: [],
  fromCurrency: null,
  toCurrency: null,
  fromAmount: 1,
  toAmount: 1,
  rate: 1,
  date: format(new Date(), "yyyy-MM-dd"),
  chart: {
    status: apiStatus.INITIAL,
    data: null
  },
  favorites: new Set()
};
