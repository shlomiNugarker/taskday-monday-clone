<template>
  <section class="p-4">
    <Container
      group-name="groups"
      orientation="horizontal"
      :drag-class="'drag-group-in-progress'"
      :drop-placeholder="{
        className: 'group-ghost',
        animationDuration: '150',
        showOnTop: false
      }"
      :get-child-payload="getGroupPayload"
      @drop="onDrop"
      class="flex flex-wrap gap-5"
    >
      <Draggable v-for="(group, idx) in groups" :key="group.id">
        <div 
          class="min-w-[250px] h-min bg-[#f5f6f8] rounded-xl pb-3 shadow-board hover:shadow-lg transition-all duration-300"
        >
          <div 
            class="p-4 flex items-center justify-between border-b border-[#e0e3e7] cursor-move"
            :style="{ backgroundColor: group.style.color }"
          >
            <h2 class="text-lg font-medium text-white truncate">
              {{ group.title }}
            </h2>
            <span class="bg-white/30 text-white px-2 py-1 rounded-full text-xs font-medium">
              {{ group.tasks.length }}
            </span>
          </div>
          
          <div class="px-3 py-2">
            <ul>
              <kanban-task-list :tasks="group.tasks" :groupId="group.id" />
            </ul>
          </div>
          
          <div class="px-3">
            <button 
              class="w-full py-2 bg-white rounded-lg border border-[#e0e3e7] text-[#676879] text-sm flex items-center justify-center hover:text-[#0073ea] hover:border-[#0073ea] transition-colors duration-200"
              @click="addTask(group.id)"
            >
              <font-awesome-icon icon="plus" class="mr-1" />
              Add Task
            </button>
          </div>
        </div>
      </Draggable>
    </Container>
    
    <!-- Add Group Button -->
    <div class="min-w-[250px] h-fit mt-5">
      <button 
        class="w-full h-[120px] bg-white/50 backdrop-blur-sm rounded-xl border-2 border-dashed border-[#c3c6d4] flex flex-col items-center justify-center text-[#676879] hover:text-[#0073ea] hover:border-[#0073ea] hover:bg-white/70 transition-all duration-300 hover:shadow-md"
        @click="addGroup"
      >
        <font-awesome-icon icon="plus-circle" class="text-2xl mb-2" />
        <span class="text-sm font-medium">Add Group</span>
      </button>
    </div>
  </section>
</template>

<script>
import kanbanTaskList from './kanban-task-list.vue'
import { Container, Draggable } from 'vue3-smooth-dnd'
import { utilService } from '../services/util.service'

export default {
  name: 'kanban-group-list',
  props: {
    boardId: String,
    groups: Array,
  },
  data() {
    return {
      taskDragged: null
    }
  },
  computed: {},
  watch: {},
  created() {},
  methods: {
    getGroupPayload(index) {
      return this.groups[index]
    },
    onDrop(dropResult) {
      const { removedIndex, addedIndex, payload } = dropResult
      
      if (removedIndex !== null || addedIndex !== null) {
        const updatedGroups = [...this.groups]
        let itemToAdd = payload
        
        if (removedIndex !== null) {
          itemToAdd = updatedGroups.splice(removedIndex, 1)[0]
        }
        
        if (addedIndex !== null) {
          updatedGroups.splice(addedIndex, 0, itemToAdd)
          
          this.$store.dispatch({
            type: 'updateGroupsOrder',
            groups: updatedGroups,
            boardId: this.boardId
          })
        }
      }
    },
    addTask(groupId) {
      this.$store.dispatch({ type: 'toggleAddTaskModal', groupId })
    },
    addGroup() {
      const boardId = this.$store.getters.currBoard._id
      
      const newGroup = {
        id: utilService.makeId(),
        title: 'New Group',
        style: {
          color: utilService.getRandomColor()
        },
        tasks: []
      }
      
      this.$store.dispatch({ 
        type: 'addGroup', 
        boardId,
        group: newGroup
      })
    }
  },
  components: {
    kanbanTaskList,
    Container,
    Draggable
  },
}
</script>

<style>
.group-ghost {
  opacity: 0.5;
  background: #f0f3ff;
  border: 1px dashed #0073ea;
  min-width: 250px;
  margin: 0 10px;
}

.drag-group-in-progress {
  opacity: 0.7;
  transform: scale(0.95);
  border: 1px solid #0073ea;
}
</style>
