<template>
  <ping-pong :size="size"></ping-pong>
</template>

<script>
import { PingPong } from "vue-loading-spinner";

export default {
  props: {
    size: {
      type: String,
      default: "80px"
    }
  },
  components: {
    PingPong
  }
};
</script>
