<template>
  <div class="category">
    <ProgressBar
      v-bind:routeName="theSubject"
      v-bind:loadingPercentage="this.completedGamePercent"
    />

    <MultipleSelect
      v-bind:qa="qa"
      v-bind:hasSubmitedRightAnswer="hasSubmitedRightAnswer"
      v-bind:language="language"
      v-bind:questionType="questionType"
      v-on:hasSubmitedRightAnswer="getUserAnswer($event)"
    />

    <FinishedMessage
      v-bind:phrases="qa"
      v-bind:correctAnswers="correctAnswers"
      v-bind:gameLength="gameLength"
    />

    <Phrases
      phraseAmount="3"
      v-bind:category="theSubject"
      v-bind:hasSubmitedRightAnswer="hasSubmitedRightAnswer"
      v-bind:language="language"
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
import MultipleSelect from "../components/multipleSelect.vue";
import ProgressBar from "../components/progressbar.vue";
import Validation from "../components/validation.vue";
import FinishedMessage from "../components/finishedMessage.vue";

export default {
  name: "MultipleChoice",
  components: {
    Phrases,
    MultipleSelect,
    ProgressBar,
    Validation,
    FinishedMessage
  },

  props: {
    questionType: String,
    language: Object
  },

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

      if (this.hasSubmitedRightAnswer === "correct") {
        this.correctAnswers += 1;
      }
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
    font-size: 1.8rem;
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
    font-size: 1.8rem;
  }

  &__phrase {
    font-size: 1.8rem;
  }
}
</style>
