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

        <div class="read-me">
          <h2 class="read-me__header" v-on:click="openReadMe">#Read Me</h2>
          <div v-if="readeMeOpen" class="read-me__body">
            <h3>Bugs</h3>
            <p>
              There is currently a bug where by when you click begin, the begin
              button dissapears but the game doesn't actually appear. Although
              most of the time it doesn't happen it is annoying so I am working
              on fixing it - for now when this happens just keep refreshing your
              page until it starts working again.
            </p>
            <h3>Things to note</h3>
            <p>
              Although the game where you have to type your answer works, you
              must make sure your answer is 100% correct as there is no room for
              error - this includes extra spaces, capital leters, anything. If
              it doesn't match 100% it will mark as incorrect - this is being
              worked on
            </p>
          </div>
        </div>
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
      categories: [],
      readeMeOpen: false
    };
  },

  methods: {
    openReadMe() {
      if (this.readeMeOpen === false) {
        this.readeMeOpen = true;
      } else {
        this.readeMeOpen = false;
      }
    }
  },

  mounted() {
    fetch("https://nathanmerry.co.uk/tanguagedata/wp-json/wp/v2/categories")
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
    font-size: 1.2rem;
    color: #1a5982;
    font-weight: 700;
    text-decoration: none;
    text-align: center;
  }
}

.read-me {
  max-width: 350px;
  font-size: 0.7em;
  border: 1px solid #1abc9c;
  border-radius: 5px;
  background: #80808014;

  &__header {
    padding: 10px;
    cursor: pointer;
  }

  &__body {
    padding: 10px;
  }
}
</style>
