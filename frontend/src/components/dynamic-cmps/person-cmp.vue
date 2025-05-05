<template>
  <section class="dynamic-person relative" @click="toggleDropdown">
    <div class="flex items-center h-full w-full">
      <!-- Show person avatar if assigned -->
      <div v-if="task.person" class="dynamic-person-avatar">
        <img 
          :src="task.person.imgUrl || '/img/default-avatar.png'" 
          :alt="task.person.fullname"
          class="w-full h-full object-cover"
        />
      </div>
      
      <!-- Show empty state if no person assigned -->
      <div v-else class="dynamic-person-empty">
        <span>+</span>
      </div>
    </div>
    
    <!-- Person selection dropdown -->
    <div v-if="showDropdown" class="dynamic-person-dropdown" @click.stop>
      <div class="mb-2 px-2">
        <input 
          type="text" 
          placeholder="Search members..."
          v-model="search"
          class="w-full px-2 py-1 text-sm border border-neutral-lightGray rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500"
        />
      </div>
      
      <div class="max-h-[200px] overflow-y-auto">
        <div 
          v-for="person in filteredPersons" 
          :key="person.id"
          class="flex items-center p-2 hover:bg-neutral-extraLightGray rounded-md cursor-pointer transition-colors duration-200"
          @click="selectPerson(person)"
        >
          <div class="w-6 h-6 rounded-full overflow-hidden mr-2 flex-shrink-0">
            <img 
              :src="person.imgUrl || '/img/default-avatar.png'" 
              :alt="person.fullname"
              class="w-full h-full object-cover"
            />
          </div>
          <span class="text-sm text-neutral-black truncate">{{ person.fullname }}</span>
        </div>
        
        <div 
          v-if="task.person"
          class="flex items-center p-2 mt-2 text-secondary-red-500 hover:bg-secondary-red-500/10 rounded-md cursor-pointer transition-colors duration-200"
          @click="removePerson"
        >
          <font-awesome-icon icon="user-slash" class="mr-2" />
          <span class="text-sm">Remove assignment</span>
        </div>
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
  data() {
    return {
      showDropdown: false,
      search: '',
      persons: [
        // This would typically come from your store, but for the sake of the example:
        { id: 'p1', fullname: 'John Doe', imgUrl: null },
        { id: 'p2', fullname: 'Jane Smith', imgUrl: null },
        { id: 'p3', fullname: 'Alex Johnson', imgUrl: null },
        // Add more users as needed
      ]
    }
  },
  computed: {
    filteredPersons() {
      if (!this.search) return this.persons;
      
      const searchTerm = this.search.toLowerCase();
      return this.persons.filter(person => 
        person.fullname.toLowerCase().includes(searchTerm)
      );
    }
  },
  mounted() {
    document.addEventListener('click', this.closeDropdown);
    // You would typically fetch users from your store here
    // this.persons = this.$store.getters.users;
  },
  beforeDestroy() {
    document.removeEventListener('click', this.closeDropdown);
  },
  methods: {
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
      this.search = '';
    },
    closeDropdown(event) {
      if (this.showDropdown && !event.target.closest('.person-cmp')) {
        this.showDropdown = false;
      }
    },
    selectPerson(person) {
      this.showDropdown = false;
      
      this.$emit('changePerson', {
        groupId: this.groupId,
        taskId: this.task.id,
        person
      });
    },
    removePerson() {
      this.showDropdown = false;
      
      this.$emit('changePerson', {
        groupId: this.groupId,
        taskId: this.task.id,
        person: null
      });
    }
  }
}
</script>

<style scoped>
/* All styling moved to common.css */
</style>
