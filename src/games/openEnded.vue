<template>
  <section v-if="qa" class="userInput">
    <div class="userInput__answer">
      <textarea
        type="text"
        v-model="userInput"
        ref="userInputRef"
        class="userInput__input"
        v-on:input="getCursorPosition"
        v-bind:placeholder="taskName"
      />
      <div class="userInput__buttons">
        <div class="userInput__keybored">
          <Keybored
            v-if="language.answer != 'english'"
            v-on:getLetter="getAccentedLetter"
          />
        </div>
        <button
          v-if="answerGrade === null || answerGrade === 'try-again'"
          v-on:click="emitUserAnswer(userInput)"
          class="userInput__submit"
        >
          Submit
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import Keybored from "../components/keybored.vue";

export default {
  name: "OpenEnded",
  components: { Keybored },

  props: {
    qa: Array,
    answerGrade: String,
    questionType: String,
    language: Object
  },

  data() {
    return {
      correctAnswers: [],
      userInput: "",
      inputCursorPosition: 0,
      start: 0,
      end: 0,
    };
  },

  methods: {
    processPhrase(phrase) {
      phrase = phrase
        .replace(/\s+/g, " ")
        .toLowerCase()
        .trim();
      return phrase;
    },

    emitUserAnswer(answer) {
      this.$emit("getUserAnswer", answer);
    },

    getUserInput(input) {
      this.userInput = input;
    },

    getCursorPosition: function() {
      this.userInputRef = this.$refs.userInputRef;
      this.start = this.userInputRef.selectionStart;
      this.end = this.userInputRef.selectionEnd;

      return this.end;
    },

    getAccentedLetter: function(letter) {
      // this.userInputRef.focus();
      const cursorPosition = this.getCursorPosition();
      const newInput = this.userInput.split("");
      newInput.splice(cursorPosition, 0, letter);

      this.userInput = newInput.join("");
    },

    setCaretPosition(elemId, caretPos) {
      var elem = document.getElementById(elemId);

      if (elem != null) {
        if (elem.createTextRange) {
          var range = elem.createTextRange();
          range.move("character", caretPos);
          range.select();
        } else if (elem.selectionStart) {
          elem.focus();
          elem.setSelectionRange(caretPos, caretPos);
        } else elem.focus();
      }
    }
  },

  computed: {
    taskName() {
      return `Type this in ${this.language.answer}`;
    },

    question() {
      if (this.qa) {
        console.log(this.qa[0].title);
        return this.qa[0].title;
      } else {
        return null;
      }
    }
  },

  watch: {
    answerGrade: function() {
      if (this.answerGrade === null) {
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

    &--langauge {
      text-transform: capitalize;
    }
  }

  &__answer {
    display: flex;
    flex-direction: column;
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

  &__buttons {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
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
