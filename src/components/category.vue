<template>
  <div class="category">
    <div class="container">
      <h1>{{ the_subject }}</h1>
      <p>{{ title }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Category",

  props: {
    title: String,
  },

  data() {
    return {
      the_subject: this.$route.params.subject
    };
  }
};

// create another endpoint which returns the translations speicifc to that subject
</script>




<style lang="scss"></style>
