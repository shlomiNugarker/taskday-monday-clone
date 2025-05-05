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
        :class="{ 'board-clicked': currBoard?._id === board.boardId }"
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

<style scoped>
.boards-nav-bar {
  z-index: 1330;
  height: 100vh;
  width: 260px;
  top: 0;
  padding: 16px 16px;
  background-color: #f6f7fb;
  border-right: 1px solid #d0d4e4;
  transition: left 0.3s;
}

.close {
  font-size: 19px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 25px;
  height: 25px;
  background-color: white;
  border-radius: 50%;
  margin-left: 230px;
  border: 1px solid #d0d4e4;
  transition: width 0.2s;
  cursor: pointer;
  color: #5c5c61;
}

.arrow-left {
  width: 9px;
  margin: 0px;
  font-size: 15px;
}

.arrow-left:hover {
  color: white;
}

.close:hover {
  background-color: #0073ea;
  color: white;
  width: 35px;
  border-radius: 20px;
}

.title-container-modal {
  margin-bottom: 5px;
}

.title-container-modal .title {
  color: #757686;
  margin-bottom: 10px;
  font-size: 16px;
  line-height: 21px;
}

.title-container-modal div {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title-container-modal .main-btn-modal {
  border: 1px solid;
  display: flex;
  align-items: center;
  width: 100%;
  height: 40px;
  padding: 6px;
  border-radius: 4px;
  margin-right: 4px;
  border: 1px solid;
  color: #333439;
}

.title-container-modal .main-btn-modal .arrow-down {
  font-size: 20px;
}

.title-container-modal .main-btn-modal .workspace-logo {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 22px;
  height: 22px;
  background-color: #f279f2;
  border-radius: 7px;
  font-size: 18px;
  color: white;
  margin-right: 5px;
}

.items-title {
  margin-top: 10px;
  color: #323338;
}

.items-title .add-board-btn {
  cursor: pointer;
}

.items-title div {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: a5px;
  border-radius: 5px;
  height: 35px;
  transition: background-color 0.2s;
}

.items-title div span {
  width: 20px;
  margin-right: 10px;
}

.items-title div:hover {
  background-color: #dcdfec;
}

.board-container-modal {
  margin-top: 16px;
}

.board-container-modal .board-item span {
  width: 25px;
  margin-right: 3px;
}

.board-container-modal p {
  flex-grow: 1;
  height: 100%;
  display: flex;
  align-items: center;
}

.board-container-modal .board-btn-opts {
  background-color: lightgreen;
  width: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3px;
  border-radius: 5px;
}

.board-container-modal div {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border-radius: 5px;
  height: 35px;
  padding: 5px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.board-container-modal div:hover {
  background-color: #dcdfec;
}

.spacer {
  border-bottom: 1px solid;
  border-color: #e6e9ef;
  border-color: #dcdfec;
  margin: 15px 0px;
}

.el-dropdown-link {
  display: flex;
}

.dots-icon-modal {
  width: 25px;
  height: 17px;
  margin: 0 5px;
  color: #323338;
}

.board-clicked {
  background-color: #cce5ff;
}

@media (max-width: 620px) {
  .el-overlay-message-box {
    .el-message-box {
      width: 100%;
    }
  }
  
  .boards-nav-bar {
    right: 0;
    position: fixed;
    margin-top: 70px;
  }
  
  .boards-nav-bar .close {
    display: none;
  }
}
</style>