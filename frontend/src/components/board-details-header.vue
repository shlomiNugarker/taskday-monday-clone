<template>
  <section
    class="w-[calc(100vw-120px)] sticky left-0 bg-white z-10 shadow-board px-[30px] py-[15px]"
    :class="{ 'w-[calc(100vw-340px)]': isNavBarOpen, 'w-screen mt-[70px] max-[620px]:block': $store.getters.isMobile }"
  >
    <board-header-main :board="currBoard" v-if="showHeader" />
    <board-toolbar
      @toggleToolbar="showHeader = !showHeader"
      @changeView="changeView"
    />
    <board-filter
      :currBoard="currBoard"
      :filterBy="filterBy"
      @filter="filter"
      @sort="sort"
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
    sort(type) {
      if (!type) {
        var sortBy = { type: '', direction: 1 }
        this.$store.commit({ type: 'updateSort', sortBy })

        return
      }
      var sortBy = JSON.parse(JSON.stringify(this.$store.getters.currSortBy))
      sortBy.direction = sortBy.type === type ? sortBy.direction * -1 : 1
      sortBy.type = type
      this.$store.commit({ type: 'updateSort', sortBy })
    },
    changeView(view) {
      this.$store.commit({ type: 'changeView', view })
    },
  },
  components: {
    boardHeaderMain,
    boardToolbar,
    boardFilter,
  },
}
</script>