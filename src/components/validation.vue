<template>
  <section class="validation">
    <div v-if="correct != null" :class="{ 'validation--correct': correct }">
      <div class="container">
        <div class="validation__wrapper" v-if="correct">
          <div class="validation__icon">
            &#10003;
          </div>
          <div class="validation__message">
            Your Answer is Correct
          </div>
        </div>
        <div v-else class="validation__wrapper">
          <div class="validation__icon">X</div>
          <div class="validation__message">
            Your Answer is Incorrect
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
    hasSubmitedRightAnswer: Boolean
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
  text-align: center;
  color: white;

  &--correct {
    background: #2ecc71;
  }

  &__wrapper {
    display: flex;
    align-items: center;
    padding: 15px 0;
  }

  &__icon {
    border: 1px solid white;
    border-radius: 100%;
    font-size: 24px;
  }

  &__message {
    font-size: 24px;
  }
}
</style>
