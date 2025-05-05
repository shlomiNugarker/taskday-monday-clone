<template>
  <section>
    <section
      class="min-w-[150px]"
      :style="{ backgroundColor: priorityStyle }"
    >
      <el-dropdown 
        class="side-drop-down w-full" 
        trigger="click" 
        placement="bottom" 
        :teleported="true"
        popper-class="priority-dropdown"
      >
        <span class="el-dropdown-link w-full block ml-0">
          <div class="flex items-center justify-center w-[150px] h-[35px] cursor-pointer text-white" @click="openModal">
            {{ task.priority }}
          </div>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item
              v-for="(opt, idx) in opts"
              :key="idx"
              class="flex justify-center"
              @click="changePriority(opt.priority)"
              :style="{
                backgroundColor: opt.color,
                color: 'white',
              }"
            >
              <p>
                {{ opt.priority }}
              </p>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </section>
  </section>
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
  name: '',
  data() {
    return {
      opts: [
        { priority: 'High', color: '#840707' },
        { priority: 'Medium', color: '#bfaf1e' },
        { priority: 'Low', color: '#6d8a16' },
        { priority: '-', color: '#c4c4c4' },
      ],
    }
  },
  computed: {
    priorityStyle() {
      if (this.task.priority === 'High') return '#840707'
      else if (this.task.priority === 'Medium') return '#bfaf1e'
      else if (this.task.priority === 'Low') return '#6d8a16'
      return '#c4c4c4'
    },
  },
  watch: {},
  created() {},
  methods: {
    changePriority(priority) {
      this.$emit('changePriority', {
        groupId: this.groupId,
        taskId: this.task.id,
        priority,
      })
    },
    openModal() {
      // הפונקציה מוגדרת אבל ריקה כדי למנוע שגיאות
    }
  },
  components: {},
}
</script>

<style>
.priority-dropdown {
  @apply min-w-[150px] w-[150px] mt-[5px];
  transform-origin: center top !important;
}

.el-dropdown__popper {
  max-width: none !important;
}

:deep(.el-tooltip__trigger) {
  @apply w-[150px] flex justify-center items-center ml-0;
}
</style>
