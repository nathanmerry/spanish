<template>
  <div :style="getPercetage" class="progressbar"></div>
</template>

<script>
export default {
  name: "ProgressBar",

  props: {
    loadingPercentage: Number
  },
  computed: {
    getPercetage() {
      return `transform: ScaleX(${this.loadingPercentage})`;
    }
  }
};
</script>

<style lang="scss">
.progressbar {
  width: 100%;
  height: 10px;
  background: orange;
  transform-origin: top left;
  transition: 0.4s;
}
</style>
