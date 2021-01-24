<template>
  <div class="bg-white rounded-lg mx-auto p-6 my-6 shadow-sm">
    <LineChart
      ref="chart"
      v-if="loaded"
      :chart-data="datacollection"
      :height="200"
    ></LineChart>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import LineChart from "@/components/LineChart";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "@/../tailwind.config.js";
const {
  theme: { colors }
} = resolveConfig(tailwindConfig);

export default {
  components: {
    LineChart
  },
  data() {
    return {
      datacollection: null,
      data: [],
      loaded: false
    };
  },
  computed: {
    ...mapGetters(["chartData"])
  },
  mounted() {
    this.updateChart();
  },
  watch: {
    chartData(result) {
      this.data = result;
      this.loaded = true;
      this.updateChart();
    }
  },
  methods: {
    updateChart() {
      this.datacollection = {
        labels: this.data.map(item => item.date),
        datasets: [
          {
            label: "Value: ",
            backgroundColor: "rgba(16, 185, 129, 0.14)",
            borderColor: colors.green[500],
            pointBackgroundColor: colors.green[500],
            borderWidth: 3,
            pointRadius: 5,
            pointHoverRadius: 8,
            lineTension: 0.4,
            pointHoverBackgroundColor: colors.green[300],
            pointBorderColor: colors.green[400],
            data: this.data.map(item => item.value)
          }
        ]
      };
    }
  }
};
</script>
