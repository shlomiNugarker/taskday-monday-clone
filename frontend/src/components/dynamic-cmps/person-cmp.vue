<template>
  <section 
    class="relative w-full h-full flex items-center justify-center"
    @mouseover="mouseOver" 
    @mouseleave="mouseLeave"
  >
    <div 
      class="w-full h-full flex items-center justify-center cursor-pointer rounded-md hover:bg-gray-100 transition-colors duration-200"
      @click="toggleDropdown"
    >
      <div class="flex items-center justify-center">
        <div v-if="assignedMembers.length" class="flex items-center">
          <div class="relative">
            <img
              v-for="(member, idx) in visibleMembers"
              :key="idx"
              class="w-7 h-7 rounded-full object-cover border-2 border-white shadow-sm"
              :src="member.imgUrl"
              :alt="member.fullname"
              :style="{ marginLeft: idx * -10 + 'px', zIndex: assignedMembers.length - idx }"
            />
            
            <div 
              v-if="hiddenMembersCount > 0" 
              class="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center shadow-sm"
            >
              +{{ hiddenMembersCount }}
            </div>
          </div>
        </div>
        <div v-else class="flex items-center">
          <div class="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
            </svg>
          </div>
          <span v-if="isOver" class="ml-2 text-gray-500 text-sm">Add person</span>
        </div>
      </div>
    </div>
    
    <!-- Custom dropdown -->
    <div 
      v-if="isDropdownOpen" 
      class="absolute top-full left-0 mt-1 bg-white rounded-md shadow-lg z-30 w-64 max-h-80 overflow-y-auto"
      @click.stop
    >
      <!-- Assigned members section -->
      <div v-if="assignedMembers.length > 0" class="p-2">
        <div class="text-xs text-gray-500 font-medium mb-1 pl-2">Assigned</div>
        <div 
          v-for="member in assignedMembers" 
          :key="member._id"
          class="flex items-center justify-between px-2 py-1.5 rounded-md hover:bg-gray-50 cursor-pointer group"
        >
          <div class="flex items-center">
            <img class="w-6 h-6 rounded-full object-cover mr-2" :src="member.imgUrl" :alt="member.fullname" />
            <span class="text-sm text-gray-700">{{ member.fullname }}</span>
          </div>
          <button 
            @click.stop="removePerson(member)" 
            class="text-gray-400 hover:text-red-500 transition-colors duration-200 opacity-0 group-hover:opacity-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
      
      <!-- Divider -->
      <div v-if="assignedMembers.length > 0 && notAssignedMembers.length > 0" class="border-t border-gray-100 my-1"></div>
      
      <!-- Available members section -->
      <div v-if="notAssignedMembers.length > 0" class="p-2">
        <div class="text-xs text-gray-500 font-medium mb-1 pl-2">Available</div>
        <div 
          v-for="member in notAssignedMembers" 
          :key="member._id"
          @click.stop="addPerson(member)" 
          class="flex items-center px-2 py-1.5 rounded-md hover:bg-gray-50 cursor-pointer"
        >
          <img class="w-6 h-6 rounded-full object-cover mr-2" :src="member.imgUrl" :alt="member.fullname" />
          <span class="text-sm text-gray-700">{{ member.fullname }}</span>
        </div>
      </div>
      
      <!-- Empty state -->
      <div v-if="notAssignedMembers.length === 0 && assignedMembers.length === 0" class="p-4 text-center">
        <span class="text-sm text-gray-500">No members available</span>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    task: {
      type: Object,
      required: true
    },
    boardId: String,
    groupId: String,
  },
  name: 'person-cmp',
  data() {
    return {
      isOver: false,
      isDropdownOpen: false,
      assignedMembers: [],
      notAssignedMembers: [],
      maxDisplayMembers: 3
    }
  },
  computed: {
    hideStyle() {
      return !this.isOver ? 'hidden' : '';
    },
    members() {
      return this.$store.getters.members;
    },
    visibleMembers() {
      return this.assignedMembers.slice(0, this.maxDisplayMembers);
    },
    hiddenMembersCount() {
      return Math.max(0, this.assignedMembers.length - this.maxDisplayMembers);
    }
  },
  created() {
    this.loadMembers();
  },
  mounted() {
    document.addEventListener('click', this.closeDropdown);
  },
  beforeDestroy() {
    document.removeEventListener('click', this.closeDropdown);
  },
  watch: {
    'task.person': {
      handler() {
        this.loadMembers();
      },
      deep: true
    }
  },
  methods: {
    loadMembers() {
      this.assignedMembers = Array.isArray(this.task.person) ? [...this.task.person] : [];
      this.notAssignedMembers = this.members.filter((member) => {
        return !this.assignedMembers.find((assMem) => assMem._id === member._id);
      });
    },
    mouseOver() {
      this.isOver = true;
    },
    mouseLeave() {
      this.isOver = false;
    },
    toggleDropdown(event) {
      event.stopPropagation();
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    closeDropdown(event) {
      if (!this.$el.contains(event.target)) {
        this.isDropdownOpen = false;
      }
    },
    addPerson(person) {
      this.assignedMembers.push(person);
      const idx = this.notAssignedMembers.findIndex(
        (member) => member._id === person._id
      );
      this.notAssignedMembers.splice(idx, 1);

      this.$emit('addAssignedMember', {
        person,
        groupId: this.groupId,
        taskId: this.task.id,
        boardId: this.boardId
      });
    },
    removePerson(person) {
      this.notAssignedMembers.push(person);
      const idx = this.assignedMembers.findIndex(
        (member) => member._id === person._id
      );
      this.assignedMembers.splice(idx, 1);
      
      this.$emit('removeAssignedMember', {
        memberId: person._id,
        groupId: this.groupId,
        taskId: this.task.id,
        boardId: this.boardId
      });
    },
  }
}
</script>

<style scoped>
.dropdown-enter-active, .dropdown-leave-active {
  transition: all 0.3s ease-out;
}
.dropdown-enter-from, .dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
