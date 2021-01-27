import axios from "axios";
import { throttleAdapterEnhancer } from "axios-extensions";

const throttleConfig = {
  threshold: process.env.VUE_APP_API_REFRESH_RATE * 1000
};

export default axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  adapter: throttleAdapterEnhancer(axios.defaults.adapter, throttleConfig),
  timeout: 3000,
  headers: {
    "Content-Type": "application/json"
  }
});
