<template>
  <div class="bg-white rounded-lg mx-auto px-3 md:px-6 py-6 mb-6 shadow-sm">
    <div class="flex justify-end items-center mb-8">
      <h4 class="mr-auto">Convert currency</h4>
      <a @click="onFavorite" class="flex text-sm items-center cursor-pointer">
        <Star
          :class="[isPairInFavorites ? 'fill-current' : '']"
          class="md:mr-1"
        />
        <span class="hidden md:block">{{
          isPairInFavorites ? "Remove" : "Save"
        }}</span>
      </a>
      <calendar
        v-model="conversionDate"
        @change="makeConversion"
        :disabled-date="disableDatesFromTomorrow"
        class="ml-4 md:ml-8"
      ></calendar>
    </div>

    <div class="lg:flex lg:items-center">
      <div class="flex justify-center">
        <base-input
          v-model="fromAmount"
          @keyup="makeConversionDebounced"
          label="From currency"
          :hide-label="true"
          placeholder="Type value"
          type="number"
          id="fromAmount"
          class="mr-2"
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

      <div
        class="transform rotate-90 w-5 h-5 mx-auto my-2 lg:rotate-0 lg:w-7 lg:h-7 lg:mx-8 lg:my-0"
      >
        <switch-horizontal class="text-gray-500"></switch-horizontal>
      </div>

      <div class="flex justify-center">
        <!-- When the user types in the second input, I don't make another call
            to the API to get the rates again, instead I use the stored rate from the first call and do a reverse conversion. -->
        <base-input
          v-model="toAmount"
          @keyup="reverseConversion"
          label="To currency"
          :hide-label="true"
          placeholder="Type value"
          type="number"
          id="fromAmount"
          class="mr-2"
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
    <slot></slot>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import * as types from "@/store/types";
import debounce from "lodash.debounce";
import Select from "@/components/common/Select";
import Calendar from "@/components/common/Calendar";
import Star from "@/assets/svg/star.svg";
import SwitchHorizontal from "@/assets/svg/switch-horizontal.svg";

export default {
  components: {
    Select,
    Calendar,
    Star,
    SwitchHorizontal
  },
  data() {
    return {
      date: null
    };
  },
  computed: {
    ...mapGetters(["currencies", "isPairInFavorites"]),
    fromCurrency: {
      get() {
        return this.$store.state.fromCurrency;
      },
      set(currency) {
        this.$store.commit("SET_FROM_CURRENCY", currency);
      }
    },
    toCurrency: {
      get() {
        return this.$store.state.toCurrency;
      },
      set(currency) {
        this.$store.commit("SET_TO_CURRENCY", currency);
      }
    },
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
    ...mapActions(["convertCurrency", "onFavorite"]),
    ...mapMutations({
      reverseConversion: types.SET_REVERSE_CONVERSION
    }),
    makeConversionDebounced: debounce(function(event) {
      const regex = /[0-9.,]/g;

      if (!regex.test(event.key)) {
        return;
      }

      this.makeConversion();
    }, 250),
    makeConversion() {
      this.convertCurrency();
    },
    disableDatesFromTomorrow(date) {
      return date > new Date();
    }
  }
};
</script>
