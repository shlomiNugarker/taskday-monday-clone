<template>
  <section class="w-full">
    <Container
      group-name="tasksForDrop"
      :get-child-payload="getItemPayload(group)"
      @drop="onDrop($event, 'tasksForDrop')"
      :non-drag-area-selector="'.none-drag-input'"
      :drag-class="'shadow-lg z-50 opacity-90'"
      orientation="vertical"
      :drop-placeholder="{
        className: 'border-2 border-dashed border-blue-300 rounded-md my-2 bg-blue-50 bg-opacity-30',
        animationDuration: '200',
        showOnTop: false
      }"
    >
      <Draggable 
        v-for="(task, index) in tasksToShow" 
        :key="task.id"
        class="task-item mb-2 last:mb-0"
      >
        <task-preview
          :task="task"
          :groupId="groupId"
          :boardId="boardId"
          :group="group"
          @changeTitle="changeTitle"
          @changeStatus="changeStatus"
          @removeAssignedMember="removeAssignedMember"
          @addAssignedMember="addAssignedMember"
          @changePriority="changePriority"
          @changeTimeline="changeTimeline"
          @changeText="changeText"
          @duplicateTask="duplicateTask"
          @deleteTask="deleteTask"
        />
      </Draggable>
      <div v-if="!tasksToShow.length" class="py-6 px-4 text-center">
        <p class="text-gray-500 text-sm">No tasks in this group. Add one below.</p>
      </div>
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
      required: true
    },
    group: {
      type: Object,
      required: true
    },
    boardId: {
      type: String,
      required: true
    },
    groupId: {
      type: String,
      required: true
    },
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
    changeTitle(updateObj) {
      this.$store.dispatch({ 
        type: 'updateTask', 
        updateType: 'title',
        groupId: updateObj.groupId,
        taskId: updateObj.taskId,
        data: updateObj.title
      })
    },
    changeStatus(updateObj) {
      this.$store.dispatch({ 
        type: 'updateTask', 
        updateType: 'status',
        groupId: updateObj.groupId,
        taskId: updateObj.taskId,
        data: updateObj.status
      })
    },
    removeAssignedMember(updateObj) {
      this.$store.dispatch({ 
        type: 'updateTask', 
        updateType: 'removeMember',
        groupId: updateObj.groupId,
        taskId: updateObj.taskId,
        data: updateObj.memberId
      })
    },
    addAssignedMember(updateObj) {
      this.$store.dispatch({ 
        type: 'updateTask', 
        updateType: 'addMember',
        groupId: updateObj.groupId,
        taskId: updateObj.taskId,
        data: updateObj.person
      })
    },
    changePriority(updateObj) {
      this.$store.dispatch({ 
        type: 'updateTask', 
        updateType: 'priority',
        groupId: updateObj.groupId,
        taskId: updateObj.taskId,
        data: updateObj.priority
      })
    },
    changeTimeline(updateObj) {
      this.$store.dispatch({ 
        type: 'updateTask', 
        updateType: 'timeline',
        groupId: updateObj.groupId,
        taskId: updateObj.taskId,
        data: updateObj.dates
      })
    },
    changeText(updateObj) {
      this.$store.dispatch({ 
        type: 'updateTask', 
        updateType: 'text',
        groupId: updateObj.groupId,
        taskId: updateObj.taskId,
        data: updateObj.text
      })
    },
    duplicateTask(updateObj) {
      this.$store.dispatch({ 
        type: 'duplicateTask',
        groupId: updateObj.groupId,
        task: updateObj.task
      })
    },
    deleteTask(updateObj) {
      this.$store.dispatch({ 
        type: 'removeTask',
        groupId: updateObj.groupId,
        taskId: updateObj.taskId
      })
    }
  },
  components: {
    taskPreview,
    Container,
    Draggable,
  },
}
</script>

<style scoped>
/* Transitions for task items */
.task-item {
  transition: all 0.2s ease-in-out;
}

/* Necessary styles for smooth-dnd */
:deep(.smooth-dnd-container.horizontal) {
  display: flex !important;
}

:deep(.smooth-dnd-draggable-wrapper) {
  transition: transform 0.2s ease;
}
</style>
