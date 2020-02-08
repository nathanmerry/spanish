<template>
  <div>

  </div>
</template>

<script>
export default {
  name: "skills",
  props: {
    msg: String
  },
  data() {
    return {
      skills: [{ skill: "Vue.js" }, { skill: "Javascript" }],
      test: {
        display: false,
        hide: true
      }
    };
  }
};
</script>

<style lang="scss">
.display {
  display: block;
}

.hide {
  display: none;
}
</style>
