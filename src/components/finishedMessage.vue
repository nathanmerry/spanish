<template>
  <section v-if="!phrases" class="finishedMessage">
    <div class="container">
      <div class="finishedMessage__text">Finished!</div>
      <div class="finishedMessage__text">
        You scored {{ correctAnswers }} / {{ gameLength }} correct -
        {{ encouragement }}
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "finishedMessage",

  props: {
    correctAnswers: Number,
    gameLength: Number,
    phrases: Array
  },

  computed: {
    encouragement() {
      if (this.correctAnswers / this.gameLength > 0.6) {
        this.correctAnswers / this.gameLength;
        return "Well Done";
      } else {
        this.correctAnswers / this.gameLength;
        return "Better luck next time!";
      }
    }
  }
};
</script>

<style lang="scss">
.finishedMessage {
  &__text {
    font-size: 1.8rem;
    padding-bottom: 20px;
  }
}
</style>
