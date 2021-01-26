<template>
  <!-- Pass on props and listeners -->
  <v-select
    v-bind="$attrs"
    v-on="$listeners"
    :clearSearchOnSelect="clearOnSelect"
    :searchable="searchable"
  >
    <!-- Pass on all named slots -->
    <slot v-for="slot in Object.keys($slots)" :name="slot" :slot="slot" />
    <!-- Pass on all scoped slots -->
    <template v-for="(_, slot) of $scopedSlots" v-slot:[slot]="scope">
      <slot :name="slot" v-bind="scope" />
    </template>
  </v-select>
</template>
<script>
import vSelect from "vue-select";

export default {
  inheritAttrs: false,
  props: {
    clearOnSelect: {
      type: Boolean,
      default: false
    },
    searchable: {
      type: Boolean,
      default: false
    }
  },
  components: {
    vSelect
  }
};
</script>

<style src="@/assets/css/vue-select.scss" lang="scss"></style>
