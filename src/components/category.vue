<template>
  <div class="category">
    <div class="container">
      <h1 class="category__title">Choose your game!</h1>
      <router-link
        :to="{ name: 'inputgame', params: { subject: the_subject } }"
      >
        Input Game
      </router-link>
      <router-link
        :to="{ name: 'mulitplechoice', params: { subject: the_subject } }"
        class="category__link"
        :phrases="phrases"
      >
        Typing Game
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
  // display: flex;
  // flex-direction: column;
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
</style>
