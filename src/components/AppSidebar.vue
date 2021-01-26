<template>
  <div class="sidebar bg-white rounded-lg shadow-sm px-6 py-6">
    <div class="mb-8">
      <h2 class="flex text-xl text-green-500">
        <Star /><span class="ml-2">Favorites</span>
      </h2>
      <!-- <ul v-if="hasFavorites">
        <li v-for="(fav, i) in getFavorites" :key="i">{{ favorite.label }}</li>
      </ul>
      <p v-else>
        You don't have any favorites yet. Click the star icon to add one.
      </p> -->
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Star from "@/assets/svg/star.svg";

export default {
  components: {
    Star
  },
  computed: {
    ...mapGetters(["getFavorites", "hasFavorites"])
  }
};
</script>
