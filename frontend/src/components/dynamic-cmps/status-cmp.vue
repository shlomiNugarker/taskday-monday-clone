<template>
  <section 
    class="dynamic-component"
  >
    <div 
      class="dynamic-status w-full cursor-pointer" 
      :style="{ backgroundColor: statusStyle }"
      @click.stop="openModal"
    >
      <div v-if="isDone" class="mr-1 flex items-center">
        <svg class="w-4 h-4 text-white" :class="{ 'animate-bounce': isPlay }" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
      </div>
      <div v-else-if="task.status === 'Stuck'" class="mr-1 flex items-center">
        <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
        </svg>
      </div>
      <div v-else-if="task.status === 'Working on it'" class="mr-1 flex items-center">
        <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
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
        @click.stop="changeStatus(opt.status)"
      >
        <div class="flex items-center justify-center w-full">
          <!-- Status icons -->
          <div v-if="opt.status === 'Done'" class="mr-2 flex items-center">
            <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <div v-else-if="opt.status === 'Stuck'" class="mr-2 flex items-center">
            <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
            </svg>
          </div>
          <div v-else-if="opt.status === 'Working on it'" class="mr-2 flex items-center">
            <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
          </div>
          {{ opt.status }}
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
  name: 'status-cmp',
  data() {
    return {
      opts: [
        { status: 'Stuck', color: 'var(--color-status-stuck)' },
        { status: 'Working on it', color: 'var(--color-status-working)' },
        { status: 'Done', color: 'var(--color-status-done)' },
        { status: '-', color: 'var(--color-status-default)' },
      ],
      isPlay: false,
      showDropdown: false
    }
  },
  computed: {
    statusStyle() {
      if (this.task.status === 'Stuck') return 'var(--color-status-stuck)'
      else if (this.task.status === 'Working on it') return 'var(--color-status-working)'
      else if (this.task.status === 'Done') return 'var(--color-status-done)'
      return 'var(--color-status-default)'
    },
    isDone() {
      return this.task.status === 'Done'
    },
  },
  created() {
    // Add global click listener
    window.addEventListener('click', this.handleOutsideClick)
  },
  beforeUnmount() {
    // Remove global click listener
    window.removeEventListener('click', this.handleOutsideClick)
  },
  methods: {
    openModal(event) {
      event.stopPropagation()
      this.showDropdown = !this.showDropdown
    },
    handleOutsideClick(event) {
      // Close dropdown if clicked outside component
      const isClickInside = this.$el.contains(event.target)
      if (!isClickInside && this.showDropdown) {
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
  }
}
</script>

<style scoped>
.dynamic-status {
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  transition: all var(--transition-normal) ease;
  position: relative;
  z-index: 1;
}

.dynamic-status:hover {
  filter: brightness(1.05);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
}

.dynamic-status-options {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 4px;
  width: 180px;
  background: white;
  box-shadow: var(--shadow-medium);
  border-radius: var(--radius-md);
  z-index: 999;
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

.dynamic-status-option {
  margin-bottom: 1px;
  padding: var(--spacing-sm) var(--spacing-base);
  cursor: pointer;
}

.dynamic-status-option:hover {
  filter: brightness(1.1);
}
</style>

