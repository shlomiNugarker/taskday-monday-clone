<template>
  <section class="w-full py-2 px-4 border-b border-[#d0d4e4] bg-white shadow-sm sticky top-0 z-10 overflow-x-auto">
    <div class="flex items-center">
      <div class="flex items-center flex-1">
        <span
          class="w-6 h-6 rounded-md flex items-center justify-center cursor-pointer transition-all duration-200 hover:shadow-md relative group"
          :style="{ 'background-color': group.color }"
        >
          <el-dropdown class="flex" trigger="click">
            <span class="flex items-center">
              <font-awesome-icon class="text-white text-xs transform transition-transform duration-200 hover:scale-110" icon="caret-down" />
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="changeGroupColor" class="flex items-center space-x-2">
                  <div class="flex -space-x-1">
                    <span class="w-4 h-4 rounded-full bg-blue-500"></span>
                    <span class="w-4 h-4 rounded-full bg-green-500"></span>
                    <span class="w-4 h-4 rounded-full bg-yellow-500"></span>
                  </div>
                  <span>Change color</span>
                </el-dropdown-item>
                <el-dropdown-item @click="duplicateGroup" class="flex items-center space-x-2">
                  <font-awesome-icon icon="clone" class="text-gray-600" />
                  <span>Duplicate</span>
                </el-dropdown-item>
                <el-dropdown-item @click="removeGroup()" class="flex items-center space-x-2 text-red-500 hover:text-red-600">
                  <font-awesome-icon icon="trash-can" />
                  <span>Delete</span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          
          <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap z-20">
            Group options
          </div>
        </span>
        
        <div class="mx-2 text-gray-500 cursor-move hover:text-gray-700 transition-colors duration-200 group">
          <font-awesome-icon icon="grip" />
          <div class="absolute mt-1 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap z-20">
            Drag to reorder
          </div>
        </div>
        
        <div
          class="font-medium text-sm group"
          :style="{ color: group.color }"
          v-if="!isEdit"
          @click="onEdit"
        >
          <span class="px-2 py-1 rounded hover:bg-gray-50 transition-colors duration-200 cursor-pointer flex items-center">
            {{ group.title }}
            <span class="ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-xs text-gray-500">(edit)</span>
            <div v-if="isSaving" class="ml-2">
              <div class="animate-spin rounded-full h-3 w-3 border-t-2 border-b-2" :style="{ 'border-color': group.color }"></div>
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
            class="border border-gray-300 rounded px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all duration-200"
          />
        </div>
        
        <div class="ml-2 flex items-center">
          <span 
            v-if="group.tasks && group.tasks.length > 0" 
            class="text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-600"
          >
            {{ group.tasks.length }} items
          </span>
        </div>
      </div>
      
      <div class="task-grid grid-cols-[2fr,1fr,1fr,1fr,1fr,0.5fr] min-h-[48px] h-[48px] w-full">
        <div class="flex items-center justify-start border-r border-gray-100 pr-2 h-full text-right px-2">
          <span class="font-medium text-sm text-gray-600">Task</span>
        </div>
        
        <div class="flex items-center justify-center min-w-0 px-2 border-r border-gray-100 h-full text-right">
          <div class="font-medium text-sm text-gray-600 flex items-center whitespace-nowrap cursor-pointer">
            Status
            <button @click="sortByStatus" class="ml-1 text-gray-400 hover:text-gray-600 focus:outline-none">
              <font-awesome-icon icon="sort" class="text-xs" />
            </button>
          </div>
        </div>
        
        <div class="flex items-center justify-center min-w-0 px-2 border-r border-gray-100 h-full text-right">
          <div class="font-medium text-sm text-gray-600 flex items-center whitespace-nowrap cursor-pointer">
            Person
            <button @click="sortByPerson" class="ml-1 text-gray-400 hover:text-gray-600 focus:outline-none">
              <font-awesome-icon icon="sort" class="text-xs" />
            </button>
          </div>
        </div>
        
        <div class="flex items-center justify-center min-w-0 px-2 border-r border-gray-100 h-full text-right">
          <div class="font-medium text-sm text-gray-600 flex items-center whitespace-nowrap cursor-pointer">
            Priority
            <button @click="sortByPriority" class="ml-1 text-gray-400 hover:text-gray-600 focus:outline-none">
              <font-awesome-icon icon="sort" class="text-xs" />
            </button>
          </div>
        </div>
        
        <div class="flex items-center justify-center min-w-0 px-2 border-r border-gray-100 h-full text-right">
          <div class="font-medium text-sm text-gray-600 flex items-center whitespace-nowrap cursor-pointer">
            Date
            <button @click="sortByDate" class="ml-1 text-gray-400 hover:text-gray-600 focus:outline-none">
              <font-awesome-icon icon="sort" class="text-xs" />
            </button>
          </div>
        </div>
        
        <div class="flex items-center justify-center min-w-0 px-2 h-full text-right">
          <span class="font-medium text-sm text-gray-600">Text</span>
        </div>
      </div>
      
      <div class="ml-2">
        <button 
          @click="collapseGroup" 
          class="w-6 h-6 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors duration-200 focus:outline-none"
        >
          <font-awesome-icon 
            :icon="isCollapsed ? 'chevron-down' : 'chevron-up'" 
            class="text-gray-500 text-xs"
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
  animation: fadeIn 0.2s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-5px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Ensure text truncation */
.min-w-0 {
  min-width: 0;
}

.whitespace-nowrap {
  white-space: nowrap;
}

.task-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr 0.5fr;
  min-height: 48px;
  height: 48px;
}
</style>
