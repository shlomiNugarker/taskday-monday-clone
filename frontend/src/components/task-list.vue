<template>
  <section class="task-list">
    <task-preview
      v-for="task in tasksToShow"
      :key="task.id"
      :task="task"
      :groupId="groupId"
      :boardId="boardId"
      :group="group"
    />
  </section>
</template>

<script>
import taskPreview from './task-preview.vue'
export default {
  props: {
    tasks: {
      type: Array,
    },
    group: {
      type: Object,
    },
    boardId: String,
    groupId: String,
  },
  name: 'task-list-cmp',
  data() {
    return {}
  },
  computed: {
    tasksToShow() {
      const filterBy = this.$store.getters.currFilterBy
      // const sortBy = this.$store.getters.currSortBy
      return this.tasks.filter((task) => {
        const regex = new RegExp(filterBy.txt, 'i')
        return (
          regex.test(this.group.title) || regex.test(task.title)
          //  &&
          // task.status.txt.includes(filterBy.statusTxt) &&
          // task.priority.txt.includes(filterBy.priorityTxt) &&
          //   (!filterBy.personId
          //     ? true
          //     : task.person.some((member) =>
          //         member._id.includes(filterBy.personId)
          //       ))
        )
      })
    },
  },
  watch: {},
  created() {},
  methods: {},
  components: {
    taskPreview,
  },
}
</script>
<style></style>
