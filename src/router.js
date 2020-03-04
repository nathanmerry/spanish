import Vue from "vue";
import Router from "vue-router";
import Categories from "./components/categories.vue";
import Category from "./components/category.vue";
import inputGame from "./games/inputGame.vue";
import mulitpleChoice from "./games/mulitpleChoice.vue";

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
      path: "/category/:subject/inputgame",
      name: "inputgame",
      component: inputGame
    },
    {
      path: "/category/:subject/mulitplechoice",
      name: "mulitplechoice",
      component: mulitpleChoice
    }
  ]
});
