import httpClient from "./httpClient";

const endpoints = {
  latest: "latest",
  forPeriod: "history"
};

const getAllRatesForBaseCurrency = () => httpClient.get(endpoints.latest);

const getRates = ({ base, date }) =>
  httpClient.get(date, {
    params: {
      base
    }
  });

const getRatesForPeriod = ({ base, startAt, endAt }) =>
  httpClient.get(endpoints.forPeriod, {
    params: {
      base,
      start_at: startAt,
      end_at: endAt
    }
  });

export default {
  getAllRatesForBaseCurrency,
  getRates,
  getRatesForPeriod
};
