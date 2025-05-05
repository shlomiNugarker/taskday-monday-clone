<template>
  <section 
    class="task-row group relative flex rounded-lg overflow-hidden bg-white hover:bg-neutral-50 border border-transparent hover:border-neutral-lightGray transition-all duration-200 ease-in-out"
    @mouseenter="setHover(true)"
    @mouseleave="setHover(false)"
  >
    <!-- Color indicator (Right Side for RTL) -->
    <div class="absolute right-0 top-0 bottom-0 w-1.5 transition-colors duration-300" 
      :style="{ backgroundColor: groupColor }">
    </div>
    
    <!-- Task Content -->
    <div class="w-full task-grid py-0 min-h-[52px] h-[52px] pl-2 mr-2.5 rtl">
      <!-- Task Title Component -->
      <div class="task-cell title-cell">
        <taskCmp
          :task="task"
          :isHover="isHover"
          :groupId="groupId"
          :boardId="boardId"
          :groupColor="groupColor"
          @changeTitle="changeTitle"
          @removeTask="deleteTask"
          class="w-full min-w-0 h-full"
        />
      </div>
      
      <!-- Status Component -->
      <div class="task-cell status-cell">
        <statusCmp
          :task="task"
          :groupId="groupId"
          :boardId="boardId"
          @changeStatus="changeStatus"
          class="w-full h-full"
        />
      </div>
      
      <!-- Person Component -->
      <div class="task-cell person-cell">
        <personCmp
          :task="task"
          :groupId="groupId"
          :boardId="boardId"
          @changePerson="updatePerson"
          class="w-full h-full"
        />
      </div>
      
      <!-- Priority Component -->
      <div class="task-cell priority-cell">
        <priorityCmp
          :task="task"
          :groupId="groupId"
          :boardId="boardId"
          @changePriority="changePriority"
          class="w-full h-full"
        />
      </div>
      
      <!-- Date Component -->
      <div class="task-cell date-cell">
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
      <div class="task-cell text-cell">
        <textCmp
          :task="task"
          :groupId="groupId"
          :boardId="boardId"
          @changeText="changeText"
          class="w-full h-full"
        />
      </div>

      <!-- Actions Menu -->
      <div class="task-cell actions-cell opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <!-- Task actions button -->
        <button
          @click.stop="toggleDropdown"
          class="task-action-button"
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
            class="task-dropdown-menu"
            @click.stop
          >
            <button 
              @click="duplicateTask" 
              class="task-dropdown-item"
              aria-label="שכפל משימה"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <span>שכפל</span>
            </button>
            
            <button 
              @click="addComment" 
              class="task-dropdown-item"
              aria-label="הוסף תגובה"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
              </svg>
              <span>הוסף תגובה</span>
            </button>
            
            <div class="task-dropdown-divider"></div>
            
            <button 
              @click="deleteTask" 
              class="task-dropdown-item-danger"
              aria-label="מחק משימה"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              <span>מחק</span>
            </button>
          </div>
        </Transition>
      </div>
    </div>
  </section>
</template>

<script>
import textCmp from './dynamic-cmps/text-cmp.vue'
import statusCmp from './dynamic-cmps/status-cmp.vue'
import priorityCmp from './dynamic-cmps/priority-cmp.vue'
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
      if (this.showDropdown && !event.target.closest('.task-dropdown-menu') && !event.target.closest('.task-action-button')) {
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
      const text = typeof payload === 'object' ? payload.text : payload
      this.updateTask({ text })
    },
    
    changePriority(payload) {
      const priority = typeof payload === 'object' ? payload.priority : payload
      this.updateTask({ priority })
    },
    
    updatePerson(payload) {
      const person = payload.person
      this.updateTask({ person })
    },
    
    changeTimeline(payload) {
      const dates = payload.dates
      this.updateTask({ 
        timeline: {
          startDate: dates[0],
          endDate: dates[1]
        }
      })
    }
  }
}
</script>

<style scoped>
.task-row {
  box-sizing: border-box;
  min-height: 52px;
  height: 52px;
  align-items: center;
  border-bottom: 1px solid rgba(240, 240, 240, 0.8);
  margin-bottom: 1px;
}

.task-row:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  z-index: 2;
  border-bottom-color: transparent;
}

/* Task grid layout */
.task-grid {
  display: grid;
  grid-template-columns: 2.5fr 1.2fr 1.2fr 1.2fr 1.3fr 1.6fr 50px;
  gap: 0;
  align-items: center;
  text-align: right;
  direction: rtl;
}

/* Cell styling */
.task-cell {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  position: relative;
  overflow: visible;
  padding: 0 6px;
}

.task-cell:first-child {
  padding-right: 12px;
}

.task-cell:last-child {
  padding-left: 6px;
}

/* Title cell alignment */
.title-cell {
  justify-content: flex-start;
}

/* Cell dividers */
.task-cell:not(:last-child)::after {
  content: '';
  position: absolute;
  top: 20%;
  left: 0;
  height: 60%;
  width: 1px;
  background-color: rgba(230, 230, 230, 0.7);
}

/* Actions menu styling */
.task-action-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  color: #919191;
  border-radius: 50%;
  transition: all 0.2s ease;
  background-color: transparent;
}

.task-action-button:hover {
  color: #525252;
  background-color: rgba(0, 0, 0, 0.05);
}

.task-dropdown-menu {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  width: 180px;
  background-color: white;
  border-radius: 6px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  z-index: 50;
  overflow: hidden;
  padding: 4px 0;
}

.task-dropdown-item, 
.task-dropdown-item-danger {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 8px 12px;
  font-size: 0.875rem;
  text-align: right;
  transition: background-color 0.15s ease;
  cursor: pointer;
}

.task-dropdown-item {
  color: #333;
}

.task-dropdown-item:hover {
  background-color: #f6f7fb;
}

.task-dropdown-item-danger {
  color: #e2445c;
}

.task-dropdown-item-danger:hover {
  background-color: rgba(226, 68, 92, 0.08);
}

.task-dropdown-divider {
  height: 1px;
  background-color: #eee;
  margin: 4px 0;
}

/* Transition for dropdown */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  .task-grid {
    grid-template-columns: 2.5fr 1.2fr 1.2fr 1.2fr 0.6fr;
  }
  
  .text-cell, 
  .actions-cell {
    display: none;
  }
}
</style>