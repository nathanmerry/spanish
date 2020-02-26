<template>
  <div class="category">
    <div class="category__viewbar">
      <router-link class="category__exit-link" to="/">&#10006;</router-link>
      <ProgressBar v-bind:loadingPercentage="completedPercentage" />
    </div>

    <div class="category__title-container">
      <div class="container">
        <h2 v-if="!hasStartedGame" class="category__title">
          {{ the_subject }}
        </h2>
      </div>
    </div>

    <div v-if="!finishedGame && hasStartedGame" class="header">
      <div class="container">
        <div class="header__task">{{ phraseC.taskName }}</div>
        <div class="header__phrase">{{ phraseC.questionPhrase }}</div>
      </div>
    </div>

    <Phrase
      v-if="!finishedGame && hasStartedGame"
      @submitAnswer="checkAnswer"
      v-model="phraseC.userInput"
      v-bind:phraseC="phraseC"
    />

    <div v-if="finishedGame">
      You have finished
    </div>

    <NextPhraseButton
      v-bind:hasStartedGame="this.hasStartedGame"
      v-bind:displayButton="this.displayShowNextButton"
      v-on:click.native="showPhrase()"
    />

    <!-- <Validation /> -->
    <div
      class="validation validation--incorrect"
      :class="{
        'validation--correct': validation.isCorrect
      }"
    >
      <div class="validation__wrapper" v-if="validation.display">
        <div class="container">
          <div class="validation__header">
            <div v-html="validation.icon" class="validation__icon"></div>
            <div>{{ validation.message }}</div>
          </div>
          <div class="validation__hint" v-if="validation.hint">
            <div class="validation__hint-header">Correct Solution</div>
            <div class="validation__hint-phrase">
              {{ phraseC.answerPhrase }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NextPhraseButton from "./nextphrasebtn.vue";
import Phrase from "./phrase.vue";
import helpers from "../utils/helpers.js";
import ProgressBar from "./progressbar.vue";

// import Validation from "./validation.vue";

export default {
  name: "Category",
  components: {
    NextPhraseButton,
    Phrase,
    ProgressBar
    // Validation
  },

  data() {
    return {
      the_subject: this.$route.params.subject,
      alreadyCalled: [],
      displayShowNextButton: true,
      hasStartedGame: false,
      finishedGame: false,
      completedPercentage: 0,
      phrases: [],

      phraseC: {
        taskName: "",
        validationMessage: "",
        questionPhrase: "",
        submitAnswerBtn: true,
        userInput: "",
        audio: ""
      },

      validation: {
        display: false,
        isCorrect: false,
        attempts: 0,
        message: "",
        hint: "",
        test: "hello"
      }
    };
  },

  mounted() {
    // api call to get all of the phrases
    fetch("https://data.test/index.php/wp-json/markers/v1/post/")
      .then(response => response.json())
      .then(jsonResponse => {
        return jsonResponse.map(item => {
          return {
            category: item.category[0].name,
            title: item.post_title.trim(),
            english: item.acf.name_en.trim(),
            spanish: item.acf.name_es.trim(),
            audio: null
          };
        });
      })
      .then(phrasesObject => {
        return (this.phrases = phrasesObject.filter(phrase => {
          return phrase.category == this.the_subject;
        }));
      });
  },

  computed: {
    ctesturrentPhrase() {
      return this.currentPhrase;
    }
  },

  methods: {
    getDisplayPhraseIndex() {
      let randomNumber = helpers.randomNumber(this.phrases.length);
      if (this.alreadyCalled.length >= this.phrases.length) {
        this.finishedGame = true;
      } else if (this.alreadyCalled.includes(randomNumber)) {
        return this.getDisplayPhraseIndex();
      } else if (!this.alreadyCalled.includes(randomNumber)) {
        return randomNumber;
      }
    },

    getSpanishOrEnglish() {
      
    },

    getCurrentPhrase() {
      this.currentPhrase = this.phrases[this.getDisplayPhraseIndex()];
      if (helpers.randomNumber(1000) % 2 === 0) {
        this.phraseC = {
          taskName: "Type in the spanish translation:",
          questionPhrase: this.currentPhrase.english,
          answerPhrase: this.currentPhrase.spanish,
          submitAnswerBtn: true
        };
      } else {
        this.phraseC = {
          taskName: "Type in the spanish translation:",
          questionPhrase: this.currentPhrase.spanish,
          answerPhrase: this.currentPhrase.english,
          submitAnswerBtn: true
        };
      }
    },

    clearPhrase() {
      this.phraseC.userInput = "";
      this.phraseC.validationMessage = "";
      this.validation.attempts = 0;
      this.validation.display = false;
      this.validation.isCorrect = false;
      this.validation.hint = false;
      this.validation.icon = "";
      this.phraseC.submitAnswerBtn = true;
      this.displayShowNextButton = false;
    },

    showPhrase() {
      this.hasStartedGame = true;
      this.clearPhrase();
      this.getExcersiceCompletionPercentage();
      this.getCurrentPhrase();
    },

    checkAnswer() {
      this.validation.display = true;
      this.validation.attempts += 1;
      if (this.validation.attempts < 2) {
        if (this.phraseC.userInput === this.phraseC.answerPhrase) {
          this.validation.message = "Correct!";
          this.validation.icon = "&#10003;";
          this.validation.isCorrect = true;
          this.phraseC.submitAnswerBtn = false;
          this.displayShowNextButton = true;
          this.alreadyCalled.push(this.randomPhraseIndex);
        } else {
          this.validation.icon = "&#10005;";
          this.validation.message = "Incorrect! Try again.";
        }
      } else {
        this.validation.message = "Incorrect!";
        this.validation.hint = true;
        this.phraseC.submitAnswerBtn = false;
        this.displayShowNextButton = true;
        this.alreadyCalled.push(this.randomPhraseIndex);
      }
    },

    getExcersiceCompletionPercentage() {
      this.completedPercentage =
        this.alreadyCalled.length / this.phrases.length;
    }
  }
};
</script>

<style lang="scss">
.category {
  // display: flex;
  // flex-direction: column;
  position: relative;
  overflow: hidden;
  height: 100%;

  &__viewbar {
    display: flex;
    margin: 5px 0 40px 0;
    align-items: center;
    padding: 0 10px;
  }

  &__exit-link {
    margin-right: 10px;
    font-size: 30px;
    text-decoration: none;
    color: #2980b9;
  }

  &__wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    // height: 390px;
  }

  &__active {
    display: block;
  }

  &__inactive {
    display: none;
  }

  &__title-container {
    text-align: center;
    text-transform: capitalize;
    font-size: 40px;
  }

  &__title {
    margin: 40px 0;
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

  &__section-2 {
    position: absolute;
    bottom: 0;
  }
}

.header {
  text-align: center;

  &__task {
    padding-bottom: 20px;
    font-size: 20px;
  }

  &__phrase {
    font-size: 30px;
  }
}

.validation {
  position: absolute;
  bottom: 0;
  width: 100%;
  color: white;

  &--incorrect {
    background: #e74c3c;
  }

  &--correct {
    text-align: center;
    background: #2ecc71;
  }

  &__wrapper {
    padding: 20px 0;
  }

  &__header {
    display: flex;
    align-items: center;
    font-size: 25px;
    font-weight: 700;
  }

  &__icon {
    margin-right: 10px;
    border: 2px solid white;
    padding: 5px 11px;
    border-radius: 50px;
  }

  &__hint {
    margin-top: 20px;
  }

  &__hint-header {
    margin-bottom: 10px;
    font-size: 20px;
  }

  &__hint-phrase {
    font-size: 17px;
    font-weight: 300;
  }
}
</style>
