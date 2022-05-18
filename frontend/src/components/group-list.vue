<template>
  <div>
    <Container class="container-groups" @drop="onDrop" orientation="vertical">
      <Draggable v-for="group in groups" :key="group.id">
        <!-- <div> -->
        <columns-header
          class="group-list"
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
        <!-- </div> -->
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
      // const result = items;
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
      // this.groups = this.applyDrag(this.groups, dropResult)

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

      // console.log(groupToEdit)

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
  transform: rotate(2deg);
}
</style>
