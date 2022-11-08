<template>
  <section>
    <div class="board-header-main">
      <div>
        <div class="title">
          <div v-if="!isEdit" @click="focusIn" @change="updateBoard">
            {{ title }}
          </div>
          <input
            v-if="isEdit"
            @keydown.enter="saveTitle"
            @input="saveTitle"
            class="input-title"
            ref="input"
            @focusout="isEdit = false"
            type="text"
            v-model="title"
          />

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

        <div class="invite-btn">
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
    <p
      class="subtitle"
      v-if="!isEditSub"
      @click="focusSub"
      v-snip="{ lines: 1, mode: 'css' }"
    >
      {{ board.subtitle }}
    </p>
    <p class="subtitle" v-if="isEditSub">
      <input
        type="text"
        ref="inputSub"
        @focusout="isEditSub = false"
        v-model="subTitle"
        @keydown.enter="saveTitle"
        @input="saveTitle"
      />
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
      isEdit: false,
      isEditSub: false,
      title: '',
      wait: false,
      subTitle: '',
    }
  },
  created() {
    this.title = JSON.parse(JSON.stringify(this.board?.title))
    this.subTitle = JSON.parse(JSON.stringify(this.board?.subtitle))
  },
  components: {},
  computed: {},
  methods: {
    focusIn() {
      this.isEdit = true

      setTimeout(() => {
        this.$refs.input.focus()
      }, 10)
    },
    focusSub() {
      this.isEditSub = true

      setTimeout(() => {
        this.$refs.inputSub.focus()
      }, 10)
    },
    focusOut() {
      this.isEdit = false
    },
    saveTitle() {
      if (this.wait) return
      this.wait = true
      this.updateBoard()
    },
    updateBoard() {
      setTimeout(() => {
        this.wait = false

        const boardToEdit = JSON.parse(JSON.stringify(this.board))
        boardToEdit.title = this.title
        boardToEdit.subtitle = this.subTitle

        this.$store.dispatch({
          type: 'updateBoard',
          boardToEdit,
        })
      }, 2000)
    },
  },
  watch: {
    '$store.getters.currBoard'() {
      this.title = this.$store.getters.currBoard?.title
    },
  },
}
</script>
