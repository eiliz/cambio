<template>
  <div>
    <div>
      {{ data.fromAmount }} {{ data.fromCurrency }} = {{ data.toAmount }}
      {{ data.toCurrency }}
    </div>

    <div>
      1 {{ data.fromCurrency }} = {{ data.rate }}
      {{ data.toCurrency }}
    </div>
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
