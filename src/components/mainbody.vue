<template>
  <div id="mainbody" class="mainbody">
    <div class="container">
      <ul class="categories">
        <li
          class="categories__item"
          v-for="(category, index) in this.categories"
          :key="index"
        >
          {{ category }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "MainBody",
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
  display: flex;
  justify-content: center;
  margin: 0;
  padding: 0;
  list-style: none;

  &__item {
    padding: 0 20px;
    text-transform: capitalize;
  }
}
</style>
