import Vue from "vue";
import Router from "vue-router";
import Categories from "./pages/categories.vue";
import Category from "./pages/category.vue";
import inputGame from "./games/inputGame.vue";
import Level1 from "./pages/level1.vue";
import Level2 from "./pages/level2.vue";
import Level3 from "./pages/level3.vue";
import Level4 from "./pages/level4.vue";
import Level5 from "./pages/level5.vue";
import Level6 from "./pages/level6.vue";

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
      path: "/category/:subject/level-1",
      name: "level1",
      component: Level1
    },
    {
      path: "/category/:subject/level-2",
      name: "level2",
      component: Level2
    },
    {
      path: "/category/:subject/level-3",
      name: "level3",
      component: Level3
    },
    {
      path: "/category/:subject/level-4",
      name: "level4",
      component: Level4
    },
    {
      path: "/category/:subject/level-5",
      name: "level5",
      component: Level5
    },
    {
      path: "/category/:subject/level-6",
      name: "level6",
      component: Level6
    }
  ]
});
