<template>
  <div class="sidebar">
    <div class="bg-white rounded-lg shadow-sm px-6 py-6 mb-8">
      <h2 class="flex items-center text-xl text-green-500">
        <Star /><span class="ml-2">Favorites</span>
      </h2>

      <ul v-if="getFavorites.length">
        <li v-for="(fav, i) in getFavorites" :key="i">
          <a
            @click="onUseFavorite(fav)"
            class="text-bold text-sm cursor-pointer text-gray-700"
            >{{ fav.fromCurrency }} - {{ fav.toCurrency }}</a
          >
        </li>
      </ul>
      <p v-else>
        You don't have any favorites yet. Click the star icon to add one.
      </p>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Star from "@/assets/svg/star.svg";

export default {
  components: {
    Star
  },
  computed: {
    ...mapGetters(["getFavorites"])
  },
  methods: {
    ...mapActions(["setCurrentCurrencies"]),
    onUseFavorite(currencies) {
      this.setCurrentCurrencies(currencies);
    }
  }
};
</script>
