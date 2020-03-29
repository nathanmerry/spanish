import Vue from "vue";
import Router from "vue-router";
import Categories from "./pages/categories.vue";
import Category from "./pages/category.vue";
import allLevels from "./pages/allLevels.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Categories",
      component: Categories
    },
    {
      path: "/category/:subject",
      name: "category",
      component: Category
    },
    {
      path: "/category/:subject/:level",
      name: "allLevels",
      component: allLevels
    }
  ]
});
