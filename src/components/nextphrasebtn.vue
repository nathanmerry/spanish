<template>
  <section v-if="displayButton" class="nextPhraseButton">
    <div class="container">
      <button class="nextPhraseButton__button" v-if="hasStartedGame">
        Continue
      </button>
      <button class="nextPhraseButton__button" v-else>First Phrase</button>
    </div>
  </section>
</template>

<script>
export default {
  name: "NextPhraseButton",

  data() {
    return {
      text: "BeginGame"
    };
  },
  props: {
    hasStartedGame: Boolean,
    displayButton: Boolean
  },

  methods: {
    renderButton() {}
  }
};
</script>

<style lang="scss">
.nextPhraseButton {
  display: flex;

  &__button {
    font-size: 1.2rem;
    padding: 10px 20px;
    display: inline;
    border-radius: 5px;
    background: #2980b9;
    /* border: 2px solid; */
    color: white;
  }
}
</style>
