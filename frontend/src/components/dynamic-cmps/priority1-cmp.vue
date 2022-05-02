<template>
  <section class="text-cmp">
    <section
      class="priority-cmp"
      v-bind:style="{ backgroundColor: priorityStyle }"
    >
      <el-dropdown class="side-drop-down" trigger="click">
        <span class="el-dropdown-link">
          <div class="currOpt" @click="openModal">
            {{ task.priority }}
          </div>
        </span>
        <template #dropdown v-bind:style="{}">
          <el-dropdown-menu
            v-for="(opt, idx) in opts"
            :key="idx"
            v-bind:style="{ padding: '5px' }"
          >
            <el-dropdown-item
              class="opt"
              @click="changePriority(opt.priority)"
              v-bind:style="{
                backgroundColor: opt.color,
                justifyContent: 'center',
                color: 'white',
              }"
            >
              {{ opt.priority }}
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
  },
  components: {},
}
</script>
<style>
.el-dropdown-link {
  margin-left: 0px;
}
</style>
