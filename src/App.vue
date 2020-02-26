<template>
  <div class="app" id="app">
    <!-- <TopTitle />
    <NavBar /> -->
    <router-view />
  </div>
</template>

<script>

// import TopTitle from "./components/title.vue";
// import NavBar from "./components/navbar.vue";
// import MainBody from "./components/mainbody.vue";

export default {
  name: "App",
  components: {
    // TopTitle,
    // NavBar
  },

  data() {
    return {
      test: []
    };
  },

  
};
</script>

<style lang="scss">
html,
.app {
  height: 100%;
}
body {
  height: 100%;
  margin: 0;
  padding: 0;
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
    padding: 0 20px;
    margin: 0 auto;
    position: relative;
  }
}

* {
  box-sizing: border-box;
}
</style>
