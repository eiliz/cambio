<template>
  <div>
    <converter>
      <converter-results
        :data="conversionResult"
        class="mt-8"
      ></converter-results
    ></converter>

    <currency-rates-chart></currency-rates-chart>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
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
    ...mapGetters(["conversionResult"])
  }
};
</script>
