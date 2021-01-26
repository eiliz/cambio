import Vue from "vue";
import VueRouter from "vue-router";
import Main from "@/layouts/Main";
import Home from "@/views/Home";

Vue.use(VueRouter);

// Because Main and Home are used in the first view of the app I'm not using a
// dynamic import to lazy load them.

// For components used on secondary views, later on, using a dynamic import will
// hint to Webpack create a separate file for it and lazyload it with link
// rel="preload": component: () => import(@/views/SecondaryView)

const routes = [
  {
    path: "",
    component: Main,
    children: [
      {
        path: "/",
        name: "Home",
        component: Home
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
