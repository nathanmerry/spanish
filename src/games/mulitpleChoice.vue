<template>
  <div class="category">
    <ProgressBar
      v-bind:routeName="theSubject"
      v-bind:loadingPercentage="this.completedGamePercent"
    />
    <Questions
      v-bind:qa="qa"
      v-bind:hasSubmitedRightAnswer="hasSubmitedRightAnswer"
      v-on:hasSubmitedRightAnswer="getUserAnswer($event)"
    />
    <Phrase2
      phraseAmount="3"
      v-bind:category="theSubject"
      v-bind:hasSubmitedRightAnswer="hasSubmitedRightAnswer"
      v-on:sendPhrases="getPhrases($event)"
      v-on:apiCall="getGameLength($event)"
      v-on:resetUserAnswer="resetUserAnswer($event)"
    />
    <Validation v-bind:hasSubmitedRightAnswer="hasSubmitedRightAnswer" />
  </div>
</template>

<script>
import Phrase2 from "../components/phrases2.vue";
import Questions from "../components/questions.vue";
import ProgressBar from "../components/progressbar.vue";
import Validation from "../components/validation.vue";

export default {
  name: "multipleChoice",
  components: {
    Phrase2,
    Questions,
    ProgressBar,
    Validation
  },

  data() {
    return {
      theSubject: this.$route.params.subject,
      qa: [],
      hasSubmitedRightAnswer: null,
      clickedGetPhraseAmount: 0
    };
  },

  methods: {
    getCompletedPercentage() {
      this.completedGamePercent = this.clickedGetPhraseAmount / this.gameLength;
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

    getGameLength: function(gameLength) {
      this.gameLength = gameLength;
    },

    getUserAnswer: function(answer) {
      this.hasSubmitedRightAnswer = answer;
    }
  },

  created() {
    this.clickedGetPhraseAmount = 0;
  }
};
</script>

<style lang="scss">
.category {
  position: relative;
  overflow: hidden;
  height: 100%;

  &__exit-link {
    margin-right: 10px;
    font-size: 30px;
    text-decoration: none;
    color: #2980b9;
  }

  &__wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    // height: 390px;
  }

  &__active {
    display: block;
  }

  &__inactive {
    display: none;
  }

  &__title-container {
    text-align: center;
    text-transform: capitalize;
    font-size: 40px;
  }

  &__title {
    margin: 40px 0;
  }

  &__list {
    margin: 0;
    padding: 0;
    list-style: none;
    text-align: center;
  }

  &__item {
    &--active {
      display: block;
    }

    &--inactive {
      display: none;
    }
  }

  &__phrase {
    padding-top: 20px;
  }

  &__section-2 {
    position: absolute;
    bottom: 0;
  }
}

.header {
  text-align: center;

  &__task {
    padding-bottom: 20px;
    font-size: 20px;
  }

  &__phrase {
    font-size: 30px;
  }
}
</style>
