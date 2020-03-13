<template>
  <div class="level">
    <InputGame v-bind:language="language" questionType="audio" />
  </div>
</template>

<script>
import InputGame from "../games/inputGame.vue";

export default {
  name: "Level6",
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
