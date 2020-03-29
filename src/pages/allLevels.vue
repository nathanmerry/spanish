<template>
  <div class="level">
    <GameLayout :levelInfo="currentLevelInfo" />
  </div>
</template>

<script>
import GameLayout from "../games/gameLayout.vue";
import levelsInfo from "../levels.json";

export default {
  name: "allLevels",
  components: {
    GameLayout
  },

  data() {
    return {
      level: this.$route.params.level,
      levelsInfo: levelsInfo
    };
  },

  computed: {
    currentLevelInfo() {
      let currentLevel = this.level.split("")[5];
      return this.levelsInfo[currentLevel - 1];
    }
  }
};
</script>

<style lang="scss">
.level {
  height: 100%;
}
</style>
