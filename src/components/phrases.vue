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
      passedPhrases: null
    };
  },

  methods: {
    getPhraseIndex() {
      let answersArray = [];

      console.log(this.phrases);

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

    getPhrases() {
      let phraseIndexes = this.getPhraseIndex();
      let wrongPhrases = [];
      this.passedPhrases = [];

      if (phraseIndexes) {
        phraseIndexes.map((phraseIndex, index) => {
          if (index === 0) {
            let correctPhrase = this.phrases[phraseIndex];
            this.passedPhrases.push(correctPhrase);
          } else {
            wrongPhrases.push(this.phrases[phraseIndex]);
          }
        });
        wrongPhrases.map(wrongphrase => {
          this.passedPhrases.push(wrongphrase);
        });
      } else {
        this.passedPhrases = false;
      }
    },

    sendPhrases: function() {
      this.nextPhraseText = "Next Phrase";
      this.getPhrases();
      this.$emit("sendPhrases", this.passedPhrases);
    },

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
    // call API
    TanguageApi.requestPhrases(this.category)
      .then(phrases => {
        this.phrases = phrases;
        console.log('created')
        console.log(this.phrases);
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
    font-size: 20px;
    padding: 10px 20px;
    display: inline;
    border-radius: 5px;
    background: #2980b9;
    color: white;
  }
}
</style>
