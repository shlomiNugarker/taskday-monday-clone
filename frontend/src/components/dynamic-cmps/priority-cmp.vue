<template>
  <el-dropdown trigger="click" class="w-[150px] h-[42px] flex items-center justify-center">
    <div class="w-full h-full bg-[rgb(245,246,248,0.85)] flex items-center justify-center cursor-pointer">
      <div :class="getPriorityClass" class="w-[80px] h-[22px] rounded-[4px] flex items-center justify-center text-xs">
        {{ getPriorityText }}
      </div>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="setPriority('Critical')">
          <div class="flex items-center">
            <div class="w-[10px] h-[10px] rounded-full bg-[#e2445c] mr-2"></div>
            <span>Critical</span>
          </div>
        </el-dropdown-item>
        <el-dropdown-item @click="setPriority('High')">
          <div class="flex items-center">
            <div class="w-[10px] h-[10px] rounded-full bg-[#fdab3d] mr-2"></div>
            <span>High</span>
          </div>
        </el-dropdown-item>
        <el-dropdown-item @click="setPriority('Medium')">
          <div class="flex items-center">
            <div class="w-[10px] h-[10px] rounded-full bg-[#ffcb00] mr-2"></div>
            <span>Medium</span>
          </div>
        </el-dropdown-item>
        <el-dropdown-item @click="setPriority('Low')">
          <div class="flex items-center">
            <div class="w-[10px] h-[10px] rounded-full bg-[#00c875] mr-2"></div>
            <span>Low</span>
          </div>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script>
export default {
  props: {
    task: {
      type: Object,
    },
    boardId: String,
    groupId: String,
  },
  name: 'priority-cmp',
  data() {
    return {
      priorityOptions: [
        { value: 'Critical', color: 'bg-[#e2445c] text-white' },
        { value: 'High', color: 'bg-[#fdab3d] text-white' },
        { value: 'Medium', color: 'bg-[#ffcb00] text-black' },
        { value: 'Low', color: 'bg-[#00c875] text-white' }
      ]
    }
  },
  computed: {
    getPriorityText() {
      return this.task.priority || 'Set Priority'
    },
    getPriorityClass() {
      const priority = this.priorityOptions.find(option => option.value === this.task.priority)
      return priority ? priority.color : 'bg-gray-200 text-[#676879]'
    }
  },
  methods: {
    setPriority(priority) {
      const taskToEdit = JSON.parse(JSON.stringify(this.task))
      taskToEdit.priority = priority
      
      this.$store.dispatch({
        type: 'editTask',
        task: taskToEdit,
        groupId: this.groupId
      })
    }
  }
}
</script>
