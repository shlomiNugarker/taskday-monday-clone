<template>
  <section class="task-list">
    <Container
      group-name="tasksForDrop"
      :get-child-payload="getItemPayload(group)"
      @drop="onDrop($event, 'tasksForDrop')"
      :non-drag-area-selector="'.none-drag-input'"
      :drag-class="'isInDrag'"
      orientation="vertical"
    >
      <Draggable v-for="task in tasksToShow" :key="task.id">
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
      copyTasks: null,
      copyGroup: null,
    }
  },
  computed: {
    tasksToShow() {
      const sortBy = this.$store.getters.currSortBy
      const filterBy = this.$store.getters.currFilterBy
      const regex = new RegExp(filterBy.txt, 'i')
      return this.tasks
        .filter((task) => {
          return (
            (regex.test(this.group.title) || regex.test(task.title)) &&
            task.status.includes(filterBy.statusTxt) &&
            task.priority.includes(filterBy.priorityTxt) &&
            (!filterBy.personId
              ? true
              : task.person.some((member) =>
                  member._id.includes(filterBy.personId)
                ))
          )
        })
        .sort((i1, i2) => {
          var sortIndicator
          switch (sortBy.type) {
            case 'status':
              sortIndicator = i1.status > i2.status
              break
            case 'priority':
              sortIndicator = i1.priority < i2.priority
              break
            case 'date':
              sortIndicator = i1.createdAt > i2.createdAt

              break
            case 'timeline':
              sortIndicator = i1.timeline.startDate > i2.timeline.startDate
              break

            case 'title':
              sortIndicator = i1.title > i2.title
              break
            case 'person':
              const firstPersonI1 = [...i1.person].sort(
                (p1, p2) => p1.fullname > p2.fullname
              )[0]
              const firstPersonI2 = [...i2.person].sort(
                (p1, p2) => p1.fullname > p2.fullname
              )[0]
              if (!firstPersonI1 || !firstPersonI2)
                sortIndicator = !!firstPersonI1
              else
                sortIndicator = firstPersonI1.fullname > firstPersonI2.fullname
              break
            default:
              return 0
              break
          }
          if (sortIndicator) return sortBy.direction
          else return sortBy.direction * -1
        })
    },
  },
  watch: {
    '$store.getters.currBoard'() {
      var currBoard = this.$store.getters.currBoard
      var groupIdx = currBoard.groups.findIndex(
        (currGroup) => currGroup.id === this.groupId
      )
      if (groupIdx === -1) return
      this.copyTasks = JSON.parse(
        JSON.stringify(currBoard.groups[groupIdx]?.tasks)
      )
      this.copyGroup = JSON.parse(JSON.stringify(currBoard.groups[groupIdx]))
    },
  },
  created() {
    this.copyTasks = JSON.parse(JSON.stringify(this.tasks))
    this.copyGroup = JSON.parse(JSON.stringify(this.group))
  },
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

      this.$store.dispatch({
        type: 'updateTaskDragDrop',
        group: this.copyGroup,
      })
    },
    getItemPayload(group) {
      return (index) => this.copyGroup.tasks[index]
    },
  },
  components: {
    taskPreview,
    Container,
    Draggable,
  },
}
</script>
<style>
.ooo {
  /* background-color: rgba(228, 225, 225,0.5); */
  border: 1px gray dashed;
  z-index: -20;
  margin: 5px;
}
.isInDrag {
  z-index: 55555555;
  transform: rotate(1deg);
}
.smooth-dnd-container.horizontal {
  display: flex !important;
}
</style>
