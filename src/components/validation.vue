<template>
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
</template>

<script>
export default {
  name: "Validation",

  props: {
    validation: Object
  }
};
</script>

<style lang="scss"></style>
