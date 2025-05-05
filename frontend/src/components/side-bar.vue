<template>
  <div class="z-5 flex">
    <main-menu />
    <boards-nav-bar />
  </div>
</template>

<script>
import mainMenu from './main-menu.vue'
import boardsNavBar from './boards-nav-bar.vue'

export default {
  components: {
    mainMenu,
    boardsNavBar,
  },
}
</script>