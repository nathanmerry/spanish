<template>
  <div class="qa">
    <div class="container">
      <div v-if="qa">
        <div class="qa__header">Mark the correct translation:</div>
        <div class="qa__question-phrase">
          {{ this.qa[0].title }}
        </div>

        <button
          v-for="(answer, index) in qa"
          v-bind:key="index"
          class="qa__answer"
          :class="{
            'qa__answer--active': qa[shuffledIndex[index] - 1].isActive
          }"
          v-on:click="getUserAnswer(qa[shuffledIndex[index] - 1], index)"
        >
          <div class="qa__answer-index">{{ index + 1 }}</div>
          <div class="qa__answer-text">
            {{ qa[shuffledIndex[index] - 1].spanish }}
          </div>
        </button>
      </div>
      <div class="qa__header" v-else>
        You have finished
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Questions",

  props: {
    qa: Array,
    hasSubmitedRightAnswer: Boolean
  },

  data() {
    return {
      shuffledIndex: []
    };
  },

  methods: {
    getUserAnswer(answer, btnIndex) {
      if (this.hasSubmitedRightAnswer === null) {
        if (answer.title === this.qa[0].title) {
          this.$emit("hasSubmitedRightAnswer", true);
        } else {
          this.$emit("hasSubmitedRightAnswer", false);
        }

        this.qa.map((question, qIndex) => {
          if (btnIndex === qIndex) {
            // this.qa[this.shuffledIndex[qIndex] - 1].isActive = true;
          }
        });
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
          console.log(this.qa[this.shuffledIndex[qIndex] - 1].isActive);
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
    this.$emit("hasSubmitedRightAnswer", null);
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
