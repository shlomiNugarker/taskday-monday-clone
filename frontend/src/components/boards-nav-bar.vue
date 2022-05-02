<template>
  <section class="boards-nav-bar" v-if="isNavBarOpen">
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
      <div>
        <span>
          <plus-icon />
        </span>
        Add
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
        @click="moveToBoard(board.boardId)"
        v-bind:class="[{ 'board-clicked': currBoard._id === board.boardId }]"
      >
        <span>
          <board-icon />
        </span>

        {{ board.boardTitle }}
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
  props: {
    // boards: Array,
  },
  data() {
    return {}
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
      this.$store.commit({ type: 'toggleNavBar' })
      // this.$emit('boardClicked')
    },
    moveToBoard(boardId) {
      this.$router.push(`/board/${boardId}`)
      this.$store.dispatch({ type: 'getBoardById', boardId })
      this.closeModal()
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
