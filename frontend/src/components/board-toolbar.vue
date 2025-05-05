<template>
  <section class="bg-white shadow-sm">
    <div class="border-b border-[#e0e3e7] py-2 px-1">
      <div class="flex items-center">
        <div class="relative pb-2" :class="{ 'border-b-2 border-[#0073ea]': currView === 'main-table' }">
          <button 
            class="flex items-center px-3 py-1.5 text-sm text-[#323338] hover:bg-[#f5f6f8] rounded-md mx-1 transition-all duration-200 hover:shadow-sm"
            :class="{ 'bg-blue-50 text-blue-600': currView === 'main-table' }"
            @click="changeView('main-table')"
          >
            <img
              class="w-4 h-4 mr-2 transition-transform duration-200 group-hover:scale-110"
              src="../styles/icon/table.png"
              alt=""
            />
            <span class="font-medium">Table</span>
          </button>
        </div>

        <div class="relative pb-2" :class="{ 'border-b-2 border-[#0073ea]': currView === 'kanban' }">
          <button 
            class="flex items-center px-3 py-1.5 text-sm text-[#323338] hover:bg-[#f5f6f8] rounded-md mx-1 transition-all duration-200 hover:shadow-sm group"
            :class="{ 'bg-blue-50 text-blue-600': currView === 'kanban' }"
            @click="changeView('kanban')"
          >
            <font-awesome-icon 
              class="text-[#676879] w-4 h-4 mr-2 transition-transform duration-200 group-hover:scale-110" 
              :class="{ 'text-blue-500': currView === 'kanban' }"
              icon="bars" 
            />
            <span class="font-medium">Kanban</span>
          </button>
        </div>

        <div class="h-[20px] mx-2 w-[1px] bg-[#e0e3e7]"></div>
        
        <div>
          <button class="flex items-center px-3 py-1.5 text-sm text-[#323338] hover:bg-[#f5f6f8] rounded-md transition-all duration-200 hover:shadow-sm group">
            <font-awesome-icon class="text-blue-500 mr-1.5 transition-transform duration-200 group-hover:scale-110" icon="plus" />
            <span class="font-medium">Add View</span>
          </button>
        </div>
      </div>

      <div class="flex items-center justify-between mt-2">
        <div class="flex items-center space-x-2">
          <button class="flex items-center px-3 py-1.5 text-sm text-[#323338] hover:bg-[#f5f6f8] rounded-md transition-all duration-200 hover:shadow-sm group">
            <span class="mr-2 flex items-center justify-center">
              <img
                class="w-4 h-4 transition-transform duration-200 group-hover:scale-110"
                src="../styles/icon/integrate-2.png"
                alt=""
              />
            </span>
            <span class="font-medium">Integrate</span>
            <div class="flex items-center ml-2 space-x-1">
              <img
                class="w-4 h-4 transition-transform duration-200 hover:scale-110"
                src="../styles/icon/integrate.png"
                alt=""
              />
              <img class="w-4 h-4 transition-transform duration-200 hover:scale-110" src="../styles/icon/slack.png" alt="" />
              <img class="w-4 h-4 transition-transform duration-200 hover:scale-110" src="../styles/icon/gmail.png" alt="" />
            </div>
          </button>
          
          <button class="flex items-center px-3 py-1.5 text-sm text-[#323338] hover:bg-[#f5f6f8] rounded-md transition-all duration-200 hover:shadow-sm group">
            <span class="mr-2 flex items-center justify-center">
              <font-awesome-icon 
                class="text-[#676879] transition-transform duration-200 group-hover:scale-110" 
                icon="robot" 
              />
            </span>
            <span class="font-medium">Automate</span>
          </button>
        </div>
        
        <button 
          class="p-2 hover:bg-[#f5f6f8] rounded-full transition-all duration-200 hover:shadow-sm group"
          @click="toggleToolbar"
        >
          <font-awesome-icon 
            class="text-[#676879] transition-transform duration-200 group-hover:text-gray-800" 
            icon="angle-up" 
          />
        </button>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: 'board-toolbar',
  props: {},
  data() {
    return {}
  },
  components: {},
  computed: {
    currView() {
      return this.$store.getters.currView
    },
  },
  methods: {
    toggleToolbar() {
      this.$emit('toggleToolbar')
    },
    changeView(view) {
      this.$emit('changeView', view)
    },
  },
}
</script>
