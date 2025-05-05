<template>
  <div class="mt-2">
    <input
      type="text"
      placeholder="+ Add task"
      ref="input"
      v-model="newTaskTitle"
      @keyup.enter="addTask(group.id)"
      class="w-full p-2 text-sm border border-gray-200 rounded focus:outline-none focus:border-blue-500 bg-white"
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