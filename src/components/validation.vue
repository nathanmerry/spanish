<template>
  <section class="validation">
    <div v-if="answer != null" :class="layout.style">
      <div class="container">
        <div class="validation__wrapper">
          <div class="validation__mark">
            <div v-html="layout.symbol" class="validation__icon"></div>
            <div class="validation__message">
              {{ layout.validation }}
            </div>
          </div>
          <div v-if="layout.hint" class="validation__advice">
            <strong>Meaning:</strong>
            {{ answer.actual.answer }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import validationMeta from "../jsons/validation.json";

export default {
  name: "Validation",

  props: {
    answer: Object
  },

  data() {
    return {
      correct: null
    };
  },

  computed: {
    layout() {
      return validationMeta[this.answer.grade];
    }
  }
};
</script>

<style lang="scss">
.validation {
  width: 100%;
  background: #e74c3c;
  color: white;

  &--correct {
    background: #2ecc71;
  }

  &--try-again {
    background: #e67e22;
  }

  &__wrapper {
    padding: 10px 0;
    @media only screen and (min-width: 700px) {
      padding-bottom: 25px;
    }
  }

  &__mark {
    display: flex;
    align-items: center;
    padding-bottom: 10px;

    @media only screen and (min-width: 700px) {
      padding-bottom: 20px;
    }
  }

  &__icon {
    padding: 2px 7px;
    margin-right: 10px;
    border: 1px solid white;
    border-radius: 100%;
    font-size: 1.3rem;
  }

  &__message {
    font-size: 1.3rem;
  }

  &__advice {
    font-size: 1rem;
    text-align: left;
  }
}
</style>
