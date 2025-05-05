<template>
  <section class="">
    <section
      class="priority-cmp"
      v-bind:style="{ backgroundColor: priorityStyle }"
    >
      <el-dropdown 
        class="side-drop-down w-full" 
        trigger="click" 
        placement="bottom" 
        :teleported="true"
        popper-class="priority-dropdown"
      >
        <span class="el-dropdown-link w-full">
          <div class="currOpt" @click="openModal">
            {{ task.priority }}
          </div>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item
              v-for="(opt, idx) in opts"
              :key="idx"
              class="opt"
              @click="changePriority(opt.priority)"
              v-bind:style="{
                backgroundColor: opt.color,
                justifyContent: 'center',
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
.el-dropdown-link {
  margin-left: 0px;
  display: block;
  width: 100%;
}

.priority-dropdown {
  min-width: 150px !important;
  width: 150px !important;
  margin-top: 5px !important;
  transform-origin: center top !important;
}

.el-dropdown__popper {
  max-width: none !important;
}
</style>
