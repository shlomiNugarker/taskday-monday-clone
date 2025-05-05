<template>
  <section 
    class="w-full h-full flex items-center justify-center rounded-md transition-all duration-200 hover:bg-gray-100 cursor-pointer" 
    @click="add"
  >
    <div v-if="!isAdd" class="w-full px-2 py-1.5 flex items-center">
      <div v-if="!text" class="flex items-center text-gray-400 gap-1.5">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
        </svg>
        <span class="text-sm">Add text</span>
      </div>
      <div v-else class="text-gray-700 text-sm truncate">{{ text }}</div>
    </div>
    
    <div v-if="isAdd" class="w-full p-0.5 relative">
      <input 
        ref="input" 
        v-model="text" 
        type="text" 
        placeholder="Enter text..."
        @focusout="out(text)" 
        @keydown.enter="out(text)"
        @keydown.esc="cancelEdit"
        class="w-full bg-white border border-blue-400 rounded-md px-2 py-1 outline-none text-sm text-gray-700 focus:shadow-sm"
      />
      
      <div class="absolute top-1 right-2 flex space-x-1">
        <button 
          v-if="text && text !== originalText"
          @click.stop="out(text)" 
          class="text-green-500 hover:text-green-600"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
          </svg>
        </button>
        <button 
          @click.stop="cancelEdit" 
          class="text-red-500 hover:text-red-600"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </button>
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
  name: 'text-editor',
  data() {
    return {
      text: this.task.text || '',
      originalText: this.task.text || '',
      isAdd: false,
    }
  },
  watch: {
    'task.text': function(newText) {
      this.text = newText || '';
      this.originalText = newText || '';
    }
  },
  methods: {
    add() {
      if (this.isAdd) return;
      
      this.isAdd = true;
      this.originalText = this.text;
      setTimeout(() => {
        if (this.$refs.input) {
          this.$refs.input.focus();
          this.$refs.input.select();
        }
      }, 10);
    },
    out(text) {
      if (!this.isAdd) return;
      
      this.isAdd = false;
      
      if (text !== this.originalText) {
        this.changeText();
      }
    },
    cancelEdit() {
      this.text = this.originalText;
      this.isAdd = false;
    },
    changeText() {
      this.$emit('changeText', {
        groupId: this.groupId,
        taskId: this.task.id,
        text: this.text,
        boardId: this.boardId
      });
    },
  }
}
</script>
