<template>
  <div class="phrases2">
    <div class="container">
      <button
        v-if="displayBtn"
        v-on:click="sendPhrases"
        class="phrases2__button"
      >
        {{ nextPhraseText }}
      </button>
    </div>
  </div>
</template>

<script>
import TanguageApi from "../utils/tanguage-api";
import helpers from "../utils/helpers.js";

export default {
  name: "Phrase2",

  props: {
    language: Object,
    phraseAmount: String,
    category: String,
    hasSubmitedRightAnswer: String
  },

  data() {
    return {
      calledAnswerIndexes: [],
      index: [],
      nextPhraseText: "Begin",
      displayBtn: true,
      test: []
    };
  },

  methods: {
    // getS three random numbers - item 0 in the array will always be unique
    getPhraseIndex() {
      let answersArray = [];
      while (answersArray.length < this.phraseAmount) {
        var r = helpers.randomNumber(this.phrases.length);
        if (answersArray.indexOf(r) === -1) answersArray.push(r);
      }

      if (this.calledAnswerIndexes.length >= this.phrases.length) {
        return false;
      } else if (this.calledAnswerIndexes.includes(answersArray[0])) {
        return this.getPhraseIndex();
      } else {
        this.calledAnswerIndexes.push(answersArray[0]);
        return answersArray;
      }
    },

    // gets phrases from phrases array using the indexes of getPhraseIndex() - item 0 is always the correct answer
    getPhrases() {
      let phraseIndexes = this.getPhraseIndex();
      let wrongPhrases = [];
      this.unstructuredPhrases = [];

      if (phraseIndexes) {
        phraseIndexes.map((phraseIndex, index) => {
          if (index === 0) {
            let correctPhrase = this.phrases[phraseIndex];
            this.unstructuredPhrases.push(correctPhrase);
          } else {
            wrongPhrases.push(this.phrases[phraseIndex]);
          }
        });
        wrongPhrases.map(wrongphrase => {
          this.unstructuredPhrases.push(wrongphrase);
        });
      } else {
        this.unstructuredPhrases = false;
      }
    },

    // returns the sames phrases but in the structure of question answer
    returnPhraseQaStructure() {
      this.getPhrases();
      if (this.unstructuredPhrases) {
        this.passedPhrases = this.unstructuredPhrases.map(item => {
          return {
            title: item[this.language.question],
            question: item[this.language.question],
            answer: item[this.language.answer],
            possibleAnswers: item[this.language.answer]
          };
        });
      } else {
        this.passedPhrases = false;
      }
    },

    // emits the phrases to parent
    sendPhrases: function() {
      this.nextPhraseText = "Next Phrase";
      this.returnPhraseQaStructure();
      this.$emit("sendPhrases", this.passedPhrases);
    },

    // calculates whether to display the get phrases btn based on if the users answer is correct
    shouldDisplayBtn(answer) {
      if (answer === "correct") {
        this.displayBtn = true;
      } else if (answer === "incorrect") {
        this.displayBtn = true;
      } else if (answer === "try-again") {
        this.displayBtn = false;
      } else if (answer === null) {
        this.displayBtn = false;
      }
    }
  },
  created() {
    // call API to get the phrases
    TanguageApi.requestPhrases(this.category)
      .then(phrases => {
        this.phrases = phrases;
      })
      .then(() => this.$emit("apiCall", this.phrases.length));
  },

  watch: {
    hasSubmitedRightAnswer: function() {
      this.shouldDisplayBtn(this.hasSubmitedRightAnswer);
    }
  },

  updated() {
    this.shouldDisplayBtn(this.hasSubmitedRightAnswer);
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
