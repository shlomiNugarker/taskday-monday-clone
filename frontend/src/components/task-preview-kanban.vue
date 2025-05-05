<template>
  <li 
    class="w-full px-2 py-2 mb-3 bg-white rounded-lg shadow-task hover:shadow-board transition-all duration-300 cursor-pointer border border-transparent hover:border-[#e0e3e7] group"
    :draggable="true"
    @click="openDetails"
  >
    <header class="p-1 pb-2 border-b border-gray-100 mb-1">
      <h4 class="font-medium text-[#323338] text-sm truncate group-hover:text-[#0073ea] transition-colors duration-200">
        {{ task.title }}
      </h4>
    </header>
    
    <div>
      <div class="flex items-center">
        <div class="text-xs text-[#676879] flex-1">Task</div>
        <div class="flex items-center">
          <div
            class="w-7 h-7 rounded-full flex items-center justify-center shadow-sm bg-gradient-to-br from-white to-gray-100 border border-white transition-transform duration-200 hover:scale-110"
            v-for="(member, idx) in assignedMembers"
            :key="idx"
            :style="{ marginLeft: idx * -4 + 'px' }"
          >
            <img
              class="w-6 h-6 rounded-full object-cover"
              :src="member.imgUrl"
              alt=""
            />
          </div>
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
    },
  },
  data() {
    return {}
  },
  computed: {
    assignedMembers() {
      if (!this.task.person) return []
      return this.task.person
    },
  },
  methods: {
    openDetails() {
      if (this.$route.params.taskId) {
        this.$router.back()
        setTimeout(() => {
          this.$router.push({
            path:
              this.$store.getters.currBoard._id + '/task/' + this.task.id,
          })
        }, 200)
        return
      }

      this.$router.push({
        path: this.$store.getters.currBoard._id + '/task/' + this.task.id,
      })
    },
  },
}
</script>

<style></style>
