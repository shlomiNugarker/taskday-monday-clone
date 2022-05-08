<template>
  <section
    class="board-details-header"
    :class="[{ 'nav-bar-open': isNavBarOpen }]"
  >
    <board-header-main :board="currBoard" v-if="showHeader" />
    <board-toolbar @toggleToolbar="showHeader = !showHeader" />
    <board-filter
      :currBoard="currBoard"
      :filterBy="filterBy"
      @filter="filter"
    />
  </section>
</template>

<script>
import boardHeaderMain from './board-header-main.vue'
import boardToolbar from './board-toolbar.vue'
import boardFilter from './board-filter.vue'
export default {
  name: 'board-details-header',
  data() {
    return {
      filterBy: null,
      showHeader: true,
      // currBoard: this.$store.getters.currBoard,
    }
  },
  computed: {
    isNavBarOpen() {
      return this.$store.getters.isNavBarOpen
    },
    styleHeader() {
      return this.isNavBarOpen ? 'open' : 'close'
    },
    currBoard() {
      return this.$store.getters.currBoard
    },
  },
  watch: {},
  created() {
    this.filterBy = this.$store.getters.currFilterBy
  },
  methods: {
    filter(filterBy) {
      this.filterBy = filterBy
      this.$store.commit({ type: 'updateFilter', filterBy })
    },
  },
  components: {
    boardHeaderMain,
    boardToolbar,
    boardFilter,
  },
}
</script>
