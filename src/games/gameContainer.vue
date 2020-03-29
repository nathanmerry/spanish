<template>
  <section v-if="qa.length != 0 && qa != false" class="multipleSelect">
    <div class="container">
      <h2 class="multipleSelect__header">
        {{ gameHeader }}
      </h2>

      <Question
        :type="levelInfo.questionType"
        :phrase="question"
        :language="levelInfo.language"
      />

      <component
        :is="levelInfo.game"
        :questionType="levelInfo.questionType"
        :language="levelInfo.language"
        :qa="qa"
        :answerGrade="answerGrade"
        v-on:getUserAnswer="reviewUserAnswer($event, $event)"
      ></component>
    </div>
  </section>
</template>

<script>
import games from "../games.json";
import Question from "../components/question.vue";
import MultipleChoice from "./multiplechoice2.vue";
import OpenEnded from "./openEnded.vue";

export default {
  name: "GameContainer",
  components: {
    Question,
    MultipleChoice,
    OpenEnded
  },

  props: {
    levelInfo: Object,
    gameInfo: Object,
    qa: Array,
    answerGrade: String
  },

  data() {
    return {
      numSubmittedAnswers: 0
    };
  },

  methods: {
    reviewUserAnswer(answer) {
      this.numSubmittedAnswers += 1;

      if (answer === this.qa[0].title) {
        this.$emit("getAnswerGrade", "correct");
      } else {
        if (this.numSubmittedAnswers < this.gameInfo.allowedAttempts) {
          this.$emit("getAnswerGrade", "try-again");
        } else {
          this.$emit("getAnswerGrade", "incorrect");
        }
      }
    }
  },

  computed: {
    gameHeader() {
      return games[this.levelInfo.game].header;
    },

    question() {
      if (this.qa.length != 0) {
        return this.qa[0].question;
      } else {
        return null;
      }
    }
  },

  watch: {
    answerGrade: function() {
      if (this.answerGrade === null) {
        this.numSubmittedAnswers = 0;
      }
    }
  },

  created() {
    this.$emit("answerGrade", null);
  }
};
</script>

<style lang="scss">
.multipleSelect {
  &__wrap {
    display: flex;
    flex-direction: column;
  }

  &__header {
    font-size: 1.8rem;
    margin-bottom: 20px;
    text-transform: capitalize;
  }

  &__question {
    display: flex;
  }

  &__question-text {
    margin-right: 30px;
    font-size: 1.2rem;
    font-weight: 700;

    @media only screen and (min-width: 700px) {
      margin-bottom: 50px;
    }
  }

  &__answer-wrap {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    max-width: 500px;
    padding-bottom: 10px;

    @media only screen and (min-width: 700px) {
      padding-bottom: 20px;
    }
  }

  &__answer-btn {
    display: flex;
    align-items: center;
    width: 450px;
    margin-right: 20px;
    padding: 10px;
    font-size: 1.2rem;
    cursor: pointer;
    background: none;
    border: 2px solid #00000040;
    border-radius: 10px;

    &--active {
      border: 2px solid orange;
      background: #ffa5002e;
    }

    &:hover {
      transform: scale(1.02);
    }
  }

  &__answer-index {
    border: 1px solid #00000040;
    padding: 5px 7px;
    border-radius: 7px;
    color: #0000008f;
  }

  &__answer-text {
    flex: 1;
    text-align: center;
    text-transform: capitalize;
  }
}
</style>
