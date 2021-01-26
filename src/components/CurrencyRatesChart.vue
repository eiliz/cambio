<template>
  <div class="bg-white rounded-lg mx-auto p-6 shadow-sm">
    <LineChart
      v-if="chartDataCompleted"
      ref="chart"
      :chart-data="datacollection"
      :height="200"
    ></LineChart>

    <div v-if="chartDataLoading">Loading</div>
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
      data: []
    };
  },
  computed: {
    ...mapGetters([
      "chartData",
      "chartDataLoading",
      "chartDataCompleted",
      "chartDataFailed"
    ])
  },
  mounted() {
    this.updateChart();
  },
  watch: {
    chartData(payload) {
      this.data = payload;
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
