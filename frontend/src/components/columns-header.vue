<template>
  <section class="table-header w-full py-2 px-4 border-b border-[var(--color-border)] bg-white overflow-x-auto">
    <div class="flex items-center">
      <div class="flex items-center flex-1">
        <span
          class="group-color-indicator w-6 h-6 rounded-md flex items-center justify-center cursor-pointer transition-all duration-200 hover:shadow-md relative group"
          :style="{ 'background-color': group.color }"
        >
          <el-dropdown class="flex" trigger="click">
            <span class="flex items-center">
              <font-awesome-icon class="text-white text-xs transform transition-transform duration-200 hover:scale-110" icon="caret-down" />
            </span>
            <template #dropdown>
              <el-dropdown-menu class="dynamic-dropdown-menu">
                <el-dropdown-item @click="changeGroupColor" class="dynamic-dropdown-item">
                  <div class="flex -space-x-1 mr-2">
                    <span class="w-4 h-4 rounded-full bg-blue-500"></span>
                    <span class="w-4 h-4 rounded-full bg-green-500"></span>
                    <span class="w-4 h-4 rounded-full bg-yellow-500"></span>
                  </div>
                  <span>Change color</span>
                </el-dropdown-item>
                <el-dropdown-item @click="duplicateGroup" class="dynamic-dropdown-item">
                  <font-awesome-icon icon="clone" class="mr-2" />
                  <span>Duplicate</span>
                </el-dropdown-item>
                <el-dropdown-item @click="removeGroup()" class="dynamic-dropdown-item-danger">
                  <font-awesome-icon icon="trash-can" class="mr-2" />
                  <span>Delete</span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          
          <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap z-20">
            Group options
          </div>
        </span>
        
        <div class="group-action mx-2 text-gray-500 cursor-move hover:text-gray-700 group">
          <font-awesome-icon icon="grip" />
          <div class="absolute mt-1 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap z-20">
            Drag to reorder
          </div>
        </div>
        
        <div
          class="group-title"
          :style="{ color: group.color }"
          v-if="!isEdit"
          @click="onEdit"
        >
          <span class="px-2 py-1 rounded hover:bg-gray-50 transition-colors duration-200 cursor-pointer flex items-center">
            {{ group.title }}
            <span class="ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-xs text-gray-500">(edit)</span>
            <div v-if="isSaving" class="ml-2">
              <div class="spin rounded-full h-3 w-3 border-t-2 border-b-2" :style="{ 'border-color': group.color }"></div>
            </div>
          </span>
        </div>
        
        <div v-if="isEdit" class="w-full max-w-xs">
          <input
            :style="{ color: group.color }"
            ref="input"
            type="text"
            v-model="groupCopy.title"
            @focusout="saveGroupTitle"
            @keyup.enter="saveGroupTitle"
            @keyup.esc="cancelEdit"
            class="border border-gray-300 rounded px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent focus-ring transition-all duration-200"
          />
        </div>
        
        <div class="ml-2 flex items-center">
          <span 
            v-if="group.tasks && group.tasks.length > 0" 
            class="dynamic-badge bg-gray-100 text-gray-600"
          >
            {{ group.tasks.length }} items
          </span>
        </div>
      </div>
      
      <div class="task-grid w-full">
        <div class="task-cell title-cell">
          <span class="font-medium text-sm text-gray-600">Task</span>
        </div>
        
        <div class="task-cell">
          <div class="font-medium text-sm text-gray-600 flex items-center whitespace-nowrap cursor-pointer">
            Status
            <button @click="sortByStatus" class="sort-button">
              <font-awesome-icon icon="sort" class="text-xs" />
            </button>
          </div>
        </div>
        
        <div class="task-cell">
          <div class="font-medium text-sm text-gray-600 flex items-center whitespace-nowrap cursor-pointer">
            Person
            <button @click="sortByPerson" class="sort-button">
              <font-awesome-icon icon="sort" class="text-xs" />
            </button>
          </div>
        </div>
        
        <div class="task-cell">
          <div class="font-medium text-sm text-gray-600 flex items-center whitespace-nowrap cursor-pointer">
            Priority
            <button @click="sortByPriority" class="sort-button">
              <font-awesome-icon icon="sort" class="text-xs" />
            </button>
          </div>
        </div>
        
        <div class="task-cell">
          <div class="font-medium text-sm text-gray-600 flex items-center whitespace-nowrap cursor-pointer">
            Date
            <button @click="sortByDate" class="sort-button">
              <font-awesome-icon icon="sort" class="text-xs" />
            </button>
          </div>
        </div>
        
        <div class="task-cell">
          <span class="font-medium text-sm text-gray-600">Text</span>
        </div>
      </div>
      
      <div class="ml-2">
        <button 
          @click="collapseGroup" 
          class="group-action"
        >
          <font-awesome-icon 
            :icon="isCollapsed ? 'chevron-down' : 'chevron-up'" 
            class="text-xs"
          />
        </button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    group: {
      type: Object,
      required: true
    },
  },
  name: 'columns-header-cmp',
  data() {
    return {
      isEdit: false,
      groupCopy: null,
      isSaving: false,
      isCollapsed: false,
      cmpsOrder: [
        'task-cmp',
        'status-cmp',
        'person-cmp',
        'priority-cmp',
        'date-cmp',
        'text-cmp',
      ],
    }
  },
  computed: {},
  watch: {
    group: {
      handler(newVal) {
        this.groupCopy = JSON.parse(JSON.stringify(newVal));
      },
      deep: true
    }
  },
  created() {
    this.groupCopy = JSON.parse(JSON.stringify(this.group))
  },
  methods: {
    onEdit() {
      this.isEdit = true
      setTimeout(() => {
        this.$refs.input.focus()
      }, 1)
    },
    saveGroupTitle() {
      if (this.groupCopy.title.trim() === '') {
        this.groupCopy.title = this.group.title; // Revert to original if empty
        this.isEdit = false;
        return;
      }
      
      if (this.groupCopy.title !== this.group.title) {
        this.isSaving = true;
        this.isEdit = false;
        
        setTimeout(() => {
          this.$emit('changeGroupTitle', {
            groupId: this.group.id,
            title: this.groupCopy.title,
          });
          this.isSaving = false;
        }, 800);
      } else {
        this.isEdit = false;
      }
    },
    cancelEdit() {
      this.groupCopy.title = this.group.title; // Revert changes
      this.isEdit = false;
    },
    removeGroup() {
      this.$confirm('Are you sure you want to delete this group?', 'Warning', {
        confirmButtonText: 'Delete',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        this.$emit('removeGroup', this.group.id);
      }).catch(() => {
        // User cancelled
      });
    },
    duplicateGroup() {
      this.$emit('duplicateGroup', this.group.id);
    },
    changeGroupColor() {
      // Show color picker dialog or emit event to parent for handling
      this.$emit('openColorPicker', this.group.id);
    },
    collapseGroup() {
      this.isCollapsed = !this.isCollapsed;
      this.$emit('toggleGroupCollapse', {
        groupId: this.group.id,
        isCollapsed: this.isCollapsed
      });
    },
    sortByStatus() {
      this.$emit('sortGroup', {
        groupId: this.group.id,
        sortBy: 'status'
      });
    },
    sortByPerson() {
      this.$emit('sortGroup', {
        groupId: this.group.id,
        sortBy: 'person'
      });
    },
    sortByPriority() {
      this.$emit('sortGroup', {
        groupId: this.group.id,
        sortBy: 'priority'
      });
    },
    sortByDate() {
      this.$emit('sortGroup', {
        groupId: this.group.id,
        sortBy: 'date'
      });
    }
  },
  components: {},
}
</script>

<style scoped>
/* Tooltip hover effect */
.group:hover .group-hover\:block {
  display: block;
  animation: fadeIn var(--transition-fast) ease-in-out;
}

/* Custom animations */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-5px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Group color indicator */
.group-color-indicator {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all var(--transition-normal) ease;
}

.group-color-indicator:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

/* Group title styling */
.group-title {
  font-weight: var(--font-weight-medium);
  transition: all var(--transition-normal) ease;
}

.group-title:hover {
  opacity: 0.9;
}

/* Sorting buttons */
.sort-button {
  margin-left: var(--spacing-xs);
  opacity: 0.6;
  width: 20px;
  height: 20px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-full);
  transition: all var(--transition-fast) ease;
}

.sort-button:hover {
  background-color: var(--color-background-hover);
  opacity: 1;
}

/* Dynamic badge */
.dynamic-badge {
  padding: var(--spacing-xxs) var(--spacing-xs);
  border-radius: var(--radius-full);
  font-size: var(--font-size-xs);
  transition: all var(--transition-fast) ease;
}

.dynamic-badge:hover {
  background-color: var(--color-background-hover);
}

/* Group action buttons */
.group-action {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: var(--radius-full);
  transition: all var(--transition-fast) ease;
  cursor: pointer;
}

.group-action:hover {
  background-color: var(--color-background-hover);
  transform: scale(1.05);
}

/* Spinning animation */
.spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Dropdown menu animations */
.dynamic-dropdown-menu {
  border-radius: var(--radius-md);
  overflow: hidden;
  box-shadow: var(--shadow-medium);
  animation: dropdown-fade-in var(--transition-fast) ease forwards;
}

@keyframes dropdown-fade-in {
  from {
    opacity: 0;
    transform: translateY(-8px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.dynamic-dropdown-item {
  transition: all var(--transition-fast) ease;
  display: flex;
  align-items: center;
  padding: var(--spacing-sm) var(--spacing-md);
}

.dynamic-dropdown-item:hover {
  background-color: var(--color-background-hover);
}

.dynamic-dropdown-item-danger {
  transition: all var(--transition-fast) ease;
  display: flex;
  align-items: center;
  padding: var(--spacing-sm) var(--spacing-md);
  color: var(--color-priority-critical);
}

.dynamic-dropdown-item-danger:hover {
  background-color: rgba(226, 68, 92, 0.08);
}

/* Grid styles */
.task-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr 0.5fr;
  gap: 0;
  align-items: center;
  text-align: right;
}

/* Cell styling */
.task-cell {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 var(--spacing-sm);
  position: relative;
}

.title-cell {
  justify-content: flex-start;
  padding-left: var(--spacing-md);
}

/* Responsive adjustments */
@media (max-width: 992px) {
  .task-grid {
    grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
  }
}

@media (max-width: 768px) {
  .task-grid {
    grid-template-columns: 2fr 1fr 1fr 1fr;
  }
}

@media (max-width: 576px) {
  .task-grid {
    grid-template-columns: 2fr 1fr 1fr;
  }
}
</style>
