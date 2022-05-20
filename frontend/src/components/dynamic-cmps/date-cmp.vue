<template>
  <section
    class="timeline-picker"
    @mouseover="isHover = true"
    @mouseleave="isHover = false"
  >
    <div class="block flex">
      <div class="time-to-show" :style="styleObject">
        <span v-if="!isHover" class="date-to-show">{{ datesToShow }}</span>
        <span v-if="isHover" class="days-count-to-show">{{
          daysCountToshow
        }}</span>
      </div>

      <el-date-picker
        v-model="value1"
        class="timeline"
        size="small"
        type="daterange"
        range-separator="To"
        start-placeholder="Start date"
        end-placeholder="End date"
        @change="changeTimeline"
      >
      </el-date-picker>
    </div>
  </section>
</template>

<script>
export default {
  name: 'timelinePicker',
  props: ['task', 'groupId', 'groupColor'],
  data() {
    return {
      startDate: this.task.timeline.startDate,
      endDate: this.task.timeline.endDate,
      value1: '',
      isHover: false,
    }
  },
  created() {
    if (!this.startDate || !this.endDate) this.value1 = null
    else this.value1 = [this.startDate, this.endDate]
  },
  mounted() {},
  methods: {
    changeTimeline() {
      const newDates = []
      if (this.value1) {
        newDates[0] = this.value1[0].getTime()
        newDates[1] = this.value1[1].getTime()
      }
      this.$emit('changeTimeline', {
        dates: [newDates[0], newDates[1]],
        taskId: this.task.id,
        groupId: this.groupId,
      })
    },
  },
  computed: {
    datesToShow() {
      if (!this.value1) return '-'
      var dates = this.value1.map((date) => {
        var month = new Date(date).toString().slice(4, 7)
        var day = new Date(date).toString().slice(8, 11)
        return `${month} ${day} `
      })
      var datesToShowStr = dates[0] + ' - ' + dates[1]
      if (dates[0].slice(0, 3) === dates[1].slice(0, 3)) {
        if (dates[0].slice(4, 6) === dates[1].slice(4, 6)) {
          datesToShowStr = datesToShowStr.slice(0, 6)
        } else {
          datesToShowStr =
            datesToShowStr.slice(0, 7) + ' - ' + datesToShowStr.slice(11, 20)
        }
      }
      return datesToShowStr
    },
    daysCountToshow() {
      if (!this.value1) return 'Set Dates'
      return (
        Math.floor(
          (new Date(this.value1[1]) - new Date(this.value1[0])) /
            1000 /
            60 /
            60 /
            24 +
            1
        ) + 'd'
      )
    },
    styleObject() {
      if (!this.value1) return { 'background-color': this.groupColor }
      const diff = this.value1[1] - this.value1[0]
      const today = Date.now()
      if (!this.value1[1] || today > this.value1[1])
        return { 'background-color': this.groupColor }
      else if (!this.value1[0] || today < this.value1[0])
        return { 'background-color': 'rgb(31, 31, 31)' }
      const startPrecent = diff / (today - this.value1[0])
      const degPrecent = 100 - Math.floor(100 / startPrecent)
      return {
        background: `linear-gradient(to left, rgb(31, 31, 31) 0% ${degPrecent}%, ${this.groupColor} ${degPrecent}% 100%)`,
      }
    },
  },
  watch: {},
}
</script>
