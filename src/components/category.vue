<template>
  <li id="category" class="categories__item">
    <a>
      {{ category }}
    </a>
  </li>
</template>

<script>
export default {
  name: "Category",

  props: {
    category: String
  }
};
</script>

<style lang="scss">
.categories {
  &__list {
    display: flex;
    justify-content: space-around;

    margin: 0;
    padding: 0;
    list-style: none;
  }

  &__item {
    text-transform: capitalize;
    font-size: 20px;
    color: #1a5982;
    font-weight: 700;
  }
}
</style>
