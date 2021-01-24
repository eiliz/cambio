<template>
  <div class="sidebar bg-white rounded-lg shadow-sm px-6 py-6">
    <div class="mb-8">
      <h2 class="flex text-xl text-green-500">
        <Star /><span class="ml-2">Favorites</span>
      </h2>
      <ul>
        <li>EUR - USD</li>
        <li>EUR - USD</li>
        <li>EUR - USD</li>
        <li>EUR - USD</li>
        <li>EUR - USD</li>
      </ul>
    </div>

    <div>
      <h2 class="flex text-xl text-green-500">
        <Clock /><span class="ml-2">History</span>
      </h2>
      <ul>
        <li>EUR - USD</li>
        <li>EUR - USD</li>
        <li>EUR - USD</li>
        <li>EUR - USD</li>
        <li>EUR - USD</li>
      </ul>
    </div>
  </div>
</template>

<script>
import Clock from "@/assets/svg/clock.svg";
import Star from "@/assets/svg/star.svg";

export default {
  components: {
    Clock,
    Star
  }
};
</script>
