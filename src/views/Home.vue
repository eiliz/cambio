<template>
  <div class="">
    <converter></converter>
    <converter-result
      v-if="isSuccess"
      :data="conversionResult"
    ></converter-result>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Converter from "@/components/Converter";
import ConverterResult from "@/components/ConverterResult";

export default {
  name: "Home",
  components: { Converter, ConverterResult },
  data() {
    return {
      rates: null
    };
  },
  computed: {
    ...mapGetters(["isSuccess", "conversionResult"])
  },
  created() {
    this.fetchAllSupportedCurrencies();
  },
  methods: {
    ...mapActions(["fetchAllSupportedCurrencies"]),
    async getRate() {
      this.rates = await this.$currencyService.getLatestRatesForCurrency("RON");
    }
  }
};
</script>
