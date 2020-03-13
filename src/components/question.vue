<template>
  <div class="question">
    <Speech v-if="type === `audio`" v-bind:text="text" />
    <div v-if="type === `text`" class="question__text">{{ text }}</div>
  </div>
</template>

<script>
import Speech from "./speech.vue";

export default {
  name: "Question",
  components: { Speech },

  props: {
    type: String,
    text: String
  }
};
</script>

<style lang="scss">
.question {
  padding-bottom: 20px;

  &__text {
    font-size: 1.2rem;

    &:first-letter {
      text-transform: capitalize;
    }
  }
}
</style>
