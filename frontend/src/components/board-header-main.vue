<template>
  <section>
    <div class="board-header-main">
      <div>
        <div class="title">
          <div v-if="!isEdit" @click="focusIn" @change="updateBoard">
            {{ title }}
          </div>
          <div v-if="isEdit">
            <input
              @keydown.enter="saveTitle"
              @input="saveTitle"
              class="input-title"
              ref="input"
              @focusout="isEdit = false"
              type="text"
              v-model="title"
            />
          </div>

          <span @click="onClickInfo">
            <font-awesome-icon class="info-icon" icon="circle-info" />
          </span>

          <span @click="onClickStar">
            <img class="star-icon" src="../styles/icon/star-yellow.png" />
          </span>
        </div>
      </div>

      <div class="right-side-header">
        <div class="last-seen-btn">
          <button>Last seen</button>
        </div>

        <div>
          <button>
            <img class="invite-user-img" src="../styles/icon/user.png" alt="" />
            Invite/ <span>4</span>
          </button>
        </div>

        <div class="invite">
          <button class="invite">Activty</button>
        </div>

        <div class="add-to-board">
          <p><span>+</span> Add to board</p>
        </div>

        <div class="container-dots">
          <font-awesome-icon class="dots-icon" icon="ellipsis" />
        </div>
      </div>
    </div>
    <p class="subtitle">
      Learn how to create tasks that are clear, transparent, and on point.
    </p>
  </section>
</template>

<script>
export default {
  name: 'board-header-main',
  props: {
    board: Object,
  },
  data() {
    return {
      isEdit: true,
      title: this.board.title,
    }
  },
  created() {},
  components: {},
  computed: {},
  methods: {
    focusIn() {
      this.isEdit = true

      setTimeout(() => {
        this.$refs.input.focus()
      }, 10)
    },
    focusOut() {
      this.isEdit = false
    },
    saveTitle() {
      console.log('save')
      this.updateBoard()
    },
    updateBoard() {
      const boardToEdit = JSON.parse(JSON.stringify(this.board))
      boardToEdit.title = this.title

      this.$store.dispatch({
        type: 'updateBoard',
        boardToEdit,
      })
    },
  },
  watch: {
    '$store.getters.currBoard'() {
      this.title = this.$store.getters.currBoard.title
    },
  },
}
</script>
