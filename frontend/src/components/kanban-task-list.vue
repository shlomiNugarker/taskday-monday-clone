<template>
  <div class="mb-2">
    <Container
      group-name="tasks"
      orientation="vertical"
      :drag-class="'drag-in-progress'"
      :drop-placeholder="{
        className: 'ghost-card',
        animationDuration: '150',
        showOnTop: false
      }"
      :get-child-payload="getTaskPayload"
      @drop="onDrop"
      class="min-h-[50px] rounded-md"
    >
      <Draggable v-for="(task, index) in tasks" :key="task.id">
        <div class="task-wrapper mb-2">
          <div class="group relative">
            <div class="absolute -left-1 top-1/2 transform -translate-y-1/2 text-[#c3c6d4] opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-move">
              <font-awesome-icon icon="grip-lines" />
            </div>
            <task-preview-kanban :task="task" />
          </div>
        </div>
      </Draggable>
    </Container>
    
    <transition name="fade">
      <div v-if="isAddTask" class="mb-3 animate-fade-in">
        <div class="bg-white rounded-lg shadow-task p-3 border border-[#e0e3e7]">
          <input
            type="text"
            v-model="newTaskTitle"
            placeholder="Enter task title..."
            class="w-full p-2 border border-[#e0e3e7] rounded-md mb-2 focus:outline-none focus:border-[#0073ea] focus:ring-2 focus:ring-[#0073ea]/20 transition-all duration-200"
            @keyup.enter="addTask"
          />
          <div class="flex items-center justify-between">
            <button 
              class="px-3 py-1 bg-gray-100 text-[#676879] rounded-md text-sm hover:bg-gray-200 transition-colors duration-200"
              @click="cancelAddTask"
            >
              Cancel
            </button>
            <button 
              class="px-3 py-1 bg-[#0073ea] text-white rounded-md text-sm hover:bg-[#0060d9] transition-colors duration-200"
              @click="addTask"
            >
              Add Task
            </button>
          </div>
        </div>
      </div>
    </transition>
    
    <div v-if="!isAddTask && !tasks.length" class="flex flex-col items-center justify-center p-4 text-center rounded-lg bg-white/50 border border-dashed border-[#c3c6d4] mb-3">
      <font-awesome-icon icon="clipboard-list" class="text-xl text-[#c3c6d4] mb-2" />
      <p class="text-sm text-[#676879]">No tasks in this group</p>
    </div>
  </div>
</template>

<script>
import taskPreviewKanban from './task-preview-kanban.vue'
import { Container, Draggable } from 'vue3-smooth-dnd'
import { utilService } from '../services/util.service'

export default {
  name: 'kanban-task-list',
  props: {
    tasks: {
      type: Array,
    },
    groupId: String,
  },
  data() {
    return {
      isAddTask: false,
      newTaskTitle: '',
    }
  },
  computed: {
    currBoard() {
      return this.$store.getters.currBoard
    },
  },
  methods: {
    getTaskPayload(index) {
      return this.tasks[index]
    },
    onDrop(dropResult) {
      const { removedIndex, addedIndex, payload } = dropResult
      
      if (removedIndex !== null || addedIndex !== null) {
        const updatedTasks = [...this.tasks]
        let itemToAdd = payload
        
        if (removedIndex !== null) {
          itemToAdd = updatedTasks.splice(removedIndex, 1)[0]
        }
        
        if (addedIndex !== null) {
          updatedTasks.splice(addedIndex, 0, itemToAdd)
          
          // אם המשימה הועברה מקבוצה אחרת
          if (itemToAdd.groupId !== this.groupId) {
            this.$store.dispatch({
              type: 'moveTaskBetweenGroups',
              task: itemToAdd,
              toGroupId: this.groupId,
              atIdx: addedIndex,
            })
          } else {
            // אם המשימה הוזזה בתוך אותה קבוצה
            this.$store.dispatch({
              type: 'updateTasksOrder',
              tasks: updatedTasks,
              groupId: this.groupId
            })
          }
        }
      }
    },
    addTask() {
      if (!this.newTaskTitle.trim()) return
      
      const newTask = {
        id: utilService.makeId(),
        title: this.newTaskTitle,
        status: 'New',
        priority: '',
        person: [],
        date: null,
        comments: [],
        timeline: {
          startDate: null,
          endDate: null,
        },
      }
      
      this.$store.dispatch({
        type: 'addTaskToGroup',
        groupId: this.groupId,
        task: newTask,
      })
      
      this.newTaskTitle = ''
      this.isAddTask = false
    },
    cancelAddTask() {
      this.isAddTask = false
      this.newTaskTitle = ''
    }
  },
  components: {
    taskPreviewKanban,
    Container,
    Draggable
  },
}
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.ghost-card {
  opacity: 0.5;
  background: #f0f3ff;
  border: 1px dashed #0073ea;
}

.drag-in-progress {
  opacity: 0.5;
  transform: scale(0.98);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.07);
}
</style>
