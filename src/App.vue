<template>
  <div id="app">
    <Header />
    <Menu />
  </div>
</template>

<script>
import Header from "./components/header.vue";
import Menu from "./components/menu.vue";

export default {
  name: "App",
  components: {
    Header,
    Menu
  }
};
</script>

<style lang="scss">
$colorA: #fdbb43;
$colorB: #1e90ff;

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
