<template>
  <div class="text-green-700 text-sm">
    1 {{ data.fromCurrency }} = {{ data.rate }} {{ data.toCurrency }}
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  }
};
</script>
