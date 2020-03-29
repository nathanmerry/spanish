<template>
  <section class="viewbar">
    <div class="container">
      <div class="viewbar__wrap">
        <router-link
          class="viewbar__exit-link"
          :to="{ name: 'category', params: { subject: routeName } }"
          >&#10006;</router-link
        >
        <div :style="getPercetage" class="viewbar__progressbar"></div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "ProgressBar",

  props: {
    loadingPercentage: Number,
    routeName: String
  },
  computed: {
    getPercetage() {
      if (this.loadingPercentage) {
        return `transform: ScaleX(${this.loadingPercentage})`;
      } else {
        return `transform: ScaleX(0)`;
      }
    }
  }
};
</script>

<style lang="scss">
.viewbar {
  &__wrap {
    display: flex;

    margin: 5px 0 20px 0;
    align-items: center;

    @media only screen and (min-width: 700px) {
      margin: 5px 0 40px 0;
    }
  }

  &__progressbar {
    width: 100%;
    height: 10px;
    background: orange;
    transform-origin: top left;
    transition: 0.4s;
  }

  &__exit-link {
    margin-right: 10px;
    font-size: 1.8rem;
    text-decoration: none;
    color: #2980b9;
  }
}
</style>
