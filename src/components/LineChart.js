import { Line, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;

import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "@/../tailwind.config.js";
const {
  theme: { colors }
} = resolveConfig(tailwindConfig);

const defaultOptions = {
  legend: {
    display: false
  },
  tooltips: {
    bodyFontSize: 14,
    bodyFontStyle: "bold",
    titleFontSize: 14
  },
  scales: {
    yAxes: [
      {
        ticks: {
          fontColor: colors.gray[500]
        }
      }
    ],
    xAxes: [
      {
        ticks: {
          fontColor: colors.gray[500]
        }
      }
    ]
  }
};

export default {
  extends: Line,
  mixins: [reactiveProp],
  props: {
    chartData: {
      type: Object,
      required: null
    },
    options: {
      type: Object,
      default: () => defaultOptions
    }
  },
  mounted() {
    this.renderChart(this.chartData, this.options);
  }
};
