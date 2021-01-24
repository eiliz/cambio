<template>
  <div id="app">
    <transition name="fade" appear>
      <div>
        <app-header></app-header>
        <div class="lg:container flex mx-auto py-8">
          <router-view class="w-full md:w-3/4 px-6" />

          <app-sidebar class="hidden lg:block md:w-1/4"></app-sidebar>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import AppHeader from "@/components/AppHeader";
import AppSidebar from "@/components/AppSidebar";

export default {
  components: {
    AppHeader,
    AppSidebar
  }
};
</script>
