<template>
  <div>
    <converter>
      <converter-results
        v-if="isSuccess"
        :data="conversionResult"
      ></converter-results
    ></converter>

    <currency-rates-chart></currency-rates-chart>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Converter from "@/components/Converter";
import ConverterResults from "@/components/ConverterResults";
import CurrencyRatesChart from "@/components/CurrencyRatesChart";

export default {
  name: "Home",
  components: { Converter, ConverterResults, CurrencyRatesChart },
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
    ...mapActions(["fetchAllSupportedCurrencies"])
  }
};
</script>
