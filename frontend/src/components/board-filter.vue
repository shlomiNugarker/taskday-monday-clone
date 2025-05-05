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

      <div class="filter-container-btn">
        <el-dropdown 
          class="side-drop-down" 
          trigger="click" 
          placement="bottom" 
          :teleported="true"
          popper-class="filter-dropdown"
        >
          <span class="el-dropdown-link">
            <button class="filter-btn" :class="isFilter">
              <span>
                <img class="filter" src="../styles/icon/filter.svg" alt="" />
                Filter
              </span>
            </button>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="clearFilter">
                <span>Clear all</span>
              </el-dropdown-item>
              <div class="filter-container-drop-down">
                <div class="status">
                  <p>Status:</p>
                  <el-dropdown-item
                    v-for="(opt, idx) in statusOpts"
                    :key="idx"
                    @click="changeStatusFilter(opt.txt)"
                    :class="{
                      'curr-opt-filter': opt.txt === currFilterBy.statusTxt,
                    }"
                  >
                    <span :style="{ color: opt.color }">
                      {{ opt.txt }}
                    </span>
                  </el-dropdown-item>
                </div>
                <div class="pariority">
                  <p>pariority:</p>
                  <el-dropdown-item
                    v-for="(opt, idx) in priorityOpts"
                    :key="idx"
                    @click="changePriorityFilter(opt.txt)"
                    :class="{
                      'curr-opt-filter': opt.txt === currFilterBy.priorityTxt,
                    }"
                  >
                    <span :style="{ color: opt.color }">
                      {{ opt.txt }}
                    </span>
                  </el-dropdown-item>
                </div>
                <div class="person">
                  <p>person:</p>
                  <el-dropdown-item
                    v-for="member in members"
                    :key="member._id"
                    @click="changePersonFilter(member._id)"
                    :class="{
                      'curr-opt-filter': member._id === currFilterBy.personId,
                    }"
                  >
                    <img
                      class="img-person-filter"
                      :src="member.imgUrl"
                      alt=""
                    />
                    <span>
                      {{ member.fullname }}
                    </span>
                  </el-dropdown-item>
                </div>
              </div>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <button :class="isSort" class="sort-btn">
        <el-dropdown 
          class="side-drop-down" 
          trigger="click" 
          placement="bottom"
          :teleported="true"
          popper-class="sort-dropdown"
        >
          <span class="el-dropdown-link">
            <span>
              <img class="sort-icon" src="../styles/icon/sort.svg" alt="" />
            </span>
            <span> Sort </span>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <div class="dropdown-container-sort">
                <p>By:</p>
                <el-dropdown-item
                  v-for="opt in sortOpts"
                  :key="opt"
                  @click="sort(opt)"
                  :class="{
                    'curr-opt-sort': opt === currSortBy.type,
                  }"
                  ><span>{{ opt }}</span>
                </el-dropdown-item>
              </div>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
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
        personId: '',
        statusTxt: '',
        priorityTxt: '',
      },
      users: null,
      statusOpts: [
        { txt: 'Stuck', color: '#e2435c' },
        { txt: 'Working on it', color: '#fec173' },
        { txt: 'Done', color: '#00c875' },
      ],
      priorityOpts: [
        { txt: 'High', color: '#840707' },
        { txt: 'Medium', color: '#bfaf1e' },
        { txt: 'Low', color: '#6d8a16' },
      ],
      sortOpts: ['status', 'priority', 'timeline', 'person'],
    }
  },
  components: {},
  computed: {
    members() {
      return this.$store.getters.members
    },
    selectedNembers() {
      return this.$store.getters.members.filter((member) =>
        member._id.includes(this.currFilterBy.personId)
      )
    },
    currSortBy() {
      return this.$store.getters.currSortBy
    },
    isFilter() {
      if (
        this.currFilterBy.personId ||
        this.currFilterBy.statusTxt ||
        this.currFilterBy.priorityTxt
      ) {
        return 'is-filter-style'
      }
      return ''
    },
    isSort() {
      if (this.currSortBy.type) {
        return 'is-sort-style'
      }
      return ''
    },
  },
  methods: {
    addGroup() {
      this.$store.dispatch({ type: 'addGroup' })
    },
    filter() {
      this.$emit('filter', { ...this.currFilterBy })
    },
    changePersonFilter(personId) {
      var personId = personId === this.currFilterBy.personId ? '' : personId
      this.currFilterBy.personId = personId
      this.filter()
    },
    changeStatusFilter(statusTxt) {
      var statusTxt = statusTxt === this.currFilterBy.statusTxt ? '' : statusTxt
      this.currFilterBy.statusTxt = statusTxt
      this.filter()
    },
    changePriorityFilter(priorityTxt) {
      var priorityTxt =
        priorityTxt === this.currFilterBy.priorityTxt ? '' : priorityTxt
      this.currFilterBy.priorityTxt = priorityTxt
      this.filter()
    },
    clearFilter() {
      this.currFilterBy = {
        txt: '',
        personId: '',
        statusTxt: '',
        priorityTxt: '',
      }
      this.filter()
    },
    sort(type) {
      if (this.currSortBy.type === type) {
        var type = ''
      }
      this.$emit('sort', type)
    },
  },
}
</script>

<style>
.selected-person {
  background-color: lightgoldenrodyellow;
}
.img-selected-person {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  object-fit: cover;
}
.curr-opt-filter {
  background-color: #dcdfec;
  border-radius: 5px;
  padding: 3px;
  margin: 3px;
}
.curr-opt-sort {
  background-color: #dcdfec;
  border-radius: 5px;
  padding: 3px;
  margin: 3px;
}

.filter-dropdown, .sort-dropdown {
  min-width: fit-content !important;
  margin-top: 5px !important;
  transform-origin: center top !important;
}

.el-dropdown__popper {
  max-width: none !important;
}
</style>
