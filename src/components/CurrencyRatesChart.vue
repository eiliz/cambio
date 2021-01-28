<template>
  <div class="bg-white rounded-lg mx-auto p-6 shadow-sm">
    <LineChart
      v-if="isChartDataLoaded"
      :chart-data="chartDataWithSettings"
      :height="200"
    ></LineChart>

    <div v-if="isChartPending" class="flex justify-center">
      <base-spinner></base-spinner>
    </div>

    <div v-if="isChartFailed" class="flex justify-center">
      There was a problem with your request
    </div>

    <div class="mt-8">
      <span
        @click="updatePeriodForChart('day')"
        :class="{ 'bg-green-200': isChartPeriodOneDay }"
        class="mr-3 bg-gray-200 px-2 py-1 text-xs cursor-pointer hover:bg-green-200 rounded transition duration-500"
        >1 day</span
      ><span
        @click="updatePeriodForChart('week')"
        :class="{ 'bg-green-200': isChartPeriodOneWeek }"
        class="mr-3 bg-gray-200 px-2 py-1 text-xs cursor-pointer hover:bg-green-200 rounded transition duration-500"
        >1 week</span
      ><span
        @click="updatePeriodForChart('month')"
        :class="{ 'bg-green-200': isChartPeriodOneMonth }"
        class="bg-gray-200 px-2 py-1 text-xs cursor-pointer hover:bg-green-200 rounded transition duration-500"
        >1 month</span
      >
    </div>
  </div>
</template>

<script>
import apiStatus from "@/api/constants/apiStatus";
import { mapGetters, mapActions } from "vuex";
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
      chartDataWithSettings: null
    };
  },
  computed: {
    ...mapGetters([
      "chartData",
      "chartStatus",
      "isChartPeriodOneDay",
      "isChartPeriodOneWeek",
      "isChartPeriodOneMonth"
    ]),
    isChartDataLoaded() {
      return this.chartStatus === apiStatus.SUCCESS;
    },
    isChartPending() {
      return this.chartStatus === apiStatus.PENDING;
    },
    isChartFailed() {
      return this.chartStatus === apiStatus.ERROR;
    }
  },
  watch: {
    // Due to limitations with the chart package I have to use this watcher and
    // prepare the payload for the chart in this component.
    // The problem is that the chart packages watches for changes on a chartData
    // prop but it doesn't watch for deep changes so if I move the
    // chartDataWithSettings state in the LineChart component instead, it
    // doesn't pick up the changes from the store.
    chartData: {
      immediate: true,
      handler: "refreshChartData"
    }
  },
  methods: {
    ...mapActions(["updatePeriodForChart"]),
    refreshChartData() {
      this.chartDataWithSettings = {
        labels: this.chartData.labels,
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
            data: this.chartData.values
          }
        ]
      };
    }
  }
};
</script>
