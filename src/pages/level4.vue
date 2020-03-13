<template>
  <div class="level">
    <InputGame v-bind:language="language" questionType="text" />
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
      question: "english",
      answer: "spanish"
    };
  }
};
</script>

<style lang="scss">
.level {
  height: 100%;
}
</style>
