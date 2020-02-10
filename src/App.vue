<template>
  <div id="app">
    <TopTitle />
    <NavBar />
    <MainBody v-bind:title="this.test" />
  </div>
</template>

<script>
import TopTitle from "./components/title.vue";
import NavBar from "./components/navbar.vue";
// import TanguageData from "./utils/apicall.js";
import MainBody from "./components/mainbody.vue";

export default {
  name: "App",
  components: {
    TopTitle,
    NavBar,
    MainBody
  },

  data() {
    return {
      test: []
    };
  }
};
</script>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
  background-color: #f3f3f3;
  font-family: Roboto, sans-serif;

  .main p,
  h1,
  h2,
  h3,
  h4 {
    margin: 0;
    color: inherit;
  }

  a {
    color: inherit;
  }

  .display-mob {
    display: none;
  }

  .span-right {
    margin-right: 5px;
  }

  .main-max-cont {
    position: relative;
    max-width: 1000px;
    width: 100%;
    margin: 0 auto;
  }

  .bold {
    font-weight: 700;
  }

  img {
    max-width: 100%;
  }

  .body-container {
    display: flex;
    flex-direction: row;
  }

  button {
    outline: none !important;
  }

  .container {
    max-width: 1000px;
    margin: 0 auto;
    position: relative;
  }
}

* {
  box-sizing: border-box;
}
</style>
