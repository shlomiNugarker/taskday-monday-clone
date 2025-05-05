<template>
  <section class="relative w-full h-full">
    <div
      class="w-full h-8 flex items-center justify-center text-white text-sm font-medium rounded-md transition-all duration-200 hover:opacity-90 cursor-pointer"
      :style="{ backgroundColor: priorityStyle }"
      @click="toggleDropdown"
    >
      <div class="flex items-center space-x-1.5">
        <span v-if="task.priority !== '-'" class="priority-indicator" :style="{ backgroundColor: priorityStyle }"></span>
        <span>{{ task.priority }}</span>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 ml-1 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
    
    <!-- Custom dropdown -->
    <div 
      v-if="isOpen" 
      class="absolute top-full left-0 mt-1 w-full bg-white rounded-md shadow-lg z-20 overflow-hidden transform origin-top transition-all duration-150 ease-in-out"
    >
      <div 
        v-for="(opt, idx) in opts" 
        :key="idx"
        class="px-3 py-2 text-sm cursor-pointer transition-colors duration-150 hover:bg-gray-50 flex items-center space-x-2"
        :class="{ 'bg-gray-50': task.priority === opt.priority }"
        @click="changePriority(opt.priority)"
      >
        <span 
          class="h-2.5 w-2.5 rounded-full" 
          :style="{ backgroundColor: opt.color }"
        ></span>
        <span 
          class="font-medium"
          :style="{ color: opt.textColor || '#333' }"
        >
          {{ opt.priority }}
        </span>
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
  name: 'priority-selector',
  data() {
    return {
      isOpen: false,
      opts: [
        { priority: 'High', color: '#e44258', textColor: '#e44258' },
        { priority: 'Medium', color: '#ffa500', textColor: '#b97a00' },
        { priority: 'Low', color: '#69bd45', textColor: '#3c7a1a' },
        { priority: '-', color: '#c4c4c4', textColor: '#666666' },
      ],
    }
  },
  mounted() {
    document.addEventListener('click', this.closeDropdown);
  },
  beforeDestroy() {
    document.removeEventListener('click', this.closeDropdown);
  },
  computed: {
    priorityStyle() {
      const priority = this.task.priority;
      const priorityMap = {
        'High': '#e44258',
        'Medium': '#ffa500',
        'Low': '#69bd45',
        '-': '#c4c4c4'
      };
      
      return priorityMap[priority] || '#c4c4c4';
    },
  },
  methods: {
    toggleDropdown(event) {
      event.stopPropagation();
      this.isOpen = !this.isOpen;
    },
    closeDropdown(event) {
      if (!this.$el.contains(event.target)) {
        this.isOpen = false;
      }
    },
    changePriority(priority) {
      this.isOpen = false;
      
      if (priority === this.task.priority) return;
      
      this.$emit('changePriority', {
        groupId: this.groupId,
        taskId: this.task.id,
        priority,
        boardId: this.boardId
      });
    }
  },
}
</script>

<style scoped>
.priority-indicator {
  display: inline-block;
  height: 8px;
  width: 8px;
  border-radius: 50%;
}
</style>
