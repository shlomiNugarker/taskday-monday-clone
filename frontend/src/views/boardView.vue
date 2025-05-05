<template>
  <main class="flex">
    <side-bar></side-bar>
    <router-view />
  </main>
</template>

<script>
import sideBar from '../components/side-bar.vue'

export default {
  name: 'board-view',
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {
    this.$store.dispatch({ type: 'getBoardsList' })
  },
  methods: {},
  components: {
    sideBar,
  },
}
</script>

<style scoped>
.boardView {
  display: flex;
}
</style>