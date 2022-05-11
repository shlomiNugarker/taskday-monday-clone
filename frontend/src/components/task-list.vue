<template>
  <section class="task-list">
    <Container @drop="onDrop($event)">
      <Draggable v-for="task in tasksToShow" :key="task.id" :task="task">
        <task-preview
          :task="task"
          :groupId="groupId"
          :boardId="boardId"
          :group="group"
        />
      </Draggable>
    </Container>
  </section>
</template>

<script>
import { Container, Draggable } from 'vue3-smooth-dnd'
import taskPreview from './task-preview.vue'
export default {
  props: {
    tasks: {
      type: Array,
    },
    group: {
      type: Object,
    },
    boardId: String,
    groupId: String,
  },
  name: 'task-list-cmp',
  data() {
    return {
      copyTasks: JSON.parse(JSON.stringify(this.tasks)),
      copyGroup: JSON.parse(JSON.stringify(this.group)),
    }
  },
  computed: {
    tasksToShow() {
      const filterBy = this.$store.getters.currFilterBy
      // const sortBy = this.$store.getters.currSortBy
      return this.tasks.filter((task) => {
        const regex = new RegExp(filterBy.txt, 'i')
        return regex.test(this.group.title) || regex.test(task.title)
      })
    },
  },
  watch: {
    copyGroup(newVal, oldVal) {
      console.log('task')
    },
  },
  created() {},
  methods: {
    applyDrag(tasks, dragResult) {
      const { removedIndex, addedIndex, payload } = dragResult
      if (removedIndex === null && addedIndex === null) return tasks
      let itemToAdd = payload
      if (removedIndex !== null) {
        itemToAdd = tasks.splice(removedIndex, 1)[0]
      }
      if (addedIndex !== null) {
        tasks.splice(addedIndex, 0, itemToAdd)
      }
      return tasks
    },
    onDrop(dropResult) {
      this.copyTasks = this.applyDrag(this.copyTasks, dropResult)
      this.copyGroup.tasks = this.copyTasks

      const group = JSON.parse(JSON.stringify(this.copyGroup))

      this.$store.dispatch({
        type: 'UpdateBoardDragDrop',
        group,
        groupId: this.groupId,
      })
    },
  },
  components: {
    taskPreview,
    Container,
    Draggable,
  },
}
</script>
<style></style>
