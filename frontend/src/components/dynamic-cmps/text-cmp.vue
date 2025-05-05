<template>
  <section class="dynamic-text">
    <div v-if="!isEditing" @click="startEditing" class="h-full w-full flex items-center">
      <p class="truncate text-neutral-black text-sm">{{ task.text || 'Click to add text' }}</p>
    </div>
    
    <div v-else class="w-full h-full flex items-center">
      <input
        ref="textInput"
        v-model="editedText"
        type="text"
        class="dynamic-text-input"
        placeholder="Add text"
        @blur="saveText"
        @keyup.enter="saveText"
        @keyup.esc="cancelEdit"
      />
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
      isEditing: false,
      editedText: '',
    }
  },
  methods: {
    startEditing() {
      this.editedText = this.task.text || '';
      this.isEditing = true;
      
      this.$nextTick(() => {
        this.$refs.textInput.focus();
      });
    },
    saveText() {
      if (this.task.text === this.editedText) {
        this.isEditing = false;
        return;
      }
      
      this.isEditing = false;
      
      this.$emit('changeText', {
        taskId: this.task.id,
        groupId: this.groupId,
        text: this.editedText
      });
    },
    cancelEdit() {
      this.isEditing = false;
    }
  }
}
</script>

<style scoped>
/* All styling moved to common.css */
</style>
