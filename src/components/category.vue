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
            <!-- <h3>Phrase {{ index + 1 }}</h3> -->
            <li class="category__phrase">{{ phrase.phrases.english }}</li>
            <li>{{ phrase.phrases.spanish }}</li>
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
        <button
          class="category__btn"
          v-on:click="
            getDisplayPhraseIndex(), clearLastPhrase(), showNextPhrase()
          "
        >
          {{ phraseButtonText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Category",

  data() {
    return {
      the_subject: this.$route.params.subject,
      phrases: [],
      phrasesContainer: { isActive: true, isInactive: false },
      finishedContainer: { isActive: false, isInactive: true },
      alreadyCalled: [],
      position: null,
      phraseButtonText: "Begin game"
    };
  },

  methods: {
    randomNumber(length) {
      return Math.floor(Math.random() * length);
    },

    displayFinishedMessage() {
      this.phrasesContainer.isActive = false;
      this.phrasesContainer.isInactive = true;
      this.finishedContainer.isActive = true;
      this.finishedContainer.isInactive = false;
    },

    getDisplayPhraseIndex() {
      let randomNumber = this.randomNumber(this.phrases.length);
      if (this.alreadyCalled.length >= this.phrases.length) {
        this.displayFinishedMessage();
      } else if (this.alreadyCalled.includes(randomNumber)) {
        return this.getDisplayPhraseIndex();
      } else if (!this.alreadyCalled.includes(randomNumber)) {
        this.alreadyCalled.push(randomNumber);
        this.position = randomNumber;
      }
    },

    clearLastPhrase() {
      this.phrases.map(phrase => {
        phrase.isActive = false;
        phrase.isInactive = true;
      });
    },

    showNextPhrase() {
      this.phraseButtonText = "Show Next Phrase";
      this.phrases[this.position].isActive = true;
      this.phrases[this.position].isInactive = false;
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
    position: absolute;
    right: 0;
    top: 0;
  }
}
</style>
