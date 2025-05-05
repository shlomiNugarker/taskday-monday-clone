<template>
  <section
    class="dynamic-date relative"
    @mouseover="isHover = true"
    @mouseleave="isHover = false"
  >
    <div class="flex w-full h-full items-center">
      <div 
        class="dynamic-date-display"
        :style="styleObject"
      >
        <div class="flex items-center">
          <svg v-if="value1" xmlns="http://www.w3.org/2000/svg" class="dynamic-date-icon" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
          </svg>
          <span v-if="!isHover" class="dynamic-date-text">{{ datesToShow }}</span>
          <span v-if="isHover" class="dynamic-date-text">{{ daysCountToshow }}</span>
        </div>
      </div>

      <el-date-picker
        v-model="value1"
        class="absolute opacity-0 w-full h-full cursor-pointer"
        size="small"
        type="daterange"
        range-separator="To"
        start-placeholder="Start date"
        end-placeholder="End date"
        @change="changeTimeline"
        popper-class="date-picker-popper"
      >
      </el-date-picker>
    </div>
    
    <!-- Tooltip that appears on hover when no dates are set -->
    <div 
      v-if="!value1 && isHover" 
      class="dynamic-date-tooltip"
    >
      Click to set date range
    </div>
  </section>
</template>

<script>
export default {
  name: 'timelinePicker',
  props: ['task', 'groupId', 'groupColor', 'boardId'],
  data() {
    return {
      startDate: this.task.timeline?.startDate || null,
      endDate: this.task.timeline?.endDate || null,
      value1: '',
      isHover: false,
    }
  },
  created() {
    // Safely handle the case where timeline might not exist
    if (!this.task.timeline) {
      this.value1 = null;
    } else if (!this.startDate || !this.endDate) {
      this.value1 = null;
    } else {
      this.value1 = [new Date(this.startDate), new Date(this.endDate)];
    }
  },
  methods: {
    changeTimeline() {
      const newDates = [];
      if (this.value1) {
        newDates[0] = this.value1[0].getTime();
        newDates[1] = this.value1[1].getTime();
      }
      this.$emit('changeTimeline', {
        dates: [newDates[0], newDates[1]],
        taskId: this.task.id,
        groupId: this.groupId,
        boardId: this.boardId
      });
    },
    clearDates() {
      this.value1 = null;
      this.$emit('changeTimeline', {
        dates: [null, null],
        taskId: this.task.id,
        groupId: this.groupId,
        boardId: this.boardId
      });
    }
  },
  computed: {
    datesToShow() {
      if (!this.value1) return 'Set Dates';
      
      const formatDate = (date) => {
        const options = { month: 'short', day: 'numeric' };
        return new Date(date).toLocaleDateString('en-US', options);
      };
      
      const start = formatDate(this.value1[0]);
      const end = formatDate(this.value1[1]);
      
      // If dates are in the same month
      if (this.value1[0].getMonth() === this.value1[1].getMonth() && 
          this.value1[0].getFullYear() === this.value1[1].getFullYear()) {
        const dayStart = this.value1[0].getDate();
        const dayEnd = this.value1[1].getDate();
        const month = new Date(this.value1[0]).toLocaleDateString('en-US', { month: 'short' });
        return `${month} ${dayStart}-${dayEnd}`;
      }
      
      return `${start} - ${end}`;
    },
    daysCountToshow() {
      if (!this.value1) return 'Set Dates';
      
      const diffTime = Math.abs(this.value1[1] - this.value1[0]);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
      
      return `${diffDays}d`;
    },
    styleObject() {
      if (!this.value1) {
        return { 
          'background-color': 'rgb(186, 186, 186)',
          'opacity': '0.7'
        };
      }
      
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const todayTime = today.getTime();
      
      // If the date is in the past (completed)
      if (todayTime > this.value1[1].getTime()) {
        return { 
          'background-color': this.groupColor,
          'opacity': '0.85'
        };
      }
      
      // If the date is in the future (not started)
      if (todayTime < this.value1[0].getTime()) {
        return { 
          'background-color': 'rgb(31, 31, 31)',
          'opacity': '0.9'
        };
      }
      
      // If the date is ongoing (in progress)
      const totalDuration = this.value1[1].getTime() - this.value1[0].getTime();
      const elapsedDuration = todayTime - this.value1[0].getTime();
      const progressPercent = Math.floor((elapsedDuration / totalDuration) * 100);
      
      return {
        background: `linear-gradient(to right, ${this.groupColor} 0% ${progressPercent}%, rgb(31, 31, 31) ${progressPercent}% 100%)`,
      };
    },
  },
  watch: {
    'task.timeline': {
      deep: true,
      handler(newVal) {
        if (!newVal || (!newVal.startDate && !newVal.endDate)) {
          this.value1 = null;
        } else if (newVal.startDate && newVal.endDate) {
          this.value1 = [new Date(newVal.startDate), new Date(newVal.endDate)];
        }
      }
    }
  },
}
</script>

<style scoped>
.date-picker-popper {
  z-index: 9999 !important; 
}
</style>
