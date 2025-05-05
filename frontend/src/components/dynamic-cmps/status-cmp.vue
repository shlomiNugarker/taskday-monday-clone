<template>
  <section 
    class="dynamic-status relative"
    @click="openModal"
  >
    <div 
      class="dynamic-status w-full" 
      :style="{ backgroundColor: statusStyle }"
    >
      <div v-if="isDone && isPlay" class="mr-1 flex items-center">
        <svg class="w-4 h-4 text-white animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
      </div>
      <div class="truncate">{{ task.status || '-' }}</div>
    </div>
    
    <!-- Status Dropdown -->
    <div 
      v-if="showDropdown"
      class="dynamic-status-options"
      @click.stop
    >
      <div 
        v-for="(opt, idx) in opts" 
        :key="idx"
        class="dynamic-status-option"
        :style="{ backgroundColor: opt.color }"
        @click="changeStatus(opt.status)"
      >
        {{ opt.status }}
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    task: {
      type: Object,
      required: true
    },
    boardId: String,
    groupId: String,
  },
  name: 'status-cmp',
  data() {
    return {
      opts: [
        { status: 'Stuck', color: '#e2435c' },
        { status: 'Working on it', color: '#fec173' },
        { status: 'Done', color: '#00c875' },
        { status: '-', color: '#c4c4c4' },
      ],
      isPlay: false,
      showDropdown: false
    }
  },
  computed: {
    statusStyle() {
      if (this.task.status === 'Stuck') return '#e2445c'
      else if (this.task.status === 'Working on it') return '#fdab3d'
      else if (this.task.status === 'Done') return '#00c875'
      return '#c4c4c4'
    },
    isDone() {
      return this.task.status === 'Done'
    },
  },
  mounted() {
    document.addEventListener('click', this.closeDropdown)
  },
  beforeDestroy() {
    document.removeEventListener('click', this.closeDropdown)
  },
  methods: {
    openModal() {
      this.showDropdown = !this.showDropdown
    },
    closeDropdown(event) {
      if (this.showDropdown && !event.target.closest('.status-popup')) {
        this.showDropdown = false
      }
    },
    changeStatus(status) {
      if (status === this.task.status) {
        this.showDropdown = false
        return
      }
      
      this.showDropdown = false
      
      if (status === 'Done') {
        this.isPlay = true
        setTimeout(() => (this.isPlay = false), 1500)
      }

      this.$emit('changeStatus', {
        groupId: this.groupId,
        taskId: this.task.id,
        status,
      })
    }
  },
  components: {},
}
</script>

<style scoped>
/* All styling moved to common.css */
</style>

