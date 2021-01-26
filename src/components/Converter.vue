<template>
  <div class="bg-white rounded-lg mx-auto p-6 mb-6 shadow-sm">
    <calendar
      v-model="conversionDate"
      @change="makeConversionDebounced"
      :disabled-date="disableDatesFromTomorrow"
      class="block ml-auto w-32"
    ></calendar>

    <div class="flex flex-wrap justify-between">
      <div class="exchanger__currency mr-6">
        <label class="text-gray-500 text-xs">From</label>
        <div class="flex">
          <base-input
            v-model="fromAmount"
            @keyup="makeConversionDebounced"
            id="fromAmount"
          />

          <Select
            :options="currencies"
            v-model="fromCurrency"
            @input="makeConversionDebounced"
            :searchable="false"
            class="adyen"
          >
            <template v-slot:option="currency">
              <img
                :src="
                  require(`@/assets/flags/${currency.label.toLowerCase()}.png`)
                "
                width="20"
                height="auto"
                class="adyen__flag"
              />
              {{ currency.label }}
            </template>
          </Select>
        </div>
      </div>

      <div class="exchanger__currency">
        <label class="text-gray-500 text-xs">To</label>
        <div class="flex">
          <base-input
            v-model="toAmount"
            @keyup="reverseConversion"
            id="fromAmount"
          />

          <Select
            :options="currencies"
            v-model="toCurrency"
            @input="makeConversionDebounced"
            :searchable="false"
            class="adyen"
          >
            <template v-slot:option="currency">
              <img
                :src="
                  require(`@/assets/flags/${currency.label.toLowerCase()}.png`)
                "
                width="20"
                height="auto"
                class="adyen__flag"
              />
              {{ currency.label }}
            </template>
          </Select>
        </div>
      </div>
    </div>

    <slot></slot>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import debounce from "lodash.debounce";
import Select from "@/components/common/Select";
import Calendar from "@/components/common/Calendar";

export default {
  components: {
    Select,
    Calendar
  },
  data() {
    return {
      date: null,
      fromCurrency: "EUR",
      toCurrency: "USD"
    };
  },
  computed: {
    ...mapGetters(["currencies"]),
    fromAmount: {
      get() {
        return this.$store.state.fromAmount;
      },
      set(amount) {
        this.$store.commit("SET_FROM_AMOUNT", amount);
      }
    },
    toAmount: {
      get() {
        return this.$store.state.toAmount;
      },
      set(amount) {
        this.$store.commit("SET_TO_AMOUNT", amount);
      }
    },
    conversionDate: {
      get() {
        return this.$store.state.date;
      },
      set(date) {
        this.$store.commit("SET_DATE", date);
      }
    }
  },
  mounted() {
    this.makeConversion();
  },
  methods: {
    ...mapActions(["convertCurrency", "reverseConversion"]),
    makeConversionDebounced: debounce(function() {
      this.makeConversion();
    }, 100),
    makeConversion() {
      this.convertCurrency({
        fromCurrency: this.fromCurrency,
        toCurrency: this.toCurrency
      });
    },
    disableDatesFromTomorrow(date) {
      return date > new Date();
    }
  }
};
</script>
