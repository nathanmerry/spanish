<template>
  <div class="viewbar">
    <router-link
      class="viewbar__exit-link"
      :to="{ name: 'category', params: { subject: routerName } }"
      >&#10006;</router-link
    >
    <div :style="getPercetage" class="viewbar__progressbar"></div>
  </div>
</template>

<script>
export default {
  name: "ProgressBar",

  props: {
    loadingPercentage: Number,
    routerName: String
  },
  computed: {
    getPercetage() {
      return `transform: ScaleX(${this.loadingPercentage})`;
    }
  }
};
</script>

<style lang="scss">
.viewbar {
  display: flex;
  margin: 5px 0 40px 0;
  align-items: center;
  padding: 0 10px;

  &__progressbar {
    width: 100%;
    height: 10px;
    background: orange;
    transform-origin: top left;
    transition: 0.4s;
  }

  &__exit-link {
    margin-right: 10px;
    font-size: 30px;
    text-decoration: none;
    color: #2980b9;
  }
}
</style>
