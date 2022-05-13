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
      const sortBy = this.$store.getters.currSortBy
      const filterBy = this.$store.getters.currFilterBy
      const regex = new RegExp(filterBy.txt, 'i')
      return this.tasks
        .filter((task) => {
          return (
            (regex.test(this.group.title) || regex.test(task.title)) &&
            task.status.includes(filterBy.statusTxt) &&
            task.priority.includes(filterBy.priorityTxt) &&
            (!filterBy.personId
              ? true
              : task.person.some((member) =>
                  member._id.includes(filterBy.personId)
                ))
          )
        })
        .sort((i1, i2) => {
          var sortIndicator
          switch (sortBy.type) {
            case 'status':
              sortIndicator = i1.status > i2.status
              break
            case 'priority':
              sortIndicator = i1.priority < i2.priority
              break
            case 'date':
              sortIndicator = i1.createdAt > i2.createdAt

              break
            case 'timeline':
              sortIndicator = i1.timeline.startDate > i2.timeline.startDate
              break

            case 'title':
              sortIndicator = i1.title > i2.title
              break
            case 'person':
              const firstPersonI1 = [...i1.person].sort(
                (p1, p2) => p1.fullname > p2.fullname
              )[0]
              const firstPersonI2 = [...i2.person].sort(
                (p1, p2) => p1.fullname > p2.fullname
              )[0]
              if (!firstPersonI1 || !firstPersonI2)
                sortIndicator = !!firstPersonI1
              else
                sortIndicator = firstPersonI1.fullname > firstPersonI2.fullname
              break
            default:
              return 0
              break
          }
          if (sortIndicator) return sortBy.direction
          else return sortBy.direction * -1
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
