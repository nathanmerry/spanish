import Vue from "vue";
import Router from "vue-router";
import Categories from "./components/categories.vue";
import Category from "./components/category.vue";

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
      component: Category,
    }
  ]
});
