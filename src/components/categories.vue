<template>
  <div id="mainbody" class="mainbody">
    <div class="container">
      <div class="categories">
        <ul class="categories__list">
          <router-link
            :to="{ name: 'category', params: { subject: category } }"
            v-for="(category, index) in this.categories"
            :key="index"
            class="categories__item"
            >{{ category }}</router-link
          >
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MainBody",
  components: {
    // Category
  },
  data() {
    return {
      activities: [],
      categories: [],

      test2: {
        hello: "hello",
        goodbye: "goodbye"
      },
      test: "hello"
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
    fetch("https://data.test/index.php/wp-json/markers/v1/post/")
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

  // create another endpoint which returns the translations speicifc to that subject

};
</script>

<style lang="scss">
.categories {
  margin: 0;
  padding-top: 40px;
  list-style: none;

  &__list {
    display: flex;
    justify-content: space-around;

    margin: 0;
    padding: 0;
    list-style: none;
  }

  &__item {
    text-transform: capitalize;
    font-size: 20px;
    color: #1a5982;
    font-weight: 700;
    text-decoration: none;
  }
}
</style>
