<template>
  <section 
    class="task-row group relative flex rounded-md overflow-hidden bg-white hover:bg-neutral-50 border border-transparent hover:border-gray-200 transition-all duration-200 ease-in-out"
    @mouseenter="setHover(true)"
    @mouseleave="setHover(false)"
  >
    <!-- Colored Bar (Right Side for RTL) -->
    <div class="absolute right-0 top-0 bottom-0 w-1.5" :style="{ backgroundColor: groupColor }"></div>
    
    <!-- Task Content -->
    <div class="w-full grid task-grid min-h-[42px] h-[42px] pl-2 mr-2.5 rtl">
      <!-- Task Title Component -->
      <div class="cell-wrapper">
        <taskCmp
          :task="task"
          :isHover="isHover"
          :groupId="groupId"
          :boardId="boardId"
          :groupColor="groupColor"
          @changeTitle="changeTitle"
          class="w-full min-w-0 h-full"
        />
      </div>
      
      <!-- Status Component -->
      <div class="cell-wrapper status-cell">
        <statusCmp
          :task="task"
          :groupId="groupId"
          :boardId="boardId"
          @changeStatus="changeStatus"
          class="w-full h-full"
        />
      </div>
      
      <!-- Person Component -->
      <div class="cell-wrapper member-cell">
        <personCmp
          :task="task"
          :groupId="groupId"
          :boardId="boardId"
          @removeAssignedMember="removeAssignedMember"
          @addAssignedMember="addAssignedMember"
          class="w-full h-full"
        />
      </div>
      
      <!-- Priority Component -->
      <div class="cell-wrapper priority-cell">
        <priorityCmp
          :task="task"
          :groupId="groupId"
          :boardId="boardId"
          @changePriority="changePriority"
          class="w-full h-full"
        />
      </div>
      
      <!-- Date Component -->
      <div class="cell-wrapper date-cell">
        <dateCmp
          :task="task"
          :groupId="groupId"
          :boardId="boardId"
          :groupColor="groupColor"
          @changeTimeline="changeTimeline"
          class="w-full h-full"
        />
      </div>
      
      <!-- Text Component -->
      <div class="cell-wrapper text-cell">
        <textCmp
          :task="task"
          :groupId="groupId"
          :boardId="boardId"
          @changeText="changeText"
          class="w-full h-full"
        />
      </div>

      <!-- More Options Button (visible on hover) -->
      <div class="cell-wrapper options-cell opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <button
          @click.stop="toggleDropdown"
          class="more-options-btn text-neutral-gray hover:text-neutral-darkGray p-1 rounded-full hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary transition-colors duration-200"
          aria-label="פתח תפריט אפשרויות"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="1"></circle>
            <circle cx="19" cy="12" r="1"></circle>
            <circle cx="5" cy="12" r="1"></circle>
          </svg>
        </button>
        
        <!-- Dropdown Menu -->
        <Transition name="fade">
          <div 
            v-if="showDropdown" 
            class="dropdown-menu absolute top-full left-0 mt-1 w-48 bg-white rounded-md shadow-xl z-50 overflow-hidden"
            @click.stop
          >
            <div class="py-1">
              <button 
                @click="duplicateTask" 
                class="w-full flex items-center px-4 py-2 text-sm text-neutral-darkGray hover:bg-neutral-100 cursor-pointer transition-colors duration-150"
                aria-label="שכפל משימה"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                שכפל
              </button>
              <button 
                @click="addComment" 
                class="w-full flex items-center px-4 py-2 text-sm text-neutral-darkGray hover:bg-neutral-100 cursor-pointer transition-colors duration-150"
                aria-label="הוסף תגובה"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
                הוסף תגובה
              </button>
              <button 
                @click="deleteTask" 
                class="w-full flex items-center px-4 py-2 text-sm text-status-error hover:bg-red-50 cursor-pointer transition-colors duration-150"
                aria-label="מחק משימה"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                מחק
              </button>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </section>
</template>

<script>
import textCmp from './dynamic-cmps/text-cmp.vue'
import statusCmp from './dynamic-cmps/status-cmp.vue'
import priorityCmp from './dynamic-cmps/priority1-cmp.vue'
import personCmp from './dynamic-cmps/person-cmp.vue'
import dateCmp from './dynamic-cmps/date-cmp.vue'
import taskCmp from './dynamic-cmps/task-cmp.vue'
import addCommentBtn from './icons/add-comment-btn.vue'
import { utilService } from '../services/util.service'

export default {
  name: 'TaskPreview',
  components: {
    textCmp,
    statusCmp,
    priorityCmp,
    personCmp,
    dateCmp,
    taskCmp,
    addCommentBtn,
  },
  props: {
    task: {
      type: Object,
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
  data() {
    return {
      isHover: false,
      showDropdown: false
    }
  },
  computed: {
    groupColor() {
      return this.group.style?.color || this.group.color || '#3da99c'
    }
  },
  mounted() {
    document.addEventListener('click', this.handleOutsideClick)
  },
  beforeUnmount() {
    document.removeEventListener('click', this.handleOutsideClick)
  },
  methods: {
    setHover(value) {
      this.isHover = value
      if (!value && !this.dropdownIsActive) {
        this.showDropdown = false
      }
    },
    
    handleOutsideClick(event) {
      // Close dropdown if clicked outside
      if (this.showDropdown && !event.target.closest('.dropdown-menu') && !event.target.closest('.more-options-btn')) {
        this.showDropdown = false
      }
    },
    
    toggleDropdown(event) {
      event.stopPropagation()
      this.showDropdown = !this.showDropdown
    },
    
    duplicateTask() {
      const newTask = structuredClone(this.task)
      newTask.id = utilService.makeId()
      newTask.title = `${newTask.title} (העתק)`
      this.$emit('duplicateTask', { task: newTask, groupId: this.groupId })
      this.showDropdown = false
    },
    
    addComment() {
      this.$emit('addComment', { taskId: this.task.id, groupId: this.groupId })
      this.showDropdown = false
    },
    
    deleteTask() {
      this.$emit('removeTask', { taskId: this.task.id, groupId: this.groupId })
      this.showDropdown = false
    },
    
    // Task update methods
    updateTask(updatedFields) {
      const taskToUpdate = { ...this.task, ...updatedFields }
      this.$emit('update', { task: taskToUpdate, groupId: this.groupId })
    },
    
    changeTitle(payload) {
      const title = typeof payload === 'object' ? payload.title : payload
      this.updateTask({ title })
    },
    
    changeStatus(payload) {
      const status = typeof payload === 'object' ? payload.status : payload
      this.updateTask({ status })
    },
    
    changeText(payload) {
      const txt = typeof payload === 'object' ? payload.txt : payload
      this.updateTask({ txt })
    },
    
    changePriority(payload) {
      const priority = typeof payload === 'object' ? payload.priority : payload
      this.updateTask({ priority })
    },
    
    removeAssignedMember(memberId) {
      const taskToUpdate = structuredClone(this.task)
      const idx = taskToUpdate.memberIds?.findIndex(id => id === memberId)
      if (idx !== -1) {
        taskToUpdate.memberIds.splice(idx, 1)
        this.$emit('update', { task: taskToUpdate, groupId: this.groupId })
      }
    },
    
    addAssignedMember(memberId) {
      const taskToUpdate = structuredClone(this.task)
      if (!taskToUpdate.memberIds) taskToUpdate.memberIds = []
      if (!taskToUpdate.memberIds.includes(memberId)) {
        taskToUpdate.memberIds.push(memberId)
        this.$emit('update', { task: taskToUpdate, groupId: this.groupId })
      }
    },
    
    changeTimeline(timeline) {
      this.updateTask({ dueDate: timeline })
    }
  }
}
</script>

<style scoped>
.task-row {
  box-sizing: border-box;
  min-height: 42px;
  height: 42px;
  align-items: center;
  border-bottom: 1px solid #f5f5f5;
}

.task-row:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  z-index: 1;
}

.task-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr 0.5fr 0.2fr;
  gap: 0;
  align-items: center;
  text-align: right;
  direction: rtl;
}

.cell-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  position: relative;
  overflow: visible;
  padding: 0 4px;
}

.cell-wrapper:not(:last-child)::after {
  content: '';
  position: absolute;
  top: 25%;
  left: 0;
  height: 50%;
  width: 1px;
  background-color: #f0f0f0;
}

/* Status cell specific styling */
.status-cell, .priority-cell, .date-cell {
  cursor: pointer;
}

.member-cell:hover, .priority-cell:hover, .status-cell:hover, .date-cell:hover, .text-cell:hover {
  background-color: rgba(0, 0, 0, 0.02);
}

/* Ensure min width is 0 for text truncation */
.min-w-0 {
  min-width: 0;
}

/* RTL support */
.rtl {
  direction: rtl;
}

/* Transition for dropdown menu */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}

.dropdown-menu {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
}

@media (max-width: 768px) {
  .task-grid {
    grid-template-columns: 2fr 1fr 1fr 1fr 0.5fr;
  }
  
  .text-cell, .options-cell {
    display: none;
  }
}
</style>