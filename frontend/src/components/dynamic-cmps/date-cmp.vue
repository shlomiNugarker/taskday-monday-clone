<template>
  <section class="dynamic-component" @click="openDatePicker">
    <div class="dynamic-date">
      <div 
        v-if="task.timeline?.startDate" 
        class="dynamic-date-badge" 
        :class="dateStatusClasses"
      >
        {{ formattedDate }}
      </div>
      <div v-else class="text-gray-400">-</div>
    </div>
    
    <!-- Date Picker Dropdown -->
    <Transition name="fade">
      <div 
        v-if="showDatePicker"
        class="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 bg-white rounded-md shadow-lg z-30 p-2"
        @click.stop
      >
        <el-date-picker
          v-model="selectedDates"
          type="daterange"
          range-separator="To"
          start-placeholder="Start date"
          end-placeholder="End date"
          format="MMM D, YYYY"
          :clearable="true"
          :editable="false"
          @change="setDates"
          class="w-full"
        />
        
        <div class="flex justify-between mt-2">
          <button 
            @click="clearDates"
            class="text-sm py-1 px-3 bg-gray-100 hover:bg-gray-200 rounded text-gray-700 transition-colors duration-200"
          >
            Clear
          </button>
          
          <button 
            @click="applyDates"
            class="text-sm py-1 px-3 bg-primary-500 hover:bg-primary-600 rounded text-white transition-colors duration-200"
            :disabled="!selectedDates"
          >
            Apply
          </button>
        </div>
      </div>
    </Transition>
  </section>
</template>

<script>
import { format, isAfter, isBefore, isToday } from 'date-fns'

export default {
  props: {
    task: {
      type: Object,
      required: true
    },
    boardId: String,
    groupId: String,
    groupColor: String,
  },
  name: 'date-cmp',
  data() {
    return {
      showDatePicker: false,
      selectedDates: null
    }
  },
  computed: {
    formattedDate() {
      if (!this.task.timeline?.startDate) return '-'
      
      const startDate = new Date(this.task.timeline.startDate)
      const endDate = this.task.timeline.endDate ? new Date(this.task.timeline.endDate) : null
      
      if (endDate) {
        return `${format(startDate, 'MMM d')} - ${format(endDate, 'MMM d')}`
      }
      
      return format(startDate, 'MMM d')
    },
    dateStatusClasses() {
      if (!this.task.timeline?.startDate) return {}
      
      const today = new Date()
      const startDate = new Date(this.task.timeline.startDate)
      const endDate = this.task.timeline.endDate ? new Date(this.task.timeline.endDate) : null
      
      // If only start date is set and it's in the past
      if (!endDate && isBefore(startDate, today) && !isToday(startDate)) {
        return {
          'bg-red-100 text-red-700': true
        }
      }
      
      // If range and end date is in the past
      if (endDate && isBefore(endDate, today) && !isToday(endDate)) {
        return {
          'bg-red-100 text-red-700': true
        }
      }
      
      // If today is within the range or is the start date
      if (isToday(startDate) || (endDate && isAfter(today, startDate) && isBefore(today, endDate)) || isToday(endDate)) {
        return {
          'bg-green-100 text-green-700': true
        }
      }
      
      // If start date is in the future
      return {
        'bg-blue-100 text-blue-700': true
      }
    }
  },
  watch: {
    'task.timeline': {
      handler(newVal) {
        if (newVal?.startDate) {
          const startDate = new Date(newVal.startDate)
          const endDate = newVal.endDate ? new Date(newVal.endDate) : null
          
          this.selectedDates = endDate ? [startDate, endDate] : [startDate, null]
        } else {
          this.selectedDates = null
        }
      },
      immediate: true,
      deep: true
    }
  },
  mounted() {
    document.addEventListener('click', this.closeDatePicker)
  },
  beforeUnmount() {
    document.removeEventListener('click', this.closeDatePicker)
  },
  methods: {
    openDatePicker() {
      this.showDatePicker = !this.showDatePicker
    },
    closeDatePicker(event) {
      if (this.showDatePicker && !event.target.closest('.dynamic-date') && !event.target.closest('.el-picker-panel')) {
        this.showDatePicker = false
      }
    },
    setDates(dates) {
      this.selectedDates = dates
    },
    clearDates() {
      this.selectedDates = null
      this.showDatePicker = false
      
      this.$emit('changeTimeline', {
        groupId: this.groupId,
        taskId: this.task.id,
        dates: null
      })
    },
    applyDates() {
      this.showDatePicker = false
      
      if (!this.selectedDates) return
      
      this.$emit('changeTimeline', {
        groupId: this.groupId,
        taskId: this.task.id,
        dates: this.selectedDates
      })
    }
  }
}
</script>

<style scoped>
/* Styles are imported from dynamic-components.css */
</style>
