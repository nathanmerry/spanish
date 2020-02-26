<template>
  <div class="phrase">
    <div class="container">
      <div class="phrase__form">
        <input
          class="phrase__input"
          type="text"
          :placeholder="phraseC.taskName"
          v-bind:value="value"
          v-on:input="passUserInput($event.target.value)"
        />
        <button
          class="phrase__submit-answer"
          v-if="phraseC.submitAnswerBtn"
          v-on:click="submitAnswer"
        >
          Submit
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Phrase",

  data() {
    return {
      userInput: ""
    };
  },

  props: {
    phrase: Object,
    validationMessage: String,
    value: String,
    isCorrect: Boolean,
    phraseC: Object
  },

  methods: {
    passUserInput: function(value) {
      this.$emit("input", value);
    },

    submitAnswer() {
      this.$emit("submitAnswer", this.userInput);
    }
  },


};
</script>

<style lang="scss">
.phrase {
  padding-top: 30px;
  text-align: center;

  &__form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__input {
    display: inline-block;
    width: 300px;
    margin: 20px 0 40px 0;
    font-size: 15px;
  }

  &__submit-answer {
    font-size: 20px;
    background: none;
    color: #d79e38;
    border: 1px solid #d79e38;
    border-radius: 2px;
    padding: 5px 10px;
  }
}
</style>
