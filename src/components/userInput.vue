<template>
  <div v-if="qa" class="userInput">
    <div class="container">
      <div class="userInput__header">
        Type this in
        <span class="userInput__header--language">{{ language.answer }}</span>
      </div>
      <div class="userInput__question">
        <Question v-bind:type="questionType" v-bind:text="this.qa[0].title" />
      </div>
      <div class="userInput__answer">
        <textarea type="text" v-model="userInput" class="userInput__input" />
        <button
          v-if="
            hasSubmitedRightAnswer === null ||
              hasSubmitedRightAnswer === 'try-again'
          "
          v-on:click="getUserAnswer(userInput)"
          class="userInput__submit"
        >
          Submit
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Question from "./question.vue";

export default {
  name: "userInput",
  components: { Question },

  props: {
    qa: Array,
    hasSubmitedRightAnswer: Boolean,
    questionType: String,
    language: Object
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
      if (
        answer === this.qa[0].answer
        // || this.qa[0].possibleAnswerEs.includes(answer)
      ) {
        this.correctAnswers.push(1);
        this.submittedAnswerNo = 0;
        this.$emit("hasSubmitedRightAnswer", "correct");
      } else if (this.submittedAnswerNo < 2) {
        this.$emit("hasSubmitedRightAnswer", "try-again");
      } else {
        this.submittedAnswerNo = 0;
        this.$emit("hasSubmitedRightAnswer", "incorrect");
      }
    },

    getUserInput(input) {
      this.userInput = input;
    }
  },

  watch: {
    hasSubmitedRightAnswer: function() {
      if (this.hasSubmitedRightAnswer === null) {
        this.userInput = "";
      }
    }
  }
};
</script>

<style lang="scss">
.userInput {
  &__header {
    font-size: 1.8rem;
    margin-bottom: 20px;
  }

  &__answer {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    max-width: 400px;
    font-size: 1.2rem;
  }

  &__input {
    resize: none;
    width: 100%;
    min-height: 120px;
    margin-bottom: 20px;
    padding: 5px 10px;
    background: #8080801c;
    border: 1px solid grey;
    border-radius: 3px;
    font-size: 1.1rem;
    line-height: 25px;
    outline: none;
  }

  &__submit {
    padding: 5px 20px;
    background: #1abc9c;
    border-radius: 3px;
    font-size: 1.2rem;
    color: whitesmoke;
  }
}
</style>
