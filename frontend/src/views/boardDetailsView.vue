<template>
  <section class="container-details-view">
    <main
      class="boardDetails"
      v-if="!isLoading"
      :class="[{ 'nav-bar-open': isNavBarOpen }]"
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
      class="loading"
      v-if="isLoading"
      :class="[{ 'nav-bar-open': isNavBarOpen }]"
    >
      <img src="../styles/images/Loader.gif" alt="" />
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
    return {
      // isShowGroupList: false,
    }
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
      console.log('update board, details page')
      this.$store.commit({ type: 'setCurrBoard', board })
    },
  },

  watch: {
    '$route.params.boardId'() {
      const boardId = this.$route.params.boardId
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

<style></style>
