<template>
  <div class="category">
    <main class="main">
      <ProgressBar
        v-bind:routeName="theSubject"
        v-bind:loadingPercentage="completedGamePercent"
      />

      <GameContainer
        :levelInfo="levelInfo"
        :gameInfo="gameInfo"
        :qa="qa"
        :answerGrade="answerGrade"
        v-on:getAnswerGrade="getAnswerGrade($event)"
      />

      <FinishedMessage
        v-bind:phrases="qa"
        v-bind:correctAnswers="correctAnswers"
        v-bind:gameLength="gameLength"
      />

      <Phrases
        :additionalPhrases="gameInfo.additionalPhrases"
        :category="theSubject"
        :answerGrade="answerGrade"
        :language="levelInfo.language"
        v-on:sendPhrases="getPhrases($event)"
        v-on:apiCall="getGameLength($event)"
      />
    </main>

    <Validation v-bind:answerGrade="answerGrade" v-bind:phrases="qa" />
  </div>
</template>

<script>
import Phrases from "../components/phrases.vue";
import ProgressBar from "../components/progressbar.vue";
import Validation from "../components/validation.vue";
import FinishedMessage from "../components/finishedMessage.vue";
import GameContainer from "./gameContainer";
import games from "../games.json";

export default {
  name: "GameLayout",
  components: {
    Phrases,
    GameContainer,
    ProgressBar,
    Validation,
    FinishedMessage
  },

  props: {
    levelInfo: Object
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

    getGameLength: function(gameLength) {
      this.gameLength = gameLength;
    },

    getAnswerGrade: function(grade) {
      this.answerGrade = grade;

      if (this.answerGrade === "correct") {
        this.correctAnswers += 1;
      }
    }
  },

  computed: {
    gameInfo() {
      return games[this.levelInfo.game]
    }
  },

  created() {
    this.clickedGetPhraseAmount = 0;
  }
};
</script>

<style lang="scss">
.category {
  display: flex;
  flex-direction: column;
  position: relative;
  // overflow: hidden;
  height: 100vh;

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

.main {
  position: relative;
  flex: 1;
  margin-bottom: 20px;
}
</style>
