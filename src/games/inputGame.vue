<template>
  <div class="category">
    <main class="main">
      <ProgressBar
        v-bind:routeName="theSubject"
        v-bind:loadingPercentage="completedGamePercent"
      />

      <UserInput
        v-bind:qa="qa"
        v-bind:answerGrade="answerGrade"
        v-bind:questionType="questionType"
        v-bind:language="language"
        v-on:answerGrade="getUserAnswer($event)"
      />

      <FinishedMessage
        v-bind:phrases="qa"
        v-bind:correctAnswers="correctAnswers"
        v-bind:gameLength="gameLength"
      />

      <Phrases
        additionalPhrases="0"
        game="input"
        v-bind:category="theSubject"
        v-bind:answerGrade="answerGrade"
        v-bind:language="language"
        v-on:sendPhrases="getPhrases($event)"
        v-on:apiCall="getGameLength($event)"
      />
    </main>
    <div class="bottom-row">
      <Validation
        v-bind:answerGrade="answerGrade"
        v-bind:phrases="qa"
      />
    </div>
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

  props: {
    questionType: String,
    language: Object
  },

  data() {
    return {
      theSubject: this.$route.params.subject,
      qa: [],
      answerGrade: null,
      clickedGetPhraseAmount: 0,
      gameLength: null,
      correctAnswers: 0,
      completedGamePercent: 0
    };
  },

  methods: {
    getGameLength: function(gameLength) {
      this.gameLength = gameLength;
    },

    getCompletedPercentage() {
      this.completedGamePercent = this.clickedGetPhraseAmount / this.gameLength;
      this.clickedGetPhraseAmount += 1;
    },

    getPhrases: function(phrases) {
      this.getCompletedPercentage();
      this.answerGrade = null;
      if (phrases) {
        this.qa = phrases;
      } else {
        this.qa = false;
      }
    },

    getUserAnswer: function(answer) {
      this.answerGrade = answer;

      if (this.answerGrade === "correct") {
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
