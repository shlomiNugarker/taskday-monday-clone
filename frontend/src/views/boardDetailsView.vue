<template>
  <section class="container-details-view">
    <main
      class="boardDetails"
      v-if="!isLoading && !hasError"
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
    
    <div
      class="error-container"
      v-if="hasError"
      :class="[{ 'nav-bar-open': isNavBarOpen }]"
    >
      <h3>Unable to load board</h3>
      <p>There was a problem loading this board. Please try again.</p>
      <button @click="retryLoading" class="retry-btn">Retry</button>
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
      hasError: false,
      loadingAttempts: 0
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
    this.loadBoard()
    socketService.on('board updateBoard', this.updateBoard)
  },
  unmount() {
    socketService.off('board updateBoard', this.updateBoard)
  },
  methods: {
    updateBoard(board) {
      this.$store.commit({ type: 'setCurrBoard', board })
    },
    loadBoard() {
      const boardId = this.$route.params.boardId
      this.loadingAttempts++
      this.hasError = false
      
      try {
        this.$store.dispatch({ type: 'getBoardById', boardId })
          .catch(err => {
            console.error('Error in component when loading board:', err)
            this.hasError = true
          })
      } catch (err) {
        console.error('Exception in component when loading board:', err)
        this.hasError = true
      }
    },
    retryLoading() {
      if (this.loadingAttempts < 3) {
        this.loadBoard()
      } else {
        alert('Still having trouble loading. Please try refreshing the page.')
      }
    }
  },

  watch: {
    '$route.params.boardId'() {
      const boardId = this.$route.params.boardId
      if (!boardId) return
      this.loadingAttempts = 0
      this.hasError = false
      this.$store.dispatch({ type: 'getBoardById', boardId })
        .catch(err => {
          console.error('Error in route change when loading board:', err)
          this.hasError = true
        })
    },
  },
  components: {
    boardDetailsHeader,
    groupList,
    kanban,
  },
}
</script>

<style>
.error-container {
  text-align: center;
  padding: 30px;
  margin: 20px;
}

.retry-btn {
  background-color: #0073ea;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 15px;
}

.retry-btn:hover {
  background-color: #0060c0;
}
</style>
