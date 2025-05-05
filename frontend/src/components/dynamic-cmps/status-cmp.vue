<template>
  <section 
    class="w-full h-full flex items-center justify-center rounded-md cursor-pointer relative group transition-all duration-200"
    @click="openModal"
  >
    <div 
      class="w-full py-1.5 px-3 flex items-center justify-center text-white text-xs font-medium rounded transition-all duration-200 hover:shadow-sm" 
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
      class="absolute z-50 top-full left-0 mt-1 bg-white rounded shadow-lg border border-gray-200 p-1.5 min-w-[150px] animate-fadeIn"
      @click.stop
    >
      <div 
        v-for="(opt, idx) in opts" 
        :key="idx"
        class="flex justify-center text-white text-xs font-medium py-2 px-3 rounded mb-1 cursor-pointer transition-all duration-200 hover:opacity-90 hover:shadow-sm"
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
.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-5px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fadeIn {
  animation: fadeIn 0.2s ease-in-out;
}

.animate-bounce {
  animation: bounce 1s infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateY(-10%); }
  50% { transform: translateY(10%); }
}
</style>

