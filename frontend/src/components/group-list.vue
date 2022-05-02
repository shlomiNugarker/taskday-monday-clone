<template>
  <div class="container-groups">
    <div class="group-list" v-for="group in groups" :key="group.id">
      <columns-header
        :group="group"
        @changeGroupTitle="changeGroupTitle"
        @removeGroup="removeGroup"
      />
      <task-list
        :tasks="group.tasks"
        :groupId="group.id"
        :boardId="boardId"
        :group="group"
      />

      <add-task :group="group" @addTask="addTask" />
    </div>
  </div>
</template>

<script>
import taskList from './task-list.vue'
import columnsHeader from './columns-header.vue'
import addTask from './add-task.vue'

export default {
  props: {
    groups: {
      type: Array,
    },
    boardId: String,
  },
  name: 'group-list-cmp',
  data() {
    return {
      waitToUpdate: false,
    }
  },
  computed: {},
  watch: {},
  created() {},
  methods: {
    changeGroupTitle({ title, groupId }) {
      if (this.waitToUpdate) return
      this.waitToUpdate = true
      const idx = this.groups.findIndex((group) => {
        return group.id === groupId
      })

      const groupToEdit = JSON.parse(JSON.stringify(this.groups[idx]))
      groupToEdit.title = title

      console.log(groupToEdit)

      this.$store.dispatch({
        type: 'updateGroup',
        groupToEdit,
        idx: idx,
      })
      setTimeout(() => (this.waitToUpdate = false), 2000)
    },
    addTask({ newTaskTitle, groupId }) {
      this.$store.dispatch({ type: 'addTask', newTaskTitle, groupId })
    },
    removeGroup(groupId) {
      this.$store.dispatch({ type: 'removeGroup', groupId })
    },
  },
  components: {
    taskList,
    columnsHeader,
    addTask,
  },
}
</script>
<style></style>
