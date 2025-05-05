<template>
  <div class="group-list-container">
    <Container
      class="relative"
      @drop="onDrop($event)"
      orientation="vertical"
      :drag-begin-delay="200"
      :drag-class="'shadow-lg z-50 group-drag-item'"
      :drop-placeholder="{
        className: 'group-drop-placeholder',
        animationDuration: '150',
        showOnTop: false
      }"
      @click="groupClicked"
    >
      <Draggable
        class="group-item mb-8"
        v-for="group in groups"
        :key="group.id"
        :drag-begin-delay="200"
      >
        <columns-header
          class="relative"
          :group="group"
          @changeGroupTitle="changeGroupTitle"
          @removeGroup="removeGroup"
          @duplicateGroup="duplicateGroup"
          @toggleGroupCollapse="toggleGroupCollapse"
          @sortGroup="sortGroup"
          @openColorPicker="openColorPicker"
        />
        <task-list
          :tasks="group.tasks"
          :groupId="group.id"
          :boardId="boardId"
          :group="group"
          @update="updateTask"
          @removeTask="removeTask"
          @duplicateTask="duplicateTask"
          @addComment="addComment"
        />

        <add-task :group="group" @addTask="addTask" />
      </Draggable>
    </Container>
  </div>
</template>

<script>
import { Container, Draggable } from 'vue3-smooth-dnd'
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
      copyGroups: JSON.parse(JSON.stringify(this.groups)),
    }
  },
  computed: {},
  watch: {
    '$store.getters.currBoard'() {
      var currBoard = this.$store.getters.currBoard
      this.copyGroups = JSON.parse(JSON.stringify(currBoard.groups))
    },
  },
  created() {},
  methods: {
    applyDrag(items, dragResult) {
      const { removedIndex, addedIndex, payload } = dragResult
      if (removedIndex === null && addedIndex === null) return items

      let itemToAdd = payload
      if (removedIndex !== null) {
        itemToAdd = items.splice(removedIndex, 1)[0]
      }
      if (addedIndex !== null) {
        items.splice(addedIndex, 0, itemToAdd)
      }
      return items
    },
    onDrop(dropResult) {
      this.copyGroups = this.applyDrag(this.copyGroups, dropResult)

      this.$store.dispatch({
        type: 'updateGroupsDragDrop',
        groups: this.copyGroups,
      })
    },
    changeGroupTitle({ title, groupId }) {
      if (this.waitToUpdate) return
      this.waitToUpdate = true
      const idx = this.groups.findIndex((group) => {
        return group.id === groupId
      })

      const groupToEdit = JSON.parse(JSON.stringify(this.groups[idx]))
      groupToEdit.title = title

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
    duplicateGroup(groupId) {
      this.$store.dispatch({ type: 'duplicateGroup', groupId })
    },
    updateTask(payload) {
      this.$store.dispatch({ type: 'updateTask', ...payload })
    },
    removeTask(payload) {
      this.$store.dispatch({ type: 'removeTask', ...payload })
    },
    duplicateTask(payload) {
      this.$store.dispatch({ type: 'duplicateTask', ...payload })
    },
    addComment(payload) {
      this.$store.dispatch({ type: 'openTaskDetails', ...payload })
    },
    toggleGroupCollapse(payload) {
      // Handle group collapse toggling
      console.log('Toggle group collapse', payload)
    },
    sortGroup(payload) {
      // Handle group sorting
      console.log('Sort group', payload)
    },
    openColorPicker(groupId) {
      // Handle color picker opening
      console.log('Open color picker for group', groupId)
    },
    groupClicked() {
      console.log('group clicked')
    },
  },
  components: {
    taskList,
    columnsHeader,
    addTask,
    Container,
    Draggable,
  },
}
</script>

<style scoped>
.group-list-container {
  padding-bottom: var(--spacing-xl);
}

.group-item {
  transition: all var(--transition-normal) ease;
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.group-drag-item {
  opacity: 0.8;
  transform: scale(0.98);
  background-color: white;
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-large);
}

.group-drop-placeholder {
  border: 2px dashed var(--color-light-gray);
  background-color: rgba(240, 240, 240, 0.4);
  margin: var(--spacing-md) 0;
  border-radius: var(--radius-lg);
  height: 70px;
  transition: all var(--transition-fast) ease;
}
</style>