<template>
  <section class="board-filter">
    <button @click="addGroup" class="blue-btn">New Group</button>

    <div>
      <div>
        <div class="input-container">
          <form class="nosubmit">
            <input
              class="nosubmit"
              type="search"
              placeholder="Search..."
              v-model="currFilterBy.txt"
              @input="filter()"
            />
          </form>
        </div>
      </div>
      <button class="filter-person">
        <img
          class="img-filter-person"
          src="https://cdn.monday.com/icons/dapulse-person-column.svg"
        />Person
      </button>

      <button class="filter-btn">
        <span
          ><img class="filter" src="../styles/icon/filter.svg" alt=""
        /></span>
        Filter
      </button>

      <button class="">
        <span
          ><img class="sort-icon" src="../styles/icon/sort.svg" alt=""
        /></span>
        Sort
      </button>
    </div>
  </section>
</template>

<script>
export default {
  props: ['currBoard', 'filterBy'],
  name: 'board-filter',

  data() {
    return {
      isOpen: false,
      currFilterBy: {
        txt: '',
        // personId: '',
        // statusTxt: '',
        // priorityTxt: '',
      },
      users: null,
    }
  },
  components: {},
  computed: {},
  methods: {
    addGroup() {
      console.log('add group')
      this.$store.dispatch({ type: 'addGroup' })
    },
    filter() {
      this.$emit('filter', { ...this.currFilterBy })
    },
  },
}
</script>

<style></style>
