import statuses from "./statuses";
import { format } from "date-fns";

export default {
  status: statuses.initial,
  // This is the list of all the currencies the API used supports
  currencies: [],
  fromCurrency: null,
  toCurrency: null,
  fromAmount: 1,
  toAmount: 1,
  rate: 1,
  date: format(new Date(), "yyyy-MM-dd"),
  chartData: {}
};
