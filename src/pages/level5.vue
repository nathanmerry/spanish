<template>
  <div class="level">
    <MultipleChoice v-bind:language="language" questionType="audio" />
  </div>
</template>

<script>
import MultipleChoice from "../games/mulitpleChoice.vue";

export default {
  name: "Level5",
  components: {
    MultipleChoice
  },

  created() {
    this.language = {
      question: "spanish",
      answer: "english"
    };
  }
};
</script>

<style lang="scss">
.level {
  height: 100%;
}
</style>
