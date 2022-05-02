<template>
  <section class="container-details-view">
    <main
      class="boardDetails"
      v-if="currBoard"
      :class="[{ 'nav-bar-open': isNavBarOpen }]"
    >
      <router-view></router-view>
      <board-details-header />
      <group-list :groups="currBoard.groups" :boardId="currBoard._id" />
    </main>

    <div
      class="loading"
      v-if="!currBoard"
      :class="[{ 'nav-bar-open': isNavBarOpen }]"
    >
      <img src="../styles/images/Loader.gif" alt="" />
    </div>
  </section>
</template>

<script>
import { faThumbsDown } from '@fortawesome/free-solid-svg-icons'
import boardDetailsHeader from '../components/board-details-header.vue'
import groupList from '../components/group-list.vue'
export default {
  name: 'board-details',
  data() {
    return {}
  },
  computed: {
    currBoard() {
      return this.$store.getters.currBoard
    },
    isNavBarOpen() {
      return this.$store.getters.isNavBarOpen
    },
  },
  created() {
    // this.$store.dispatch({ type: 'getBoards' })
  },
  methods: {},
  watch: {
    '$route.params.boardId'() {},
  },
  components: {
    boardDetailsHeader,
    groupList,
  },
}
</script>

<style></style>
