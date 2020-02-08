<template>
  <div class="nav">
    <div class="container">
      <ul class="nav__wrapper">
        <li>Reading</li>
        <li>Listening</li>
        <li>Both</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "menu",

  data() {
    return {};
  }
};
</script>

<style lang="scss">
.nav {
  background: dodgerblue;
  color: black;

  &__wrapper {
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    justify-content: center;

    li {
      padding: 0 10px;
      font-size: 20px;
    }
  }
}
</style>
