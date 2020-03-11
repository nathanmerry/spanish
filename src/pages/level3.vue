<template>
  <div class="level">
    <InputGame v-bind:language="language" />
  </div>
</template>

<script>
import InputGame from "../games/inputGame.vue";

export default {
  name: "Level1",
  components: {
    InputGame
  },

  created() {
    this.language = {
      question: "spanish",
      answer: "english"
    };
  }
};
</script>

<style lang="scss">
.level {
  height: 100%;
}
</style>
