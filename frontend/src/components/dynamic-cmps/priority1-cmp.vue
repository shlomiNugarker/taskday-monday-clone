<template>
  <section class="dynamic-component" @click="openModal">
    <div class="dynamic-priority">
      <span 
        v-if="task.priority && task.priority !== '-'" 
        class="dynamic-badge"
        :class="priorityClass"
      >
        {{ task.priority || '-' }}
      </span>
      <span v-else class="text-gray-400">-</span>
    </div>
    
    <!-- Priority Dropdown -->
    <Transition name="fade">
      <div 
        v-if="showDropdown"
        class="dynamic-priority-options"
        @click.stop
      >
        <div 
          class="dynamic-priority-option"
          @click="changePriority('Critical')"
        >
          <span class="mr-2 px-2 py-0.5 rounded-full bg-red-100 text-red-700 text-xs">Critical</span>
        </div>
        
        <div 
          class="dynamic-priority-option"
          @click="changePriority('High')"
        >
          <span class="mr-2 px-2 py-0.5 rounded-full bg-orange-100 text-orange-700 text-xs">High</span>
        </div>
        
        <div 
          class="dynamic-priority-option"
          @click="changePriority('Medium')"
        >
          <span class="mr-2 px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700 text-xs">Medium</span>
        </div>
        
        <div 
          class="dynamic-priority-option"
          @click="changePriority('Low')"
        >
          <span class="mr-2 px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-xs">Low</span>
        </div>
        
        <div 
          class="dynamic-priority-option border-t border-gray-100"
          @click="changePriority('-')"
        >
          <span class="mr-2 text-gray-400">Clear</span>
        </div>
      </div>
    </Transition>
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
  name: 'priority1-cmp',
  data() {
    return {
      showDropdown: false
    }
  },
  computed: {
    priorityClass() {
      if (this.task.priority === 'Critical') return 'bg-red-100 text-red-700'
      if (this.task.priority === 'High') return 'bg-orange-100 text-orange-700'
      if (this.task.priority === 'Medium') return 'bg-yellow-100 text-yellow-700'
      if (this.task.priority === 'Low') return 'bg-blue-100 text-blue-700'
      return 'bg-gray-100 text-gray-700'
    }
  },
  mounted() {
    document.addEventListener('click', this.closeDropdown)
  },
  beforeUnmount() {
    document.removeEventListener('click', this.closeDropdown)
  },
  methods: {
    openModal() {
      this.showDropdown = !this.showDropdown
    },
    closeDropdown(event) {
      if (this.showDropdown && !event.target.closest('.dynamic-priority')) {
        this.showDropdown = false
      }
    },
    changePriority(priority) {
      this.showDropdown = false
      
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
/* Styles are imported from dynamic-components.css */
</style>
