import httpClient from "./httpClient";

const endpoints = {
  latest: "latest",
  forPeriod: "history"
};

const getAllRatesForBaseCurrency = () => httpClient.get(endpoints.latest);

const getRateForSymbols = ({ base, date }) =>
  httpClient.get(date, {
    params: {
      base
    }
  });

export default {
  getAllRatesForBaseCurrency,
  getRateForSymbols
};
