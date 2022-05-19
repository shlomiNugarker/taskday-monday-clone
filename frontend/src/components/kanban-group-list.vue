<template>
  <section class="kanban-group-list">
    <Container
      class="groups-container-kanban"
      @drop="onDrop"
      :orientation="'horizontal'"
    >
      <Draggable v-for="group in groups" :key="group.id">
        <div class="group-kanban" :style="{ 'background-color': group.color }">
          <p class="title">
            {{ group.title }}
          </p>
          <kanban-task-list
            :tasks="group.tasks"
            :groupId="group.id"
            :boardId="boardId"
            :group="group"
          />
        </div>
      </Draggable>
    </Container>
  </section>
</template>

<script>
import { Container, Draggable } from 'vue3-smooth-dnd'
import kanbanTaskList from './kanban-task-list.vue'
export default {
  props: {
    groups: {
      type: Array,
    },
    boardId: String,
  },
  name: 'kanban',
  data() {
    return {
      copyGroups: JSON.parse(JSON.stringify(this.groups)),
    }
  },
  computed: {},
  created() {},
  unmount() {},
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
  },

  watch: {
    '$store.getters.currBoard'() {
      var currBoard = this.$store.getters.currBoard
      this.copyGroups = JSON.parse(JSON.stringify(currBoard.groups))
    },
  },
  components: {
    Container,
    Draggable,
    kanbanTaskList,
  },
}
</script>

<style></style>
