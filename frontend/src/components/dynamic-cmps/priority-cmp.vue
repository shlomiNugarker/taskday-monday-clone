<template>
  <section class="dynamic-priority relative"
    @click="showOptions = !showOptions">
    <div class="dynamic-priority-indicator"
      :style="{ backgroundColor: priorityStyle }">
      {{ priorityLabel || '-' }}
    </div>
    
    <!-- Options dropdown -->
    <div v-if="showOptions" 
      class="dynamic-dropdown-menu"
      @click.stop>
      <div v-for="(option, idx) in priorityOptions" 
        :key="idx"
        class="dynamic-status-option"
        :style="{ backgroundColor: option.color }"
        @click="changePriority(option.value)">
        {{ option.label }}
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
  data() {
    return {
      showOptions: false,
      priorityOptions: [
        { value: 'high', label: 'High', color: '#e2445c' },
        { value: 'medium', label: 'Medium', color: '#fdab3d' },
        { value: 'low', label: 'Low', color: '#00c875' },
        { value: null, label: '-', color: '#c4c4c4' }
      ]
    }
  },
  computed: {
    priorityStyle() {
      const priority = this.task.priority;
      if (priority === 'high') return '#e2445c';
      if (priority === 'medium') return '#fdab3d';
      if (priority === 'low') return '#00c875';
      return '#c4c4c4';
    },
    priorityLabel() {
      const priority = this.task.priority;
      if (priority === 'high') return 'High';
      if (priority === 'medium') return 'Medium';
      if (priority === 'low') return 'Low';
      return null;
    }
  },
  mounted() {
    document.addEventListener('click', this.closeOptions);
  },
  beforeDestroy() {
    document.removeEventListener('click', this.closeOptions);
  },
  methods: {
    closeOptions(event) {
      if (this.showOptions && !event.target.closest('.priority-cmp')) {
        this.showOptions = false;
      }
    },
    changePriority(priority) {
      this.showOptions = false;
      
      this.$emit('changePriority', {
        groupId: this.groupId,
        taskId: this.task.id,
        priority
      });
    }
  }
}
</script>

<style scoped>
/* All styling moved to common.css */
</style>
