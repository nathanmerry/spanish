<template>
  <section v-if="phrase != null" class="question">
    <Speech
      v-if="type === `audio`"
      v-bind:text="phrase"
      :speakOnCreate="true"
    />
    <div v-if="type === `text`" class="question__text-wrapper">
      <span class="question__text">{{ phrase }}</span>
      <Speech
        v-if="language.question != `english`"
        v-bind:text="phrase"
        :speakOnCreate="true"
      />
    </div>
  </section>
</template>

<script>
import Speech from "./speech.vue";

export default {
  name: "Question",
  components: { Speech },

  data() {
    return {
      Speech: "Speech"
    };
  },

  props: {
    type: String,
    phrase: String,
    language: Object
  }
};
</script>

<style lang="scss">
.question {
  padding-bottom: 20px;

  &__text-wrapper {
    display: flex;
    align-items: center;
  }

  &__text {
    margin-right: 10px;
    font-size: 1.2rem;

    &:first-letter {
      text-transform: capitalize;
    }
  }
}
</style>
