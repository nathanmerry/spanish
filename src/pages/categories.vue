<template>
  <div id="mainbody" class="categories">
    <div class="container">
      <div class="categories__wrapper">
        <h1 class="categories__header">Choose your category!</h1>
        <ul class="categories__list">
          <router-link
            :to="{ name: 'category', params: { subject: category } }"
            v-for="(category, index) in this.categories"
            :key="index"
            class="categories__item"
          >
            <div v-if="category">{{ category }}</div>
          </router-link>
        </ul>
        <h2>Authors note</h2>
        <p>much more development for this site is planned</p>
      </div>
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

  mounted() {
    fetch("https://data.test/wp-json/wp/v2/categories")
      .then(response => response.json())
      .then(jsonResponse => {
        this.categories = jsonResponse
          .filter(category => {
            return category.name !== "Uncategorized";
          })
          .map(category => {
            return category.name;
          });
      });
  }

  // create another endpoint which returns the translations speicifc to that subject
};
</script>

<style lang="scss">
.categories {
  &__wrapper {
    margin: 0;
    padding-top: 40px;
  }

  &__header {
    padding-bottom: 40px;
    text-align: center;
  }

  &__list {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  &__item {
    width: 33.33%;
    padding-bottom: 40px;
    text-transform: capitalize;
    font-size: 20px;
    color: #1a5982;
    font-weight: 700;
    text-decoration: none;
    text-align: center;
  }
}
</style>
