<template>
  <div class="category">
    <div class="container">
      <div class="category__wrap">
        <h2 class="category__title">{{ the_subject }}</h2>
        <div
          :class="{
            category__active: phrasesContainer.isActive,
            category__inactive: phrasesContainer.isInactive
          }"
          class="category__list"
        >




          <div
            v-for="(phrase, index) in this.phrases"
            :key="index"
            :class="{
              'category__item--active': phrase.isActive,
              'category__item--inactive': phrase.isInactive
            }"
          >
            <li class="category__phrase">{{ phrase.phrases.english }}</li>
            <li>{{ phrase.phrases.spanish }}</li>
            <form @submit="checkForm">
              <input v-model="answer.userInput" placeholder="edit me" />
              <button v-on:click="isAnswerCorrect">Submit</button>
            </form>
            <p>{{ answer.validationMessage }}</p>
          </div>
        </div>
        <div
          :class="{
            category__active: finishedContainer.isActive,
            category__inactive: finishedContainer.isInactive
          }"
        >
          You have finished
        </div>

        <NextPhraseButton
          v-bind:hasStartedGame="this.hasStartedGame"
          v-bind:displayButton="this.displayShowNextButton"
          v-on:click.native="beginGame()"
        />
      </div>
    </div>
    <div style="height: 500px;"></div>
  </div>
</template>

<script>
import NextPhraseButton from "./nextphrasebtn.vue";
import helpers from "../utils/helpers.js";

export default {
  name: "Category",
  components: {
    NextPhraseButton
  },

  data() {
    return {
      the_subject: this.$route.params.subject,
      phrases: [],
      phrasesContainer: { isActive: true, isInactive: false },
      finishedContainer: { isActive: false, isInactive: true },
      alreadyCalled: [],
      position: null,
      phraseButtonText: "Begin game",
      answer: {
        userInput: "",
        correct: null,
        validationMessage: ""
      },
      hasStartedGame: false,
      displayShowNextButton: true
    };
  },

  methods: {
    getDisplayPhraseIndex() {
      let randomNumber = helpers.randomNumber(this.phrases.length);
      if (this.alreadyCalled.length >= this.phrases.length) {
        this.displayFinishedMessage();
      } else if (this.alreadyCalled.includes(randomNumber)) {
        return this.getDisplayPhraseIndex();
      } else if (!this.alreadyCalled.includes(randomNumber)) {
        this.alreadyCalled.push(randomNumber);
        this.position = randomNumber;
      }
    },

    beginGame() {
      this.hasStartedGame = true;
      this.getDisplayPhraseIndex();
      this.clearLastPhrase();
      this.showNextPhrase();
    },

    clearLastPhrase() {
      this.phrases.map(phrase => {
        phrase.isActive = false;
        phrase.isInactive = true;
      });
      this.answer.userInput = "";
      this.answer.validationMessage = "";
    },

    showNextPhrase() {
      this.phraseButtonText = "Show Next Phrase";
      this.phrases[this.position].isActive = true;
      this.phrases[this.position].isInactive = false;
      this.displayShowNextButton = false;
    },

    isAnswerCorrect() {
      if (
        this.answer.userInput === this.phrases[this.position].phrases.spanish
      ) {
        this.getAnswerMessage(true);
        this.displayShowNextButton = true;
      } else {
        this.getAnswerMessage(false);
      }
    },

    getAnswerMessage(isCorrect) {
      return isCorrect
        ? (this.answer.validationMessage = "Correct!")
        : (this.answer.validationMessage = "Incorrect!");
    },

    displayFinishedMessage() {
      this.phrasesContainer.isActive = false;
      this.phrasesContainer.isInactive = true;
      this.finishedContainer.isActive = true;
      this.finishedContainer.isInactive = false;
    },

    checkForm: function(e) {
      if (this.name && this.age) {
        return true;
      }

      this.errors = [];

      if (!this.name) {
        this.errors.push("Name required.");
      }
      if (!this.age) {
        this.errors.push("Age required.");
      }

      e.preventDefault();
    }
  },

  // api call to get all of the phrases
  mounted() {
    fetch("https://data.test/index.php/wp-json/markers/v1/post/")
      .then(response => response.json())
      .then(jsonResponse => {
        return jsonResponse.map(item => {
          return {
            isActive: false,
            isInactive: true,
            category: item.category[0].name,
            phrases: {
              english: item.acf.name_en,
              spanish: item.acf.name_es
            }
          };
        });
      })
      .then(phrasesObject => {
        this.phrases = phrasesObject.filter(phrase => {
          return phrase.category == this.the_subject;
        });
      });
  }
};
</script>

<style lang="scss">
.category {
  position: relative;

  &__wrap {
    padding-top: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__active {
    display: block;
  }

  &__inactive {
    display: none;
  }

  &__title {
    text-align: center;
    text-transform: capitalize;
  }

  &__list {
    margin: 0;
    padding: 0;
    list-style: none;
    text-align: center;
  }

  &__item {
    &--active {
      display: block;
    }

    &--inactive {
      display: none;
    }
  }

  &__phrase {
    padding-top: 20px;
  }

  &__btn {
  }
}
</style>
