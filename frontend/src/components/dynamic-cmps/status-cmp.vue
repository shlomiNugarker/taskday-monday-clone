<template>
  <section
    class="flex items-center justify-center min-w-[150px] ml-[22px] text-white h-[35px]"
    :style="{ backgroundColor: statusStyle }"
  >
    <el-dropdown 
      class="h-full w-full" 
      trigger="click" 
      placement="bottom"
      :teleported="true"
      popper-class="status-dropdown"
    >
      <span class="flex items-center w-full relative">
        <div v-if="isDone && isPlay" class="absolute left-1/2 -translate-x-1/2 z-10 flex items-center justify-center">
          <img src="../../styles/images/done.gif" alt="" class="w-8 h-8" />
        </div>
        <div class="flex items-center justify-center w-full h-[35px] cursor-pointer relative" @click="openModal">
          <span class="block w-full text-center relative z-20 select-none">{{ task.status }}</span>
        </div>
      </span>
      <template #dropdown>
        <el-dropdown-menu class="p-0 w-[150px]">
          <el-dropdown-item
            v-for="(opt, idx) in opts"
            :key="idx"
            class="flex items-center justify-center text-white cursor-pointer"
            :style="{ backgroundColor: opt.color }"
            @click="changeStatus(opt.status)"
          >
            {{ opt.status }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
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
  name: 'status-cmp',
  data() {
    return {
      opts: [
        { status: 'Stuck', color: '#e2435c' },
        { status: 'Working on it', color: '#fec173' },
        { status: 'Done', color: '#00c875' },
        { status: '-', color: '#c4c4c4' },
      ],
      isPlay: false,
      isEditStatus: false,
    }
  },
  computed: {
    statusStyle() {
      if (this.task.status === 'Stuck') return '#e2445c'
      else if (this.task.status === 'Working on it') return '#fdab3d'
      else if (this.task.status === 'Done') return '#00c875'
      return '#c4c4c4'
    },
    isDone() {
      return this.task.status === 'Done' ? true : false
    },
  },
  watch: {},
  created() {},
  methods: {
    changeStatus(status) {
      this.isEditStatus = false
      this.isPlay = true
      setTimeout(() => (this.isPlay = false), 2500)

      this.$emit('changeStatus', {
        groupId: this.groupId,
        taskId: this.task.id,
        status,
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
.status-dropdown {
  min-width: 150px !important;
  width: 150px !important;
  margin-top: 5px !important;
  transform-origin: center top !important;
}

.el-dropdown {
  width: 100%;
}

.el-dropdown__popper {
  max-width: none !important;
}
</style>
