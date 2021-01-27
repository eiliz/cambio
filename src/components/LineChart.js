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
  computed: {
    chartDataWithSettings() {
      return {
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
  },
  mounted() {
    this.renderChart(this.chartDataWithSettings, this.options);
  }
};
