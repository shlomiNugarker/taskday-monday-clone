<template>
  <section class="flex items-center justify-between px-2 py-3">
    <button @click="addGroup" class="bg-[#0073ea] text-white rounded-md px-4 py-2 text-sm hover:bg-[#0060d9] transition-colors">New Group</button>

    <div class="flex items-center gap-2">
      <div>
        <div class="relative">
          <form class="w-[200px]">
            <input
              class="w-full px-4 py-2 rounded-md bg-[#f5f6f8] border border-[#e0e3e7] text-sm outline-none pl-8"
              type="search"
              placeholder="Search..."
              v-model="currFilterBy.txt"
              @input="filter()"
            />
            <font-awesome-icon icon="search" class="absolute left-2.5 top-3 text-[#676879] text-sm" />
          </form>
        </div>
      </div>

      <div>
        <el-dropdown class="side-drop-down" trigger="click">
          <span class="el-dropdown-link">
            <button 
              class="flex items-center px-3 py-2 text-sm border border-[#e0e3e7] rounded-md hover:bg-[#f5f6f8] transition-colors" 
              :class="{'bg-[#dcdfec] border-[#0073ea]': isFilter}">
              <span class="flex items-center">
                <img class="w-4 h-4 mr-1" src="../styles/icon/filter.svg" alt="" />
                Filter
              </span>
            </button>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="clearFilter">
                <span>Clear all</span>
              </el-dropdown-item>
              <div class="p-2 w-[220px]">
                <div class="mb-3">
                  <p class="font-semibold text-xs text-[#676879] mb-1">Status:</p>
                  <el-dropdown-item
                    v-for="(opt, idx) in statusOpts"
                    :key="idx"
                    @click="changeStatusFilter(opt.txt)"
                    :class="{
                      'bg-[#dcdfec] rounded-md p-[3px] m-[3px]': opt.txt === currFilterBy.statusTxt,
                    }"
                  >
                    <span :style="{ color: opt.color }">
                      {{ opt.txt }}
                    </span>
                  </el-dropdown-item>
                </div>
                <div class="mb-3">
                  <p class="font-semibold text-xs text-[#676879] mb-1">Priority:</p>
                  <el-dropdown-item
                    v-for="(opt, idx) in priorityOpts"
                    :key="idx"
                    @click="changePriorityFilter(opt.txt)"
                    :class="{
                      'bg-[#dcdfec] rounded-md p-[3px] m-[3px]': opt.txt === currFilterBy.priorityTxt,
                    }"
                  >
                    <span :style="{ color: opt.color }">
                      {{ opt.txt }}
                    </span>
                  </el-dropdown-item>
                </div>
                <div>
                  <p class="font-semibold text-xs text-[#676879] mb-1">Person:</p>
                  <el-dropdown-item
                    v-for="member in members"
                    :key="member._id"
                    @click="changePersonFilter(member._id)"
                    :class="{
                      'bg-[#dcdfec] rounded-md p-[3px] m-[3px]': member._id === currFilterBy.personId,
                    }"
                  >
                    <div class="flex items-center">
                      <img
                        class="w-6 h-6 rounded-full object-cover mr-2"
                        :src="member.imgUrl"
                        alt=""
                      />
                      <span>
                        {{ member.fullname }}
                      </span>
                    </div>
                  </el-dropdown-item>
                </div>
              </div>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <div>
        <el-dropdown class="side-drop-down" trigger="click">
          <span class="el-dropdown-link">
            <button 
              class="flex items-center px-3 py-2 text-sm border border-[#e0e3e7] rounded-md hover:bg-[#f5f6f8] transition-colors"
              :class="{'bg-[#dcdfec] border-[#0073ea]': isSort}">
              <span class="flex items-center">
                <img class="w-4 h-4 mr-1" src="../styles/icon/sort.svg" alt="" />
                Sort
              </span>
            </button>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <div class="p-2 w-[180px]">
                <p class="font-semibold text-xs text-[#676879] mb-1">By:</p>
                <el-dropdown-item
                  v-for="opt in sortOpts"
                  :key="opt"
                  @click="sort(opt)"
                  :class="{
                    'bg-[#dcdfec] rounded-md p-[3px] m-[3px]': opt === currSortBy.type,
                  }"
                  ><span>{{ opt }}</span>
                </el-dropdown-item>
              </div>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
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
        return true
      }
      return false
    },
    isSort() {
      if (this.currSortBy.type) {
        return true
      }
      return false
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
