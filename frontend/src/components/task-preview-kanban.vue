<template>
  <li 
    class="kanban-task group relative bg-white rounded-lg border border-neutral-lightGray transition-all duration-200 cursor-pointer"
    :draggable="true"
    @click="openDetails"
  >
    <!-- Color indicator based on status or priority -->
    <div 
      class="absolute h-1 top-0 left-0 right-0 rounded-t-lg transition-colors duration-300"
      :style="{ backgroundColor: statusColor }"
    ></div>
    
    <div class="p-3 pt-4">
      <!-- Task Title -->
      <h3 class="font-medium text-neutral-black text-sm mb-3 truncate group-hover:text-primary-500 transition-colors duration-200">
        {{ task.title }}
      </h3>
      
      <!-- Task metadata -->
      <div class="flex flex-col gap-2 mt-4">
        <!-- Status badge (if available) -->
        <div v-if="task.status && task.status !== '-'" 
          class="flex items-center gap-2">
          <span class="w-2 h-2 rounded-full" :style="{ backgroundColor: statusColor }"></span>
          <span class="text-xs text-neutral-darkGray">{{ task.status }}</span>
        </div>
        
        <!-- Date info (if available) -->
        <div v-if="hasTimeline" class="flex items-center gap-2 text-xs text-neutral-darkGray">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 text-neutral-gray" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>{{ formattedDate }}</span>
        </div>
      </div>
      
      <!-- Footer with assigned people -->
      <div class="flex items-center justify-between mt-4 pt-3 border-t border-neutral-lightGray">
        <div class="flex items-center">
          <div v-if="hasAssignees" class="flex -space-x-2">
            <div
              class="kanban-avatar"
              v-for="(member, idx) in assignedMembers.slice(0, 3)"
              :key="idx"
            >
              <img
                class="w-full h-full rounded-full object-cover"
                :src="member.imgUrl || '/img/default-avatar.png'"
                :alt="member.fullname"
              />
            </div>
            
            <div v-if="assignedMembers.length > 3" 
              class="kanban-avatar bg-neutral-lightGray flex items-center justify-center text-[10px] text-neutral-darkGray font-medium">
              +{{ assignedMembers.length - 3 }}
            </div>
          </div>
          
          <div v-else class="kanban-avatar bg-neutral-extraLightGray flex items-center justify-center">
            <span class="text-xs text-neutral-darkGray">+</span>
          </div>
        </div>
        
        <!-- Priority indicator (if available) -->
        <div v-if="task.priority && task.priority !== '-'" class="px-2 py-0.5 text-[10px] rounded-full font-medium"
          :style="{ backgroundColor: priorityColor + '20', color: priorityColor }">
          {{ task.priority }}
        </div>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  props: {
    task: {
      type: Object,
      required: true
    },
    groupColor: {
      type: String,
      default: '#3da99c'
    }
  },
  computed: {
    assignedMembers() {
      if (!this.task.person) return [];
      return Array.isArray(this.task.person) ? this.task.person : [this.task.person];
    },
    hasAssignees() {
      return this.assignedMembers.length > 0;
    },
    hasTimeline() {
      return this.task.timeline && this.task.timeline.startDate && this.task.timeline.endDate;
    },
    formattedDate() {
      if (!this.hasTimeline) return '';
      
      const start = new Date(this.task.timeline.startDate);
      const end = new Date(this.task.timeline.endDate);
      
      const formatDate = (date) => {
        const options = { month: 'short', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
      };
      
      // If dates are in the same month
      if (start.getMonth() === end.getMonth() && 
          start.getFullYear() === end.getFullYear()) {
        const dayStart = start.getDate();
        const dayEnd = end.getDate();
        const month = start.toLocaleDateString('en-US', { month: 'short' });
        return `${month} ${dayStart}-${dayEnd}`;
      }
      
      return `${formatDate(start)} - ${formatDate(end)}`;
    },
    statusColor() {
      if (!this.task.status) return this.groupColor;
      
      const statusColors = {
        'Stuck': '#e2445c',
        'Working on it': '#fdab3d',
        'Done': '#00c875',
        '-': '#c4c4c4'
      };
      
      return statusColors[this.task.status] || this.groupColor;
    },
    priorityColor() {
      if (!this.task.priority) return '#c4c4c4';
      
      const priorityColors = {
        'High': '#e44258',
        'Medium': '#fdab3d',
        'Low': '#00c875',
        '-': '#c4c4c4'
      };
      
      return priorityColors[this.task.priority] || '#c4c4c4';
    }
  },
  methods: {
    openDetails() {
      if (this.$route.params.taskId) {
        this.$router.back();
        setTimeout(() => {
          this.$router.push({
            path: this.$store.getters.currBoard._id + '/task/' + this.task.id,
          });
        }, 200);
        return;
      }

      this.$router.push({
        path: this.$store.getters.currBoard._id + '/task/' + this.task.id,
      });
    },
  },
}
</script>

<style scoped>
.kanban-task {
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  min-height: 120px;
}

.kanban-task:hover {
  box-shadow: 0 3px 12px rgba(0,0,0,0.09);
  transform: translateY(-2px);
  border-color: rgba(0,0,0,0.12);
}

.kanban-avatar {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid white;
  box-shadow: 0 1px 2px rgba(0,0,0,0.1);
}
</style>
