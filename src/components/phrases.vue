<template>
  <section class="phrases2">
    <div class="container">
      <button
        v-if="displayButton"
        v-on:click="sendPhrases"
        class="phrases2__button"
      >
        {{ buttonText }}
      </button>
    </div>
  </section>
</template>

<script>
import TanguageApi from "../utils/tanguage-api";
import helpers from "../utils/helpers.js";

export default {
  name: "Phrases",

  props: {
    language: Object,
    additionalPhrases: Number,
    category: String,
    answerGrade: String
  },

  data() {
    return {
      calledAnswerIndexes: [],
      index: [],
      displayButton: false,
      buttonText: "Begin game",
      // phrases: [],
      currentIndex: -1,
      emitedPhrases: []
    };
  },

  methods: {
    getAllPhrases(phrases) {
      for (var a = [], i = 0; i < phrases.length; ++i) a[i] = i;
      a = helpers.shuffleArr(a);

      return a.map(index => {
        return phrases[index];
      });
    },

    structurePhrases(phrases) {
      return phrases.map(phrase => {
        return {
          title: phrase.title,
          question: phrase[this.language.question],
          answer: phrase[this.language.answer],
          possibleAnswers: phrase[this.language.answer]
        };
      });
    },

    getCurrentPhrases(phrases) {
      this.currentIndex = this.currentIndex + 1;

      if (this.currentIndex < phrases.length) {
        this.emitedPhrases = [];

        this.emitedPhrases.push(phrases[this.currentIndex]);

        if (this.additionalPhrases > 0) {
          helpers
            .randomIndexes(
              this.additionalPhrases,
              this.phrases.length,
              this.currentIndex
            )
            .forEach(addIndex => {
              this.emitedPhrases.push(phrases[addIndex]);
            });
        }

        return this.emitedPhrases;
      } else {
        return false;
      }
    },

    // emits the phrases to parent
    sendPhrases: function() {
      this.buttonText = "Next phrase";
      this.$emit("sendPhrases", this.getCurrentPhrases(this.phrases));
      this.shouldDisplayButton(this.answerGrade);
    },

    // calculates whether to display the get phrases btn based on if the users answer is correct
    shouldDisplayButton(answer) {
      if (answer === "correct" || answer === "incorrect" || answer === true) {
        this.displayButton = true;
      } else if (
        answer === "try-again" ||
        answer === null ||
        answer === false
      ) {
        this.displayButton = false;
      }
    }
  },

  created() {
    // call API to get the phrases
    TanguageApi.requestPhrases(this.category)
      .then(unshuffledPhrases => this.getAllPhrases(unshuffledPhrases))
      .then(shuffledPhrases => this.structurePhrases(shuffledPhrases))
      .then(structuredPhrases => (this.phrases = structuredPhrases))
      .then(() => this.$emit("apiCall", this.phrases.length))
      .then(() => this.shouldDisplayButton(true));
  },

  watch: {
    answerGrade: function() {
      this.shouldDisplayButton(this.answerGrade);
    }
  }
};
</script>

<style lang="scss">
.phrases2 {
  &__button {
    font-size: 1.2rem;
    padding: 10px 20px;
    display: inline;
    border-radius: 5px;
    background: #2980b9;
    color: white;
  }
}
</style>
