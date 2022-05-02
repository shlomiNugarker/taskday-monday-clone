<template>
  <div class="side-bar">
    <main-menu />
    <!-- <transition name="show"> -->
    <boards-nav-bar />
    <!-- </transition> -->
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

<style></style>
