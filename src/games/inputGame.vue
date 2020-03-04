<template>
  <div class="category">
    <UserInput
      v-bind:qa="qa"
      v-bind:hasSubmitedRightAnswer="hasSubmitedRightAnswer"
      v-on:hasSubmitedRightAnswer="getUserAnswer($event)"
    />
    <Phrase2
      phraseAmount="1"
      game="input"
      v-bind:category="theSubject"
      v-bind:hasSubmitedRightAnswer="hasSubmitedRightAnswer"
      v-on:sendPhrases="getPhrases($event)"
      v-on:apiCall="getGameLength($event)"
    />
  </div>
</template>

<script>
import Phrase2 from "../components/phrases2.vue";
import UserInput from "../components/userInput.vue";

export default {
  name: "InputGame",
  components: { Phrase2, UserInput },

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

    getPhrases: function(phrases) {
      this.hasSubmitedRightAnswer = null;
      if (phrases) {
        this.qa = phrases;
      } else {
        this.qa = false;
      }
    },

    getUserAnswer: function(answer) {
      this.hasSubmitedRightAnswer = answer;

      if (this.hasSubmitedRightAnswer === true) {
        this.correctAnswers += 1;
      }
    }
  }
};
</script>

<style lang="scss"></style>
