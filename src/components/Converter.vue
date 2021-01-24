<template>
  <div class="exchanger bg-white rounded-lg mx-auto p-6 my-6 shadow-sm">
    <date-picker
      v-model="conversionDate"
      @change="makeConversion"
      :clearable="false"
      valueType="format"
    ></date-picker>
    <div class="exchanger__currency mb-6">
      <label class="exchanger__label">From</label>
      <div class="flex">
        <input
          type="text"
          v-model="fromAmount"
          @keyup="makeConversion"
          class="border-2 border-gray-200 rounded px-4 font-bold h-10 mb-2 mr-2 w-36"
        />
        <v-select
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
        </v-select>
      </div>
    </div>

    <div class="exchanger__currency">
      <label class="form-label">To</label>
      <div class="flex">
        <input
          type="text"
          v-model="toAmount"
          @keyup="reverseConversion"
          class="border-2 border-gray-200 rounded px-4 font-bold h-10 mb-2 mr-2 w-36"
        />
        <v-select
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
        </v-select>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";

export default {
  components: {
    DatePicker
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
    makeConversion() {
      this.convertCurrency({
        fromCurrency: this.fromCurrency,
        toCurrency: this.toCurrency
      });
    }
  }
};
</script>