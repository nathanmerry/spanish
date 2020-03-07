<template>
  <div class="category">
    <ProgressBar
      v-bind:routeName="theSubject"
      v-bind:loadingPercentage="this.completedGamePercent"
    />

    <UserInput
      v-bind:qa="qa"
      v-bind:hasSubmitedRightAnswer="hasSubmitedRightAnswer"
      v-on:hasSubmitedRightAnswer="getUserAnswer($event)"
    />

    <FinishedMessage
      v-bind:phrases="qa"
      v-bind:correctAnswers="correctAnswers"
      v-bind:gameLength="gameLength"
    />

    <Phrases
      phraseAmount="1"
      game="input"
      v-bind:category="theSubject"
      v-bind:hasSubmitedRightAnswer="hasSubmitedRightAnswer"
      v-on:sendPhrases="getPhrases($event)"
      v-on:apiCall="getGameLength($event)"
    />

    <Validation
      v-bind:hasSubmitedRightAnswer="hasSubmitedRightAnswer"
      v-bind:phrases="qa"
    />
  </div>
</template>

<script>
import Phrases from "../components/phrases.vue";
import UserInput from "../components/userInput.vue";
import Validation from "../components/validation.vue";
import ProgressBar from "../components/progressbar.vue";
import FinishedMessage from "../components/finishedMessage.vue";

export default {
  name: "InputGame",
  components: { Phrases, UserInput, Validation, ProgressBar, FinishedMessage },

  data() {
    return {
      theSubject: this.$route.params.subject,
      qa: [],
      hasSubmitedRightAnswer: null,
      clickedGetPhraseAmount: 0,
      gameLength: null,
      correctAnswers: 0
    };
  },

  methods: {
    getGameLength: function(gameLength) {
      this.gameLength = gameLength;
    },

    getCompletedPercentage() {
      this.completedGamePercent = this.clickedGetPhraseAmount / this.gameLength;
      console.log(this.completedGamePercent);
      this.clickedGetPhraseAmount += 1;
    },

    getPhrases: function(phrases) {
      this.getCompletedPercentage();
      this.hasSubmitedRightAnswer = null;
      if (phrases) {
        this.qa = phrases;
      } else {
        this.qa = false;
      }
    },

    getUserAnswer: function(answer) {
      this.hasSubmitedRightAnswer = answer;

      if (this.hasSubmitedRightAnswer === "correct") {
        this.correctAnswers += 1;
      }
    },

    speak(message) {
      var msg = new SpeechSynthesisUtterance(message);
      var voices = window.speechSynthesis.getVoices();
      msg.voice = voices[0];
      window.speechSynthesis.speak(msg);
    }
  }
};
</script>

<style lang="scss"></style>
