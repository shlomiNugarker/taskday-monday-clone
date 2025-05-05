<template>
  <section class="flex items-center justify-center min-w-[150px] h-[35px] pt-[5px] bg-[#f5f6f8d8]" @mouseover="mouseOver" @mouseleave="mouseLeave">
    <el-dropdown 
      class="side-drop-down w-full" 
      trigger="click" 
      placement="bottom"
      :teleported="true"
      popper-class="person-dropdown"
    >
      <span class="el-dropdown-link relative w-full flex justify-center items-center">
        <font-awesome-icon icon="plus" class="absolute -left-6 top-2 z-10 text-white text-[13px] rounded-full p-[2px] bg-[#0073ea]" :class="{'invisible': !isOver}" />
        
        <div v-if="assignedMembers.length" class="relative flex justify-center items-center" :style="{ minWidth: (assignedMembers.length - 1) * 20 + 30 + 'px', height: '30px' }">
          <div class="absolute left-1/2 -translate-x-1/2 flex" :style="{ width: (assignedMembers.length - 1) * 20 + 30 + 'px', height: '30px' }">
            <template v-for="(member, idx) in assignedMembers" :key="idx">
              <img
                v-if="member.imgUrl"
                class="w-[30px] h-[30px] rounded-full object-cover border-2 border-white shadow-sm absolute"
                :src="member.imgUrl"
                :alt="member.fullname"
                :style="{ left: idx * 20 + 'px', zIndex: assignedMembers.length - idx }"
              />
              <div
                v-else
                class="w-[30px] h-[30px] rounded-full border-2 border-white shadow-sm absolute bg-[#0073ea] text-white flex items-center justify-center font-bold text-xs"
                :style="{ left: idx * 20 + 'px', zIndex: assignedMembers.length - idx }"
              >
                {{ getUserInitials(member.fullname) }}
              </div>
            </template>
          </div>
        </div>
        
        <div v-else class="flex justify-center items-center">
          <div class="w-[30px] h-[30px] rounded-full border-2 border-white shadow-sm flex items-center justify-center text-gray-500 bg-gray-100">
            <font-awesome-icon icon="user" />
          </div>
        </div>

        <el-icon class="el-icon2 ml-2 absolute right-2"> </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item v-for="member in assignedMembers" :key="member._id">
            <span class="flex items-center justify-between min-w-[115px]" @click="removePerson(member)">
              <img 
                v-if="member.imgUrl" 
                class="w-[20px] h-[20px] rounded-full object-cover" 
                :src="member.imgUrl" 
                :alt="member.fullname" 
              />
              <div 
                v-else 
                class="w-[20px] h-[20px] rounded-full flex items-center justify-center bg-[#0073ea] text-white text-xs font-bold"
              >
                {{ getUserInitials(member.fullname) }}
              </div>
              <span class="mx-2 flex-grow"> {{ member.fullname }}</span>
              <font-awesome-icon icon="xmark" class="text-gray-500 hover:text-red-500" />
            </span>
          </el-dropdown-item>
          <p class="m-0 border-b border-t border-[#d7d7d7] text-center text-gray-500 text-sm py-1">People</p>
          <el-dropdown-item
            v-for="member in notAssignedMembers"
            :key="member._id"
          >
            <span @click="addPerson(member)" class="flex items-center min-w-[115px]">
              <img 
                v-if="member.imgUrl" 
                class="w-[20px] h-[20px] rounded-full object-cover" 
                :src="member.imgUrl" 
                :alt="member.fullname" 
              />
              <div 
                v-else 
                class="w-[20px] h-[20px] rounded-full flex items-center justify-center bg-[#0073ea] text-white text-xs font-bold"
              >
                {{ getUserInitials(member.fullname) }}
              </div>
              <span class="mx-2">
                {{ member.fullname }}
              </span>
            </span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </section>
</template>

<script>
export default {
  props: {
    task: {
      type: Object,
    },
    boardId: String,
    groupId: String,
  },
  name: 'person-cmp',
  data() {
    return {
      isOver: false,
      assignedMembers: [],
      notAssignedMembers: [],
    }
  },
  computed: {
    members() {
      return this.$store.getters.members
    },
  },
  watch: {},
  created() {
    this.assignedMembers = [...this.task.person]
    this.notAssignedMembers = this.members.filter((member) => {
      return !this.assignedMembers.find((assMem) => assMem._id === member._id)
    })
  },
  methods: {
    mouseOver() {
      this.isOver = true
    },
    mouseLeave() {
      this.isOver = false
    },
    addPerson(person) {
      this.assignedMembers.push(person)
      const idx = this.notAssignedMembers.findIndex(
        (member) => member._id === person._id
      )
      this.notAssignedMembers.splice(idx, 1)

      this.$emit('addAssignedMember', {
        person,
        groupId: this.groupId,
        taskId: this.task.id,
      })
    },
    removePerson(person) {
      this.notAssignedMembers.push(person)
      const idx = this.assignedMembers.findIndex(
        (member) => member._id === person._id
      )
      this.assignedMembers.splice(idx, 1)
      this.$emit('removeAssignedMember', {
        memberId: person._id,
        groupId: this.groupId,
        taskId: this.task.id,
      })
    },
    getUserInitials(fullname) {
      return fullname.split(' ').map(word => word[0]).join('').toUpperCase();
    },
  },
  components: {},
}
</script>

<style>
.person-dropdown {
  min-width: 150px !important;
  width: fit-content !important;
  margin-top: 5px !important;
  transform-origin: center top !important;
}

.el-dropdown__popper {
  max-width: none !important;
}
</style>
