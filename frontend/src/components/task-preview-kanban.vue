<template>
  <div class="task-container">
    <span
      class="status-circle"
      v-bind:style="{ backgroundColor: statusStyle }"
    ></span>
    <p>
      {{ task.title }}
    </p>

    <div>person</div>
  </div>
</template>
<script>
export default {
  props: {
    task: {
      type: Object,
    },
    groupId: String,
  },
  name: 'task-preview-kanban',
  data() {
    return {}
  },
  computed: {
    statusStyle() {
      if (this.task.status === 'Stuck') return '#e2445c'
      else if (this.task.status === 'Working on it') return '#fdab3d'
      else if (this.task.status === 'Done') return '#00c875'
      return '#c4c4c4'
    },
  },
  watch: {},
  created() {
    this.taskCopy = JSON.parse(JSON.stringify(this.task))
  },
  methods: {},
  mounted() {},
  components: {},
}
</script>

<style></style>
