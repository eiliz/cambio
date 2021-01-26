<template>
  <div>
    <label v-if="label" :for="id" class="text-gray-500 text-xs">{{
      label
    }}</label>

    <input
      :type="type"
      :value="value"
      @input="updateInput"
      v-bind="$attrs"
      v-on="$listeners"
      class="border-2 border-gray-200 rounded px-4 font-bold h-10 mb-2 mr-2 w-36"
    />
  </div>
</template>

<script>
export default {
  name: "BaseInput",
  inheritAttrs: false,
  model: {
    prop: "value",
    event: "update"
  },
  props: {
    id: {
      type: String,
      default: ""
    },
    label: {
      type: String,
      default: ""
    },
    value: {
      type: [String, Number],
      default: ""
    },
    type: {
      type: String,
      default: "text"
    }
  },
  methods: {
    updateInput(event) {
      this.$emit("update", event.target.value);
    }
  }
};
</script>
