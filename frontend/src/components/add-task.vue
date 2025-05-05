<template>
  <section class="mx-2 my-3">
    <div 
      class="flex items-center rounded-md border border-gray-200 hover:border-gray-300 bg-white shadow-sm transition-all duration-200 overflow-hidden"
      :class="{ 'ring-2 ring-blue-300': isAdd }"
    >
      <!-- Colored bar indicating group color -->
      <div class="w-1.5 h-full" :style="{ 'background-color': group.color || group.style?.color }"></div>
      
      <!-- Input area -->
      <div class="flex-1 flex items-center min-h-[48px] px-2">
        <div class="w-full flex items-center">
          <input
            ref="input"
            v-model="newTaskTitle"
            type="text"
            :placeholder="isAdd ? 'Enter task title...' : '+ Add Task'"
            @focus="isAdd = true"
            @focusout="focusOut"
            @keyup.enter="addTask"
            @keyup.esc="cancelAdd"
            class="w-full text-sm py-2 border-none bg-transparent focus:outline-none"
          />
        </div>
      </div>
      
      <!-- Action buttons -->
      <div v-if="isAdd" class="flex items-center pr-2 space-x-2">
        <button 
          @click.stop="cancelAdd" 
          class="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100 transition-colors duration-200 focus:outline-none"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <button 
          @click.stop="addTask" 
          class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-1"
          :disabled="!newTaskTitle.trim()"
        >
          Add
        </button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    group: {
      type: Object,
      required: true
    },
  },
  name: 'add-task',
  data() {
    return {
      isAdd: false,
      newTaskTitle: '',
    }
  },
  methods: {
    focusOut() {
      // Don't immediately clear - allow button clicks to register first
      setTimeout(() => {
        if (!this.$el.contains(document.activeElement)) {
          this.isAdd = false;
        }
      }, 200);
    },
    focusIn() {
      this.isAdd = true;
      setTimeout(() => {
        if (this.$refs.input) {
          this.$refs.input.focus();
        }
      }, 10);
    },
    cancelAdd() {
      this.isAdd = false;
      this.newTaskTitle = '';
    },
    addTask() {
      if (!this.newTaskTitle.trim()) return;
      
      const groupId = this.group.id;
      const newTaskTitle = this.newTaskTitle.trim();
      
      this.$emit('addTask', { newTaskTitle, groupId });
      this.newTaskTitle = '';
      
      // Keep focus on input to allow adding multiple tasks
      setTimeout(() => {
        if (this.$refs.input) {
          this.$refs.input.focus();
        }
      }, 10);
    },
  }
}
</script>

<style scoped>
button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
</style>