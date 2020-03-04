<template>
  <section class="validation">
    <div v-if="correct != null" :class="{ 'validation--correct': correct }">
      <div class="container">
        <div class="validation__wrapper">
          <div class="validation__mark">
            <div v-html="text.symbol" class="validation__icon"></div>
            <div class="validation__message">
              {{ text.validation }}
            </div>
          </div>
          <div class="validation__advice">
            <strong>Meaning:</strong>
            {{ correctSolution }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Validation",

  props: {
    hasSubmitedRightAnswer: Boolean,
    phrases: Array
  },

  data() {
    return {
      correct: null
    };
  },

  methods: {
    answerValidationDisplay(answerValidation) {
      if (answerValidation === true) {
        this.correct = true;
      } else if (answerValidation === false) {
        this.correct = false;
      } else {
        this.correct = null;
      }
    }
  },

  watch: {
    hasSubmitedRightAnswer: function() {
      this.answerValidationDisplay(this.hasSubmitedRightAnswer);
    }
  },

  computed: {
    correctSolution() {
      return this.phrases[0].spanish;
    },

    text() {
      if (this.correct) {
        return {
          validation: "correct",
          symbol: "&#10003"
        };
      } else {
        return { validation: "incorrect", symbol: "x" };
      }
    }
  }
};
</script>

<style lang="scss">
.validation {
  position: absolute;
  bottom: 0;
  width: 100%;
  // padding: 10px 0;
  background: #e74c3c;
  color: white;

  &--correct {
    background: #2ecc71;
  }

  &__wrapper {
    // display: flex;
    // align-items: center;
    // padding: 15px 0;
  }

  &__mark {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
  }

  &__icon {
    border: 1px solid white;
    border-radius: 100%;
    font-size: 24px;
  }

  &__message {
    font-size: 24px;
  }

  &__advice {
    text-align: left;
  }
}
</style>
