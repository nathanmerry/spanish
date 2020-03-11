<template>
  <div class="category">
    <div class="container">
      <router-link :to="{ name: 'Categories' }" class="category__link">
        <img src="../assets/back-arrow.png" alt="" class="back" />
      </router-link>
      <h1 class="category__title">Choose your level!</h1>
      <router-link :to="{ name: 'level1' }" class="category__link">
        Level 1
      </router-link>
      <router-link :to="{ name: 'level2' }" class="category__link">
        Level 2
      </router-link>
      <router-link :to="{ name: 'level3' }" class="category__link">
        Level 3
      </router-link>
      <router-link :to="{ name: 'level4' }" class="category__link">
        Level 4
      </router-link>
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: "Category",

  data() {
    return {
      the_subject: this.$route.params.subject,
      phrases: []
    };
  },

  mounted() {
    fetch("https://data.test/index.php/wp-json/markers/v1/post/")
      .then(response => response.json())
      .then(jsonResponse => {
        return jsonResponse.map(item => {
          return {
            category: item.category[0].name,
            title: item.post_title.trim(),
            english: item.acf.name_en.trim(),
            spanish: item.acf.name_es.trim()
          };
        });
      })
      .then(phrasesObject => {
        return (this.phrases = phrasesObject.filter(phrase => {
          return phrase.category == this.the_subject;
        }));
      });
  }
};
</script>

<style lang="scss">
.category {
  position: relative;
  overflow: hidden;
  height: 100%;

  &__title {
    margin: 40px 0;
  }

  &__link {
    margin-right: 40px;
  }
}

.back {
  width: 30px;
  padding-top: 10px;
}
</style>
