<template>
  <div>
    <h2>Your name is {{ their_name }}</h2>
    <p>This is an about page</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      their_name: this.$route.params.name
    };
  }
};
</script>
