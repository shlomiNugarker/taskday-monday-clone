<template>
  <div class="dynamic-task flex flex-1 min-w-0 group h-full">
    <span class="flex items-center">
      <el-dropdown class="side-drop-down" trigger="click">
        <span class="dynamic-task-action-button ml-1">
          <font-awesome-icon icon="caret-down" class="text-xs" />
        </span>
        <template #dropdown>
          <el-dropdown-menu class="dynamic-dropdown-menu">
            <el-dropdown-item @click="removeTask()" class="dynamic-dropdown-item-danger">
              <font-awesome-icon icon="trash-can" class="mr-2" />
              <span>Delete</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </span>
    
    <div class="flex-1 min-w-0 flex items-center h-full">
      <div class="relative flex items-center w-full min-w-0 h-full">
        <span class="dynamic-task-side-indicator" :style="{ 'background-color': groupColor }"></span>
        
        <div class="w-full min-w-0 flex justify-between items-center pl-2 h-full">
          <!-- Task Title -->
          <div class="min-w-0 flex-1">
            <p 
              v-if="!isEdit" 
              @click="onEdit"
              class="dynamic-task-title"
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
              class="dynamic-task-input"
            />
          </div>
          
          <!-- Comments -->
          <div class="flex items-center ml-2 shrink-0">
            <add-comment-btn 
              @click="openDetails()" 
              class="cursor-pointer hover:scale-110 transition-transform duration-200 text-neutral-darkGray hover:text-primary-500" 
            />
            <span 
              v-if="commentsNum" 
              class="bg-primary-500 text-white text-[10px] rounded-full w-[18px] h-[18px] flex items-center justify-center ml-1 cursor-pointer hover:bg-primary-600 transition-colors duration-200 shadow-sm"
              @click="openDetails()"
            >
              {{ commentsNum }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
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
    },
    boardId: String,
    groupId: String,
    groupColor: String,
  },
  name: 'task-cmp',
  data() {
    return {
      isEdit: false,
      title: '',
      copyTask: null,
      isSaving: false
    }
  },
  computed: {
    isHoverStyle() {
      if (this.isHover) return ''
      return 'invisible'
    },
    commentsNum() {
      return this.task.comments?.length || 0
    },
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
  methods: {
    openDetails() {
      if (this.$route.params.taskId) {
        this.$router.back()
        setTimeout(() => {
          this.$router.push(
            {
              path: this.$store.getters.currBoard._id + '/task/' + this.task.id,
            },
            200
          )
        })
        return
      }

      this.$router.push(
        {
          path: this.$store.getters.currBoard._id + '/task/' + this.task.id,
        }
      )
    },
    onEdit() {
      this.isEdit = true
      setTimeout(() => {
        if (this.$refs.input) {
          this.$refs.input.focus()
          this.$refs.input.select()
        }
      }, 10)
    },
    saveTitle() {
      if (this.copyTask.title.trim() === '') {
        this.copyTask.title = this.task.title; // Revert to original if empty
        this.isEdit = false;
        return;
      }
      
      if (this.copyTask.title !== this.task.title) {
        this.isSaving = true;
        this.isEdit = false;
        
        this.$emit('changeTitle', {
          title: this.copyTask.title,
          taskId: this.task.id,
          groupId: this.groupId
        })
        
        setTimeout(() => {
          this.isSaving = false;
        }, 800);
      } else {
        this.isEdit = false;
      }
    },
    cancelEdit() {
      this.copyTask.title = this.task.title; // Revert changes
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
  },
  components: {
    addCommentBtn,
  },
}
</script>

<style scoped>
/* All styling moved to common.css */
</style>
