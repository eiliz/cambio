<template>
  <div>
    <app-header></app-header>
    <div class="lg:container grid grid-cols-4 mx-auto py-8 px-3 md:px-6 gap-6">
      <router-view class="col-span-4 md:col-span-3" />

      <app-sidebar class="col-span-4 md:col-span-1"></app-sidebar>
    </div>
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
