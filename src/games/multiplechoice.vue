<template>
  <section class="multipleSelect">
    <div
      v-for="(answer, index) in qa"
      :key="index"
      class="multipleSelect__answer-wrap"
    >
      <button
        class="multipleSelect__answer-btn"
        v-on:click="emitUserAnswer(qa[shuffledIndex[index] - 1].answer)"
      >
        <div class="multipleSelect__answer-index">{{ index + 1 }}</div>
        <div class="multipleSelect__answer-text">
          {{ qa[shuffledIndex[index] - 1].answer }}
        </div>
      </button>
      <Speech
        v-if="language.answer != 'english'"
        :text="qa[shuffledIndex[index] - 1].answer"
      />
    </div>
  </section>
</template>

<script>
import Speech from "../components/speech";

export default {
  name: "MultipleChoice",

  components: {
    Speech
  },

  props: {
    qa: Array,
    answerGrade: String,
    language: Object,
    questionType: String
  },

  data() {
    return {
      shuffledIndex: [],
      correctAnswers: []
    };
  },

  methods: {
    emitUserAnswer(answer) {
      if (this.answerGrade === null) {
        this.$emit("getUserAnswer", answer);
      }
    },

    getshuffledIndex() {
      var arr = [];
      while (arr.length < this.qa.length) {
        var r = Math.floor(Math.random() * this.qa.length) + 1;
        if (arr.indexOf(r) === -1) arr.push(r);
      }
      return arr;
    },

    activateButton(bIndex) {
      this.qa.map((question, qIndex) => {
        if (bIndex === qIndex) {
          this.qa[this.shuffledIndex[qIndex] - 1].isActive = true;
        }
      });
    }
  },

  watch: {
    qa: function() {
      this.shuffledIndex = this.getshuffledIndex();
    }
  },

  created() {
    this.shuffledIndex = this.getshuffledIndex();
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
