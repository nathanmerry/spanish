<template>
  <div v-if="displayButton" class="nextPhraseButton">
    <button v-if="hasStartedGame">Next Phrase</button>
    <button v-else>First Phrase</button>
  </div>
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
.nextPhraseBtn {
  display: flex;
}
</style>
