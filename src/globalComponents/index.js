import Vue from "vue";

// Date Picker
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";

// Vue Select
import vSelect from "vue-select";
import "@/assets/css/vue-select.scss";

Vue.component("v-select", vSelect);
Vue.component("date-picker", DatePicker);
