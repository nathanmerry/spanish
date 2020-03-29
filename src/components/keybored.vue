<template>
  <section class="keybored">
    <div class="keybored__row">
      <button
        v-for="(letter, index) in letters"
        v-bind:key="index"
        v-on:click="getLetter(letter)"
        class="keybored__button"
      >
        {{ letter }}
      </button>
    </div>
  </section>
</template>

<script>
import letterMarks from "../utils/letterMarks";

export default {
  name: "keybored",

  methods: {
    getLetter(letter) {
      this.$emit("getLetter", letter);
    }
  },

  computed: {
    letters() {
      let letters = letterMarks.accentLetters.concat(letterMarks.punctuation);
      return letters;
    }
  }
};
</script>

<style lang="scss">
.keybored {
  &__row {
    display: flex;
    flex-wrap: wrap;
    margin-right: -3px;
    margin-left: -3px;
  }

  &__button {
    width: 30px;
    height: 30px;
    margin: 0 3px 7px 3px;
    background-color: white;
    font-size: 0.9rem;
    font-weight: 700;
    color: grey;
    text-align: center;
    border: 2px solid grey;
    border-radius: 5px;
    box-shadow: 0 3px lightgrey;
    outline: none;
    cursor: pointer;

    &:active {
      background-color: lightgrey;
      box-shadow: 0 3px #666;
      transform: translateY(2px);
    }
  }
}
</style>
