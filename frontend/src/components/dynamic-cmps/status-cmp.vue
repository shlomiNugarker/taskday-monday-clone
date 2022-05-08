<template>
  <section class="status-cmp" v-bind:style="{ backgroundColor: statusStyle }">
    <el-dropdown class="side-drop-down" trigger="click">
      <span class="el-dropdown-link">
        <div class="currOptDone" v-if="isDone && isPlay">
          <img src="../../styles/images/done.gif" alt="" />
        </div>
        <div class="currOpt" @click="openModal">
          {{ task.status }}
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
            @click="changeStatus(opt.status)"
            v-bind:style="{
              backgroundColor: opt.color,
              justifyContent: 'center',
              color: 'white',
            }"
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
  },
  components: {},
}
</script>

<style></style>
