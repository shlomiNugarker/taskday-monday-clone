<template>
  <section class="task-preview">
    <component
      :is="cmp"
      v-for="(cmp, idx) in cmpsOrder"
      :key="idx"
      :task="task"
      @mouseover="mouseHover"
      @mouseleave="mouseLeave"
      @changeStatus="changeStatus"
      @changeTitle="changeTitle"
      @changeTimeline="changeTimeline"
      @changePriority="changePriority"
      :isHover="isHover"
      :group="group"
      :boardId="boardId"
      :groupId="groupId"
      :groupColor="group.color"
    ></component>
    <div class="end-cmps">
      <div></div>
    </div>
  </section>
</template>

<script>
import textCmp from './dynamic-cmps/text-cmp.vue'
import statusCmp from './dynamic-cmps/status-cmp.vue'
import priorityCmp from './dynamic-cmps/priority1-cmp.vue'
import personCmp from './dynamic-cmps/person-cmp.vue'
import dateCmp from './dynamic-cmps/date-cmp.vue'
import taskCmp from './dynamic-cmps/task-cmp.vue'
import addCommentBtn from './icons/add-comment-btn.vue'

import { utilService } from '../services/util.service'
export default {
  props: {
    task: {
      type: Object,
    },
    group: {
      type: Object,
    },
    boardId: String,
    groupId: String,
  },
  name: '',
  data() {
    return {
      isHover: true,
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
  watch: {},
  created() {},
  methods: {
    mouseHover() {
      this.isHover = true
    },
    mouseLeave() {
      this.isHover = false
    },
    changeStatus(status) {
      const task = JSON.parse(JSON.stringify(this.task))
      task.status = status.status

      this.$store.dispatch({
        type: 'editTask',
        task,
        groupId: this.groupId,
      })
    },
    changePriority({ priority }) {
      const task = JSON.parse(JSON.stringify(this.task))
      task.priority = priority

      this.$store.dispatch({
        type: 'editTask',
        task,
        groupId: this.groupId,
      })
    },
    changeTitle({ title }) {
      const task = JSON.parse(JSON.stringify(this.task))
      task.title = title

      this.$store.dispatch({
        type: 'editTask',
        task,
        groupId: this.groupId,
      })
    },
    changeTimeline(timelineObj) {
      const task = JSON.parse(JSON.stringify(this.task))
      if (timelineObj.dates) {
        task.timeline.startDate = timelineObj.dates[0]
        task.timeline.endDate = timelineObj.dates[1]
      } else {
        task.timeline.startDate = null
        task.timeline.endDate = null
      }

      this.$store.dispatch({
        type: 'editTask',
        task,
        groupId: this.groupId,
      })
    },
  },
  components: {
    textCmp,
    personCmp,
    statusCmp,
    dateCmp,
    taskCmp,
    addCommentBtn,
    priorityCmp,
  },
}
</script>
