<template>
  <div class="nav">
    <div class="container">
      <ul class="nav__wrapper">
        <li
          class="nav__item"
          v-for="(item, index) in menu"
          :key="index"
          :class="{
            'nav__item--active': item.isActive,
            'nav__item--inactive': item.isInactive
          }"
          v-on:click="getSortByClass(index)"
        >
          <a>{{ item.text }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "Activities",

  data() {
    return {
      menu: [
        { text: "Reading", isActive: true, isInactive: false },
        { text: "Listening", isActive: false, isInactive: true },
        { text: "Both", isActive: false, isInactive: true }
      ]
    };
  },

  methods: {
    getSortByClass(key) {
      this.menu.map((item, index) => {
        if (key === index) {
          item.isActive = true;
          item.isInactive = false;
        } else {
          item.isActive = false;
          item.isInactive = true;
        }
      });
    }
  }
};
</script>

<style lang="scss">
.nav {
  background: #2980b9;
  color: black;

  &__wrapper {
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    justify-content: center;
  }

  &__item {
    padding: 10px;
    font-size: 20px;
    cursor: pointer;

    &--active {
      color: #f1c40f;
      border-bottom: 3px solid #daa13b;
    }

    &--inactive {
      color: #f1c40fde;
    }
  }
}
</style>
