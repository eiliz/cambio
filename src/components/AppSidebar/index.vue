<template>
  <div class="sidebar bg-white h-screen shadow-md px-6 py-8">
    <header class="border-b border-gray-200 pb-4 mb-8 flex items-center">
      <figure><img class="w-20 h-auto mr-4" src="/img/logo.svg" /></figure>
      <h1 class="flex flex-col text-gray-500 mb-0">
        <span class="text-lg uppercase font-bold">Cambio</span
        ><span class="text-xs">Currency converter</span>
      </h1>
    </header>
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
