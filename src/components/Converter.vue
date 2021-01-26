<template>
  <div class="bg-white rounded-lg mx-auto px-3 md:px-6 py-6 mb-6 shadow-sm">
    <calendar
      v-model="conversionDate"
      @change="makeConversion"
      :disabled-date="disableDatesFromTomorrow"
      class="ml-auto"
    ></calendar>

    <div class="flex flex-wrap justify-between">
      <div>
        <label class="text-gray-500 text-xs">From</label>
        <div class="flex">
          <base-input
            v-model="fromAmount"
            @keyup="makeConversionDebounced"
            type="number"
            id="fromAmount"
          />

          <Select
            :options="currencies"
            v-model="fromCurrency"
            @input="makeConversion"
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

      <div>
        <label class="text-gray-500 text-xs">To</label>
        <div class="flex">
          <base-input
            v-model="toAmount"
            @keyup="reverseConversion"
            type="number"
            id="fromAmount"
          />

          <Select
            :options="currencies"
            v-model="toCurrency"
            @input="makeConversion"
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

    <div><Star @click="onMakeFavorite" /></div>

    <slot></slot>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import debounce from "lodash.debounce";
import Select from "@/components/common/Select";
import Calendar from "@/components/common/Calendar";
import Star from "@/assets/svg/star.svg";

export default {
  components: {
    Select,
    Calendar,
    Star
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
        if (isNaN(parseFloat(amount))) {
          return;
        }
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
    ...mapActions(["convertCurrency", "reverseConversion", "makeFavorite"]),
    makeConversionDebounced: debounce(function(event) {
      const regex = /[0-9.,]/g;

      if (!regex.test(event.key)) {
        return;
      }

      this.makeConversion(event);
    }, 250),
    makeConversion() {
      this.convertCurrency({
        fromCurrency: this.fromCurrency,
        toCurrency: this.toCurrency
      });
    },
    disableDatesFromTomorrow(date) {
      return date > new Date();
    },
    onMakeFavorite() {
      this.makeFavorite({
        fromCurrency: this.fromCurrency,
        toCurrency: this.toCurrency
      });
    }
  }
};
</script>
