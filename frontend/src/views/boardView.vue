<template>
  <main class="flex h-screen bg-gray-50">
    <side-bar></side-bar>
    <div class="flex-grow">
      <router-view />
    </div>
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