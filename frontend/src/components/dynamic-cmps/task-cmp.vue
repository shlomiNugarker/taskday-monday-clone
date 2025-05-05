<template>
  <section class="dynamic-component">
    <div class="dynamic-task flex-1 min-w-0 group h-full">
      <div class="flex-1 min-w-0 flex items-center h-full">
        <div class="relative flex items-center w-full min-w-0 h-full">
          <!-- Color Indicator -->
          <span class="dynamic-task-side-indicator transition-colors duration-300" :style="{ 'background-color': groupColor }"></span>
          
          <div class="w-full min-w-0 flex justify-between items-center pl-2 h-full">
            <!-- Task Title -->
            <div class="min-w-0 flex-1">
              <p 
                v-if="!isEdit" 
                @click.stop="onEdit"
                class="dynamic-task-title truncate cursor-pointer hover:text-primary-600"
                :title="task.title"
              >
                {{ task.title }}
              </p>
              
              <input
                ref="input"
                type="text"
                v-if="isEdit"
                v-model="copyTask.title"
                @focusout="saveTitle"
                @keyup.enter="saveTitle"
                @keyup.esc="cancelEdit"
                @click.stop
                class="dynamic-task-input none-drag-input"
                :disabled="isSaving"
              />
            </div>
            
            <!-- Comments and Activity Indicators -->
            <div class="flex items-center ml-2 shrink-0">
              <add-comment-btn 
                @click.stop="openDetails()" 
                class="cursor-pointer hover:scale-110 transition-transform duration-200 text-neutral-darkGray hover:text-primary-500" 
                :class="{'opacity-0 group-hover:opacity-100': !isHover && !commentsNum}"
              />
              <span 
                v-if="commentsNum" 
                class="bg-primary-500 text-white text-[10px] rounded-full w-[18px] h-[18px] flex items-center justify-center ml-1 cursor-pointer hover:bg-primary-600 transition-colors duration-200 shadow-sm"
                @click.stop="openDetails()"
              >
                {{ commentsNum > 99 ? '99+' : commentsNum }}
              </span>
              <span v-if="task.attachments?.length" class="ml-2 text-neutral-darkGray">
                <font-awesome-icon icon="paperclip" class="text-xs" />
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Task Actions Dropdown -->
      <span class="flex items-center">
        <el-dropdown class="side-drop-down" trigger="click" :teleported="true">
          <span class="dynamic-task-action-button ml-1 transition-all duration-200" :class="{'opacity-0 group-hover:opacity-100': !isHover}">
            <font-awesome-icon icon="caret-down" class="text-xs" />
          </span>
          <template #dropdown>
            <el-dropdown-menu class="dynamic-dropdown-menu">
              <el-dropdown-item @click.stop="duplicateTask" class="dynamic-dropdown-item">
                <font-awesome-icon icon="copy" class="mr-2" />
                <span>Duplicate</span>
              </el-dropdown-item>
              <el-dropdown-item @click.stop="removeTask()" class="dynamic-dropdown-item-danger">
                <font-awesome-icon icon="trash-can" class="mr-2" />
                <span>Delete</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </span>
    </div>
  </section>
</template>

<script>
import addCommentBtn from '../icons/add-comment-btn.vue'

export default {
  props: {
    task: {
      type: Object,
      required: true
    },
    isHover: {
      type: Boolean,
      default: false
    },
    boardId: String,
    groupId: String,
    groupColor: String,
  },
  name: 'task-cmp',
  data() {
    return {
      isEdit: false,
      copyTask: null,
      isSaving: false
    }
  },
  computed: {
    commentsNum() {
      return this.task.comments?.length || 0
    },
    hasActivity() {
      return this.commentsNum > 0 || (this.task.attachments?.length > 0)
    }
  },
  watch: {
    task: {
      handler(newVal) {
        this.copyTask = JSON.parse(JSON.stringify(newVal));
      },
      deep: true,
      immediate: true
    }
  },
  mounted() {
    // Listen for clicks outside when editing
    window.addEventListener('click', this.handleClickOutside)
  },
  beforeUnmount() {
    window.removeEventListener('click', this.handleClickOutside)
  },
  methods: {
    openDetails() {
      const boardId = this.$store.getters.currBoard._id
      const taskId = this.task.id
      const targetPath = `${boardId}/task/${taskId}`
      
      if (this.$route.params.taskId) {
        this.$router.back()
        setTimeout(() => {
          this.$router.push({ path: targetPath })
        }, 200)
        return
      }

      this.$router.push({ path: targetPath })
    },
    
    handleClickOutside(event) {
      if (this.isEdit && this.$refs.input && !this.$refs.input.contains(event.target)) {
        this.saveTitle()
      }
    },
    
    onEdit() {
      this.isEdit = true
      this.$nextTick(() => {
        if (this.$refs.input) {
          this.$refs.input.focus()
          this.$refs.input.select()
        }
      })
    },
    
    saveTitle() {
      if (this.isSaving) return;
      
      const newTitle = this.copyTask.title.trim();
      if (newTitle === '') {
        this.copyTask.title = this.task.title;
        this.isEdit = false;
        return;
      }
      
      if (newTitle !== this.task.title) {
        this.isSaving = true;
        this.isEdit = false;
        
        this.$emit('changeTitle', {
          title: newTitle,
          taskId: this.task.id,
          groupId: this.groupId
        })
        
        setTimeout(() => {
          this.isSaving = false;
        }, 300);
      } else {
        this.isEdit = false;
      }
    },
    
    cancelEdit() {
      this.copyTask.title = this.task.title;
      this.isEdit = false;
    },
    
    removeTask() {
      this.$confirm('Are you sure you want to delete this task?', 'Warning', {
        confirmButtonText: 'Delete',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        this.$emit('removeTask', {
          taskId: this.task.id,
          groupId: this.groupId
        });
      }).catch(() => {
        // User cancelled
      })
    },
    
    duplicateTask() {
      this.$emit('duplicateTask', {
        taskId: this.task.id,
        groupId: this.groupId
      });
    }
  },
  components: {
    addCommentBtn,
  },
}
</script>

<style scoped>
.dynamic-task {
  width: 100%;
  position: relative;
}

.dynamic-task-side-indicator {
  position: absolute;
  left: -8px;
  top: 50%;
  transform: translateY(-50%);
  width: 3px;
  height: 16px;
  border-radius: 2px;
}

.dynamic-task-title {
  padding: 6px 0;
  transition: all var(--transition-fast) ease;
}

.dynamic-task-input {
  width: 100%;
  border: 1px solid var(--color-primary-300);
  border-radius: var(--radius-sm);
  padding: 4px 8px;
  font-size: var(--font-size-sm);
  transition: all var(--transition-fast) ease;
  outline: none;
  box-shadow: var(--shadow-small);
  background-color: white;
}

.dynamic-task-input:focus {
  border-color: var(--color-primary-500);
  box-shadow: 0 0 0 2px rgba(var(--color-primary-rgb), 0.2);
}

.dynamic-task-action-button {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-full);
  color: var(--color-text-secondary);
  cursor: pointer;
}

.dynamic-task-action-button:hover {
  background-color: var(--color-background-hover);
  color: var(--color-text-primary);
}
</style>
