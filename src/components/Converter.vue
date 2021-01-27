<template>
  <div class="bg-white rounded-lg mx-auto px-3 md:px-6 py-6 mb-6 shadow-sm">
    <div class="flex justify-end mb-6">
      <h4 class="mr-auto">Convert currency</h4>
      <a @click="onFavorite" class="flex text-xs items-center cursor-pointer">
        <Star
          :class="[
            isPairInFavorites ? 'text-yellow-500 fill-current' : 'text-gray-500'
          ]"
          class="pr-1 stroke-current cursor-pointer"
        />
        {{ isPairInFavorites ? "Remove favorite" : "Add to favorites" }}
      </a>
      <calendar
        v-model="conversionDate"
        @change="makeConversion"
        :disabled-date="disableDatesFromTomorrow"
        class="ml-8"
      ></calendar>
    </div>

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
    ...mapActions(["convertCurrency", "reverseConversion", "onFavorite"]),
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
