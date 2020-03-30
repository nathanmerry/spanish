<template>
  <section class="speech">
    <button v-on:click="speak(text)" class="speech__btn">
      <img class="speech__icon" src="../assets/speaker.png" alt="" />
    </button>
  </section>
</template>

<script>
import textToSpeech from "../utils/text-to-speech.js";

export default {
  name: "Speech",

  props: {
    text: String,
    speakOnCreate: Boolean
  },

  methods: {
    speak(text) {
      textToSpeech.speak(text);
    }
  },

  watch: {
    text() {
      if (this.speakOnCreate === true) {
        this.speak(this.text);
      }
    }
  }
};
</script>

<style lang="scss">
.speech {
  &__btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 3rem;
    height: 3rem;
    padding: 10px;
    border-radius: 100%;
  }

  &__icon {
    // width: 30px;
    // height: 30px;
  }
}
</style>
