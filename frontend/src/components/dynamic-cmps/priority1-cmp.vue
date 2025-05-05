<template>
  <section class="dynamic-priority relative" @click="toggleDropdown">
    <div class="dynamic-priority-indicator"
      :style="{ backgroundColor: priorityStyle }">
      {{ task.priority || '-' }}
    </div>
    
    <!-- Options dropdown -->
    <div v-if="isOpen" 
      class="dynamic-dropdown-menu"
      @click.stop>
      <div v-for="(opt, idx) in opts" 
        :key="idx"
        class="dynamic-status-option"
        :style="{ backgroundColor: opt.color }"
        @click="changePriority(opt.priority)">
        {{ opt.priority }}
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
        { priority: 'High', color: '#e44258' },
        { priority: 'Medium', color: '#ffa500' },
        { priority: 'Low', color: '#69bd45' },
        { priority: '-', color: '#c4c4c4' },
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
      if (event) event.stopPropagation();
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
/* All styling moved to common.css */
</style>
