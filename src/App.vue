<template>
  <div id="app">
    <transition name="fade" appear>
      <div class="container flex">
        <app-sidebar class="md:w-1/4"></app-sidebar>
        <div class="md:w-3/4 px-6">
          <router-view />
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import AppSidebar from "@/components/AppSidebar";

export default {
  components: {
    AppSidebar
  }
};
</script>
