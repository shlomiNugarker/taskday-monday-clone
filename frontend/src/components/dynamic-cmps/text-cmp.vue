<template>
  <section class="dynamic-component">
    <div class="dynamic-text-component" @click="onEdit">
      <p 
        v-if="!isEdit" 
        class="dynamic-text truncate text-gray-600"
        :title="task.text || '-'"
      >
        {{ task.text || '-' }}
      </p>
      
      <input
        ref="input"
        type="text"
        v-if="isEdit"
        v-model="text"
        @focusout="saveText"
        @keyup.enter="saveText"
        @keyup.esc="cancelEdit"
        class="dynamic-text-input"
        placeholder="Add text"
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
  name: 'text-cmp',
  data() {
    return {
      isEdit: false,
      text: this.task.text || ''
    }
  },
  methods: {
    onEdit() {
      this.isEdit = true
      this.$nextTick(() => {
        if (this.$refs.input) {
          this.$refs.input.focus()
          this.$refs.input.select()
        }
      })
    },
    
    saveText() {
      const newText = this.text.trim()
      this.isEdit = false
      
      if (newText === this.task.text) return
      
      this.$emit('changeText', {
        groupId: this.groupId,
        taskId: this.task.id,
        text: newText
      })
    },
    
    cancelEdit() {
      this.text = this.task.text || ''
      this.isEdit = false
    }
  },
  watch: {
    'task.text': {
      handler(newVal) {
        this.text = newVal || ''
      }
    }
  }
}
</script>

<style scoped>
/* Styles are imported from dynamic-components.css */
</style>
