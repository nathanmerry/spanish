<template>
  <section v-if="!phrases" class="review">
    <div class="container">
      <h2 class="review__header">Round complete!</h2>
      <button v-on:click="showFullreview()" class="review__showmore">
        Show Review
      </button>

      <div v-if="fullReview" class="review__container">
        <div class="review__wrap">
          <div
            v-for="(answer, index) in finishedAnswers"
            :key="index"
            class="review__col"
          >
            <div :style="getColors(answer.grade)" class="review__item">
              <div class="review__qa">
                <div class="review__qa-wrap">
                  <div class="review__text-container">
                    <div class="review__text review__text--light">Q:</div>
                    <div class="review__text review__text--dark">
                      {{ answer.actual.question }}
                    </div>
                  </div>
                  <div class="review__text-container">
                    <div class="review__text review__text--light">A:</div>
                    <div class="review__text review__text--dark">
                      {{ answer.actual.answer }}
                    </div>
                  </div>
                </div>
                <img
                  v-if="answer.grade === 'correct'"
                  class="review__icon"
                  src="../assets/tick.png"
                />
                <img
                  v-if="answer.grade === 'incorrect'"
                  class="review__icon"
                  src="../assets/cross.png"
                />
              </div>
              <div class="review__callback">
                <div class="review__text review__text--light">Your answer:</div>
                <div class="review__text review__text--dark">
                  {{ answer.chosen }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "review",

  props: {
    answer: Object,
    gameLength: Number,
    phrases: Array
  },

  data() {
    return {
      finishedAnswers: [],
      fullReview: false
    };
  },

  methods: {
    showFullreview() {
      if (this.fullReview === true) {
        this.fullReview = false;
      } else {
        this.fullReview = true;
      }
    },

    getColors(answer) {
      if (answer === "correct") {
        return "background: #D2F7EE; color: #1D8970";
      } else {
        return "background: #FFD9D9; color: #FF5252";
      }
    }
  },

  computed: {
    encouragement() {
      if (this.correctAnswers / this.gameLength > 0.6) {
        this.correctAnswers / this.gameLength;
        return "Well Done";
      } else {
        this.correctAnswers / this.gameLength;
        return "Better luck next time!";
      }
    }
  },

  watch: {
    answer() {
      if (this.answer != null) {
        if (this.answer.grade != "try-again") {
          this.finishedAnswers.push(this.answer);
          console.log(this.finishedAnswers);
        }
      }
    }
  }
};
</script>

<style lang="scss">
.review {
  &__header {
    padding-bottom: 20px;
    text-align: center;
  }

  &__showmore {
    padding: 5px 10px;
    font-size: 1.3rem;
    font-weight: 700;
    color: #ff793f;
    border: 2px solid #ff793f;
    border-radius: 5px;
  }

  &__container {
    // display: none;
  }

  &__wrap {
    display: flex;
    flex-wrap: wrap;
    margin-right: -15px;
    margin-left: -15px;
  }

  &__col {
    width: 100%;
    padding: 10px 15px;

    @media only screen and (min-width: 650px) {
      width: 50%;
    }
  }

  &__item {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    padding: 10px;
    border-radius: 6px;
    font-size: 1.3rem;
  }

  &__qa {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 30px;
  }

  &__qa-wrap {
    display: flex;
    flex-direction: column;
  }

  &__icon {
    width: 20px;
  }

  &__text-container {
    display: flex;
    margin-right: 20px;
  }

  &__text {
    margin: 5px;

    &--light {
      opacity: 42%;
    }

    &--dark {
      font-weight: 700;
    }
  }

  &__sentence {
    &::first-letter {
      text-transform: uppercase;
    }
  }

  &__hyphen {
    margin: 0 10px;
  }
}
</style>
