<template>
  <div class="bg-white rounded-lg mx-auto p-6 shadow-sm">
    <LineChart
      v-if="isDataLoaded"
      ref="chart"
      :chart-data="chartData"
      :height="200"
    ></LineChart>

    <div v-else-if="isDataPending" class="flex justify-center">
      <base-spinner></base-spinner>
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

export default {
  components: {
    LineChart
  },
  computed: {
    ...mapGetters([
      "chartData",
      "isChartPeriodOneDay",
      "isChartPeriodOneWeek",
      "isChartPeriodOneMonth",
      "ratesStatus"
    ]),
    isDataPending() {
      return this.ratesStatus === apiStatus.PENDING;
    },
    isDataLoaded() {
      return this.ratesStatus === apiStatus.SUCCESS;
    }
  },
  methods: {
    ...mapActions(["updatePeriodForChart"])
  }
};
</script>
