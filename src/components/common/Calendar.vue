<template>
  <!-- Pass on props and listeners -->
  <date-picker
    v-bind="$attrs"
    v-on="$listeners"
    valueType="format"
    :disabled-date="disabledDate"
    :clearable="clearable"
  ></date-picker>
</template>

<script>
import DatePicker from "vue2-datepicker";

export default {
  inheritAttrs: false,
  props: {
    clearable: {
      type: Boolean,
      default: false
    },
    disabledDate: {
      type: Function,
      default: () => {}
    }
  },
  components: {
    DatePicker
  }
};
</script>

<style>
@import "~vue2-datepicker/index.css";

.mx-datepicker {
  @apply w-32;
  @apply block;
}
</style>
