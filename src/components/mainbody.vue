<template>
  <div id="mainbody" class="mainbody">
    <div class="container">
      <div class="categories">
        <ul class="categories__list">
          <Category
            v-for="(category, index) in this.categories"
            :key="index"
            :category="category"
          />
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Category from "./category.vue";

export default {
  name: "MainBody",
  components: {
    Category
  },
  data() {
    return {
      activities: [],
      categories: []
    };
  },

  methods: {
    filterDuplicateCategories(activitiesObject) {
      let duplicateCategories = [];
      activitiesObject.map(item => {
        duplicateCategories.push(item.category);
      });
      let uniqueCategories = [...new Set(duplicateCategories)];
      this.categories = uniqueCategories;
    }
  },

  mounted() {
    fetch("https://data.test/index.php/wp-json/markers/v1/post")
      .then(response => response.json())
      .then(jsonResponse => {
        this.activities = jsonResponse.map(item => {
          return {
            english: item.acf.name_en,
            spanish: item.acf.name_es,
            category: item.category[0].name
          };
        });
      })
      .then(() => {
        this.filterDuplicateCategories(this.activities);
      });
  }
};
</script>

<style lang="scss">
.categories {
  margin: 0;
  padding-top: 40px;
  list-style: none;
}
</style>
