<template>
  <section class="boards-nav-bar" v-if="isNavBarOpen" @mouseleave="mouseleave">
    <div class="close" @click="closeModal">
      <font-awesome-icon class="arrow-left" icon="angle-left" />
    </div>
    <div class="title-container-modal">
      <div class="title">
        <p>Workspace</p>
        <font-awesome-icon class="dots-icon-modal" icon="ellipsis" />
      </div>

      <div class="main-btn-modal">
        <div>
          <div>
            <div class="workspace-logo">M</div>
          </div>
          <div>
            <h1>Main workspace</h1>
          </div>
        </div>
        <div>
          <font-awesome-icon class="arrow-down" icon="angle-down" />
        </div>
      </div>
    </div>

    <div class="items-title">
      <div class="add-board-btn" @click="open">
        <span>
          <plus-icon />
        </span>
        Add Board
      </div>
      <div>
        <span>
          <filter-icon />
        </span>
        Filters
      </div>
      <div>
        <span>
          <search-icon />
        </span>
        Search
      </div>
    </div>

    <div class="spacer"></div>

    <div class="board-container-modal">
      <div
        v-for="board in boardsList"
        :key="board.boardId"
        class="board-item"
        v-bind:class="[{ 'board-clicked': currBoard?._id === board.boardId }]"
      >
        <span>
          <board-icon />
        </span>

        <p @click.stop="moveToBoard(board.boardId)">
          {{ board.boardTitle }}
        </p>

        <el-dropdown class="side-drop-down" trigger="click" @click.stop="">
          <span class="el-dropdown-link">
            <font-awesome-icon icon="ellipsis" />
            <el-icon class="el-icon2"> </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="removeBoard(board.boardId)">
                <font-awesome-icon icon="trash-can" />Delete
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </section>
</template>

<script>
import plusIcon from '../components/icons/plus-icon.vue'
import filterIcon from '../components/icons/filter-icon.vue'
import searchIcon from '../components/icons/search-icon.vue'
import boardIcon from '../components/icons/board-icon.vue'
export default {
  props: {},
  data() {
    return {
      newBoardName: '',
    }
  },
  computed: {
    boardsList() {
      return this.$store.getters.boardsList
    },
    isNavBarOpen() {
      return this.$store.getters.isNavBarOpen
    },

    currBoard() {
      return this.$store.getters.currBoard
    },
  },
  created() {},
  methods: {
    closeModal() {
      this.$store.commit({ type: 'toggleNavBar', bool: false })
    },
    moveToBoard(boardId) {
      this.$router.push(`/board/${boardId}`)
      this.$store.dispatch({ type: 'getBoardById', boardId })
      this.closeModal()
    },
    async newBoard() {
      var newBoard = await this.$store.dispatch({
        type: 'newBoard',
        boardName: this.newBoardName,
      })
      this.$router.push('/board/' + newBoard._id)
    },
    open() {
      this.$prompt('Please input name', 'Add new board', {
        confirmButtonText: 'ADD',
        cancelButtonText: 'Cancel',
      })
        .then(({ value }) => {
          this.newBoardName = value
          this.newBoard()
          this.$message({
            type: 'success',
            message: `The "${value}" board was successfully added (:`,
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: 'Input canceled',
          })
        })
    },
    removeBoard(boardId) {
      if (boardId === this.boardsList[0].boardId) return
      this.$store.dispatch({
        type: 'removeBoard',
        boardId,
      })
      if (!this.boardsList.length) this.$router.push('/')
      this.$router.push('/board/' + this.boardsList[0].boardId)
    },
    mouseleave() {
      setTimeout(() => this.closeModal(), 1000)
    },
  },

  components: {
    plusIcon,
    filterIcon,
    searchIcon,
    boardIcon,
  },
}
</script>

<style></style>
