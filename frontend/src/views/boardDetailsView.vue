<template>
  <section class="h-full">
    <main
      v-if="!isLoading"
      :class="[
        'h-full w-full transition-all duration-300',
        { 'ml-64': isNavBarOpen }
      ]"
    >
      <router-view></router-view>
      <board-details-header />
      <group-list
        :groups="currBoard?.groups"
        :boardId="currBoard?._id"
        v-if="isShowGroupList"
      />

      <kanban
        v-if="!isShowGroupList"
        :groups="currBoard?.groups"
        :boardId="currBoard?._id"
      ></kanban>
    </main>

    <div
      v-if="isLoading"
      :class="[
        'flex items-center justify-center h-full w-full',
        { 'ml-64': isNavBarOpen }
      ]"
    >
      <img src="../styles/images/Loader.gif" alt="Loading" class="w-16 h-16" />
    </div>
  </section>
</template>

<script>
import boardDetailsHeader from '../components/board-details-header.vue'
import groupList from '../components/group-list.vue'
import kanban from '../components/kanban-group-list.vue'
import { socketService } from '../services/socket.service'

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
    isLoading() {
      return this.$store.getters.isLoading
    },
    currView() {
      return this.$store.getters.currView
    },
    isShowGroupList() {
      if (this.currView === 'kanban') {
        return false
      }
      return true
    },
  },
  created() {
    const boardId = this.$route.params.boardId
    this.$store.dispatch({ type: 'getBoardById', boardId })
    socketService.on('board updateBoard', this.updateBoard)
  },
  unmount() {
    socketService.off('board updateBoard', this.updateBoard)
  },
  methods: {
    updateBoard(board) {
      this.$store.commit({ type: 'setCurrBoard', board })
    },
  },
  watch: {
    '$route.params.boardId'() {
      const boardId = this.$route.params.boardId
      if (!boardId) return
      this.$store.dispatch({ type: 'getBoardById', boardId })
    },
  },
  components: {
    boardDetailsHeader,
    groupList,
    kanban,
  },
}
</script>