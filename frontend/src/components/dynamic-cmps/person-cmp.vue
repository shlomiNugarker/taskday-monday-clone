<template>
  <section class="dynamic-component">
    <div class="dynamic-person" @click.stop="openModal">
      <div 
        v-if="task.person" 
        class="dynamic-person-avatar"
        :style="{ backgroundColor: avatarColor }"
        @mouseenter="showTooltip = true"
        @mouseleave="showTooltip = false"
        @click.stop
      >
        {{ initials }}
        <!-- Tooltip -->
        <div v-if="showTooltip" class="dynamic-tooltip fade-in">
          {{ task.person.fullName }}
        </div>
      </div>
      <div v-else class="dynamic-person-empty" @click.stop>
        <font-awesome-icon icon="user" />
      </div>
    </div>
    
    <!-- Person Dropdown -->
    <div 
      v-if="showDropdown"
      class="dynamic-person-options"
      @click.stop
    >
      <!-- Search box -->
      <div class="person-search-box">
        <div class="search-icon">
          <font-awesome-icon icon="search" class="text-gray-400" />
        </div>
        <input 
          v-model="searchTerm" 
          type="text"
          placeholder="Search..."
          class="person-search-input none-drag-input"
          @click.stop
          ref="searchInput"
        />
      </div>
      
      <!-- Person options -->
      <div class="person-options-container">
        <div 
          v-for="(person, idx) in filteredPersons" 
          :key="idx"
          class="dynamic-person-option"
          @click.stop="changePerson(person)"
        >
          <div 
            class="person-option-avatar"
            :style="{ backgroundColor: getRandomColor(person.fullName) }"
          >
            {{ getInitials(person.fullName) }}
          </div>
          <span class="person-option-name">{{ person.fullName }}</span>
        </div>
        
        <div 
          class="dynamic-person-option clear-option"
          @click.stop="clearPerson"
        >
          <font-awesome-icon icon="times-circle" class="clear-icon" />
          <span>Clear</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { utilService } from '../../services/util.service'

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
      showDropdown: false,
      showTooltip: false,
      searchTerm: '',
      persons: [
        { fullName: 'John Smith' },
        { fullName: 'Emily Johnson' },
        { fullName: 'Michael Brown' },
        { fullName: 'Sarah Davis' },
        { fullName: 'David Wilson' },
        { fullName: 'Jennifer Miller' },
        { fullName: 'Robert Jones' },
        { fullName: 'Jessica Taylor' },
      ]
    }
  },
  computed: {
    initials() {
      return this.getInitials(this.task.person?.fullName || '')
    },
    avatarColor() {
      return this.getRandomColor(this.task.person?.fullName || '')
    },
    filteredPersons() {
      if (!this.searchTerm) return this.persons
      
      return this.persons.filter(person => 
        person.fullName.toLowerCase().includes(this.searchTerm.toLowerCase())
      )
    }
  },
  created() {
    window.addEventListener('click', this.handleOutsideClick)
  },
  beforeUnmount() {
    window.removeEventListener('click', this.handleOutsideClick)
  },
  methods: {
    openModal() {
      this.showDropdown = !this.showDropdown
      if (this.showDropdown) {
        this.searchTerm = ''
        this.$nextTick(() => {
          if (this.$refs.searchInput) {
            this.$refs.searchInput.focus()
          }
        })
      }
    },
    handleOutsideClick(event) {
      // Close dropdown if clicked outside component
      const isClickInside = this.$el.contains(event.target)
      if (!isClickInside && this.showDropdown) {
        this.showDropdown = false
      }
    },
    getInitials(name) {
      if (!name) return ''
      
      return name
        .split(' ')
        .map(part => part.charAt(0))
        .join('')
        .toUpperCase()
        .substring(0, 2)
    },
    getRandomColor(seed) {
      if (!seed) return 'var(--color-status-default)'
      
      // Generate a deterministic color based on the name
      const hue = utilService.getRandomIntInclusive(0, 360, seed)
      return `hsl(${hue}, 70%, 60%)`
    },
    changePerson(person) {
      console.log('Changing person to:', person)
      this.showDropdown = false
      
      this.$emit('changePerson', {
        groupId: this.groupId,
        taskId: this.task.id,
        person
      })
    },
    clearPerson() {
      console.log('Clearing person')
      this.showDropdown = false
      
      this.$emit('changePerson', {
        groupId: this.groupId,
        taskId: this.task.id,
        person: null
      })
    }
  }
}
</script>

<style scoped>
.dynamic-person-avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  color: white;
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  position: relative;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all var(--transition-normal) ease;
  border: 2px solid white;
}

.dynamic-person-avatar:hover {
  transform: scale(1.1);
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.15);
}

.dynamic-person-empty {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: var(--color-background-light);
  color: var(--color-text-secondary);
  border: 1px dashed var(--color-border);
  cursor: pointer;
  transition: all var(--transition-normal) ease;
}

.dynamic-person-empty:hover {
  background-color: var(--color-background-hover);
  transform: scale(1.05);
}

.dynamic-tooltip {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-bottom: 8px;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  white-space: nowrap;
  z-index: 1000;
}

.dynamic-person-options {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 5px;
  width: 220px;
  background: white;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-medium);
  overflow: hidden;
  z-index: 100;
  animation: fadeInDropdown 0.2s ease forwards;
}

@keyframes fadeInDropdown {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}

.person-search-box {
  display: flex;
  align-items: center;
  padding: 8px 12px;
  border-bottom: 1px solid var(--color-border);
}

.search-icon {
  margin-right: 8px;
  display: flex;
  align-items: center;
}

.person-search-input {
  flex: 1;
  border: none;
  outline: none;
  font-size: var(--font-size-sm);
  padding: 4px 0;
}

.person-options-container {
  max-height: 200px;
  overflow-y: auto;
}

.dynamic-person-option {
  display: flex;
  align-items: center;
  padding: 8px 12px;
  cursor: pointer;
  transition: background-color var(--transition-fast) ease;
}

.dynamic-person-option:hover {
  background-color: var(--color-background-hover);
}

.person-option-avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  color: white;
  font-size: 10px;
  margin-right: 8px;
}

.clear-option {
  border-top: 1px solid var(--color-border);
  color: var(--color-text-secondary);
}

.clear-icon {
  margin-right: 8px;
  font-size: 14px;
}
</style>
