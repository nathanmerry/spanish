<template>
  <div v-if="qa" class="qa">
    <div class="container">
      <div class="qa__header">
        Type the translation for the following phrase
      </div>
      <div class="qa__question-phrase">
        {{ this.qa[0].title }}
      </div>
      <input type="text" v-model="userInput" />
      <button
        v-if="hasSubmitedRightAnswer === null"
        v-on:click="getUserAnswer(userInput)"
      >
        Submit
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "userInput",

  props: {
    qa: Array,
    hasSubmitedRightAnswer: Boolean
  },

  data() {
    return {
      correctAnswers: [],
      userInput: "",
      submittedAnswerNo: 0
    };
  },

  methods: {
    getUserAnswer(answer) {
      this.submittedAnswerNo += 1;
      if (this.hasSubmitedRightAnswer === null) {
        if (answer === this.qa[0].title) {
          this.correctAnswers.push(1);
          this.$emit("hasSubmitedRightAnswer", true);
        } else if (this.submittedAnswerNo < 2) {
          this.$emit("hasSubmitedRightAnswer", null);
        } else {
          this.$emit("hasSubmitedRightAnswer", false);
        }
      }
    }
  }
};
</script>

<style lang="scss">
.qa {
  &__header {
    font-size: 30px;
    margin-bottom: 20px;
  }

  &__question-phrase {
    margin-bottom: 50px;
    font-size: 20px;
    font-weight: 700;
  }

  &__answer {
    display: flex;
    align-items: center;
    width: 100%;
    max-width: 500px;
    margin-bottom: 20px;
    padding: 10px;
    font-size: 20px;
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
  }
}
</style>
