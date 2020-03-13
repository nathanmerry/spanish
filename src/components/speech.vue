<template>
  <div class="speech">
    <button v-on:click="speak(text)" class="speech__btn">
      <img class="speech__icon" src="../assets/speaker.png" alt="" />
    </button>
  </div>
</template>

<script>
import textToSpeech from "../utils/text-to-speech.js";

export default {
  name: "Speech",

  props: {
    text: String
  },

  methods: {
    speak(text) {
      textToSpeech.speak(text);
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
