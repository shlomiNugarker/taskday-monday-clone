<template>
  <section class="dynamic-priority relative">
    <div class="dynamic-priority-indicator"
      :class="priorityClass"
      @click.stop="toggleOptions">
      <!-- Priority Icons -->
      <div class="priority-icon-container">
        <font-awesome-icon v-if="task.priority === 'high'" icon="arrow-up" class="priority-icon" />
        <font-awesome-icon v-else-if="task.priority === 'medium'" icon="minus" class="priority-icon" />
        <font-awesome-icon v-else-if="task.priority === 'low'" icon="arrow-down" class="priority-icon" />
        <font-awesome-icon v-else icon="circle" class="priority-icon" />
      </div>
      <div class="priority-label">{{ priorityLabel || '-' }}</div>
    </div>
    
    <!-- Options dropdown -->
    <div v-if="showOptions" 
      class="priority-dropdown"
      @click.stop>
      <div v-for="(option, idx) in priorityOptions" 
        :key="idx"
        class="priority-option"
        :class="`priority-${option.value || 'null'}`"
        @click.stop="changePriority(option.value)">
        <div class="priority-option-content">
          <div class="priority-option-icon">
            <font-awesome-icon v-if="option.value === 'high'" icon="arrow-up" />
            <font-awesome-icon v-else-if="option.value === 'medium'" icon="minus" />
            <font-awesome-icon v-else-if="option.value === 'low'" icon="arrow-down" />
            <font-awesome-icon v-else icon="circle" />
          </div>
          <div class="priority-option-label">{{ option.label }}</div>
        </div>
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
        { value: 'high', label: 'High', color: 'var(--color-priority-critical)' },
        { value: 'medium', label: 'Medium', color: 'var(--color-priority-medium)' },
        { value: 'low', label: 'Low', color: 'var(--color-priority-low)' },
        { value: null, label: '-', color: 'var(--color-status-default)' }
      ]
    }
  },
  computed: {
    priorityClass() {
      const priority = this.task.priority;
      if (priority === 'high') return 'priority-high';
      if (priority === 'medium') return 'priority-medium';
      if (priority === 'low') return 'priority-low';
      return 'priority-none';
    },
    priorityLabel() {
      const priority = this.task.priority;
      if (priority === 'high') return 'High';
      if (priority === 'medium') return 'Medium';
      if (priority === 'low') return 'Low';
      return null;
    }
  },
  created() {
    window.addEventListener('click', this.handleOutsideClick);
  },
  beforeUnmount() {
    window.removeEventListener('click', this.handleOutsideClick);
  },
  methods: {
    toggleOptions() {
      console.log('Toggle priority options')
      this.showOptions = !this.showOptions
    },
    handleOutsideClick(event) {
      // Close dropdown if clicked outside component
      const isClickInside = this.$el.contains(event.target)
      if (!isClickInside && this.showOptions) {
        this.showOptions = false
      }
    },
    changePriority(priority) {
      console.log('Changing priority to:', priority)
      this.showOptions = false
      
      this.$emit('changePriority', {
        groupId: this.groupId,
        taskId: this.task.id,
        priority
      })
    }
  }
}
</script>

<style scoped>
.dynamic-priority {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}

.dynamic-priority-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--radius-md);
  transition: all var(--transition-fast) ease;
  height: 28px;
  cursor: pointer;
}

.dynamic-priority-indicator:hover {
  filter: brightness(0.95);
}

.priority-high {
  background-color: rgba(226, 68, 92, 0.1);
  color: var(--color-priority-critical);
}

.priority-medium {
  background-color: rgba(255, 203, 0, 0.1);
  color: var(--color-priority-medium);
}

.priority-low {
  background-color: rgba(87, 155, 252, 0.1);
  color: var(--color-priority-low);
}

.priority-none {
  background-color: var(--color-extra-light-gray);
  color: var(--color-dark-gray);
}

.priority-icon-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: var(--spacing-xs);
}

.priority-label {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
}

.priority-dropdown {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 5px;
  background-color: white;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-medium);
  z-index: 100;
  width: 140px;
  overflow: hidden;
  animation: fadeInDropdown 0.2s ease forwards;
}

@keyframes fadeInDropdown {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}

.priority-option {
  padding: var(--spacing-sm);
  cursor: pointer;
  transition: background-color var(--transition-fast) ease;
}

.priority-option:hover {
  filter: brightness(0.95);
}

.priority-option-content {
  display: flex;
  align-items: center;
}

.priority-option-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  margin-right: var(--spacing-sm);
}

.priority-option-label {
  font-size: var(--font-size-sm);
}

.priority-option.priority-high {
  background-color: rgba(226, 68, 92, 0.1);
  color: var(--color-priority-critical);
}

.priority-option.priority-medium {
  background-color: rgba(255, 203, 0, 0.1);
  color: var(--color-priority-medium);
}

.priority-option.priority-low {
  background-color: rgba(87, 155, 252, 0.1);
  color: var(--color-priority-low);
}

.priority-option.priority-null {
  background-color: var(--color-extra-light-gray);
  color: var(--color-dark-gray);
}
</style>
