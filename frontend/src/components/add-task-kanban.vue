<template>
  <div class="input-container">
    <input
      type="text"
      placeholder="+ Add task"
      ref="input"
      v-model="newTaskTitle"
      @keyup.enter="addTask(group.id)"
    />
  </div>
</template>

<script>
export default {
  props: {
    group: {
      type: Object,
    },
  },
  name: 'add-task',
  data() {
    return {
      newTaskTitle: '',
      currGroup: JSON.parse(JSON.stringify(this.group)),
    }
  },
  computed: {},
  watch: {},
  created() {},
  methods: {
    addTask() {
      if (!this.newTaskTitle) return
      const groupId = this.group.id
      const newTaskTitle = this.newTaskTitle
      this.newTaskTitle = ''
      this.$emit('addTask', { newTaskTitle, groupId })
    },
  },
  components: {},
}
</script>
