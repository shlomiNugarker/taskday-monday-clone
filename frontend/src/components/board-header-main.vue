<template>
  <section class="bg-white border-b border-gray-200 shadow-sm">
    <div class="flex flex-col md:flex-row md:justify-between md:items-center p-4">
      <div class="flex items-center space-x-3 mb-3 md:mb-0">
        <div class="group relative">
          <div 
            v-if="!isEdit" 
            @click="focusIn" 
            class="text-2xl font-bold cursor-pointer text-gray-800 hover:text-gray-900 transition-colors duration-200 flex items-center"
          >
            {{ title }}
            <span class="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-xs text-gray-500">(click to edit)</span>
          </div>
          <div v-if="isEdit" class="relative">
            <input
              @keydown.enter="saveTitle"
              @input="saveTitle"
              class="text-2xl font-bold border-b-2 border-blue-500 focus:outline-none focus:ring-0 bg-blue-50 px-2 py-1 rounded-t transition-all duration-300 w-full"
              ref="input"
              @focusout="isEdit = false"
              type="text"
              v-model="title"
            />
            <div v-if="isSaving" class="absolute right-2 top-1/2 -translate-y-1/2">
              <div class="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          </div>
        </div>

        <div class="flex items-center space-x-2">
          <button 
            @click="onClickInfo" 
            class="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors duration-200 relative group"
          >
            <font-awesome-icon class="text-gray-500 hover:text-blue-500 text-lg transition-colors duration-200" icon="circle-info" />
            <div class="absolute bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
              Board information
            </div>
          </button>

          <button 
            @click="onClickStar" 
            class="w-8 h-8 rounded-full flex items-center justify-center hover:bg-yellow-50 transition-colors duration-200 relative group"
          >
            <div class="transform hover:scale-110 transition-transform duration-200">
              <img v-if="!isStarred" class="w-5 h-5" src="../styles/icon/star-yellow.png" />
              <img v-else class="w-5 h-5 animate-pulse-once" src="../styles/icon/star-filled.png" />
            </div>
            <div class="absolute bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
              {{ isStarred ? 'Remove from favorites' : 'Add to favorites' }}
            </div>
          </button>
        </div>
      </div>

      <div class="flex flex-wrap items-center gap-2">
        <button class="px-3 py-1.5 text-sm text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors duration-200 flex items-center">
          <font-awesome-icon icon="clock" class="mr-1.5 text-gray-500" />
          Last seen
        </button>

        <button class="px-3 py-1.5 text-sm text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors duration-200 flex items-center">
          <img class="w-4 h-4 mr-1.5" src="../styles/icon/user.png" alt="" />
          Invite/ <span class="ml-1 font-medium text-blue-500">4</span>
        </button>

        <button class="px-3 py-1.5 text-sm text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors duration-200 flex items-center">
          <font-awesome-icon icon="chart-line" class="mr-1.5 text-gray-500" />
          Activity
        </button>

        <button class="px-3 py-1.5 text-sm text-blue-500 bg-white border border-blue-200 hover:bg-blue-50 rounded-md transition-all duration-200 flex items-center">
          <font-awesome-icon icon="plus" class="mr-1.5" />
          Add to board
        </button>

        <div class="relative group">
          <button class="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors duration-200">
            <font-awesome-icon class="text-gray-500 hover:text-gray-700 cursor-pointer text-lg" icon="ellipsis" />
          </button>
          <div class="absolute right-0 top-full mt-1 hidden group-hover:block bg-white rounded-md shadow-lg z-10 w-48 py-1 border border-gray-200">
            <div class="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer flex items-center">
              <font-awesome-icon icon="pen-to-square" class="mr-2 text-gray-500" />
              Edit board
            </div>
            <div class="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer flex items-center">
              <font-awesome-icon icon="clone" class="mr-2 text-gray-500" />
              Duplicate board
            </div>
            <div class="border-t border-gray-200 my-1"></div>
            <div class="px-4 py-2 text-sm text-red-600 hover:bg-gray-100 cursor-pointer flex items-center">
              <font-awesome-icon icon="trash" class="mr-2" />
              Delete board
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="px-4 pb-3">
      <p
        class="text-sm text-gray-600 cursor-pointer py-1 max-w-3xl hover:bg-gray-50 px-2 rounded transition-colors duration-200"
        v-if="!isEditSub"
        @click="focusSub"
        v-snip="{ lines: 1, mode: 'css' }"
      >
        {{ board.subtitle || 'Add a description...' }}
      </p>
      <div v-if="isEditSub" class="max-w-3xl relative">
        <input
          type="text"
          ref="inputSub"
          @focusout="isEditSub = false"
          v-model="subTitle"
          @keydown.enter="saveTitle"
          @input="saveTitle"
          class="text-sm text-gray-600 border-b-2 border-blue-500 focus:outline-none focus:ring-0 bg-blue-50 px-2 py-1 rounded-t w-full transition-all duration-300"
          placeholder="Add a description..."
        />
        <div v-if="isSaving" class="absolute right-2 top-1/2 -translate-y-1/2">
          <div class="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'board-header-main',
  props: {
    board: Object,
  },
  data() {
    return {
      isEdit: false,
      isEditSub: false,
      title: '',
      wait: false,
      subTitle: '',
      isSaving: false,
      isStarred: false
    }
  },
  created() {
    this.title = JSON.parse(JSON.stringify(this.board?.title))
    this.subTitle = JSON.parse(JSON.stringify(this.board?.subtitle))
    this.isStarred = this.board?.isStarred || false
  },
  components: {},
  computed: {},
  methods: {
    focusIn() {
      this.isEdit = true

      setTimeout(() => {
        this.$refs.input.focus()
      }, 10)
    },
    focusSub() {
      this.isEditSub = true

      setTimeout(() => {
        this.$refs.inputSub.focus()
      }, 10)
    },
    focusOut() {
      this.isEdit = false
    },
    saveTitle() {
      if (this.wait) return
      this.wait = true
      this.isSaving = true
      this.updateBoard()
    },
    updateBoard() {
      setTimeout(() => {
        this.wait = false
        this.isSaving = false

        const boardToEdit = JSON.parse(JSON.stringify(this.board))
        boardToEdit.title = this.title
        boardToEdit.subtitle = this.subTitle

        this.$store.dispatch({
          type: 'updateBoard',
          boardToEdit,
        })
      }, 1000) // Reduced timeout for better UX
    },
    onClickInfo() {
      // Placeholder for info click handler
      // You can implement a modal or tooltip here
    },
    onClickStar() {
      this.isStarred = !this.isStarred
      
      const boardToEdit = JSON.parse(JSON.stringify(this.board))
      boardToEdit.isStarred = this.isStarred
      
      this.$store.dispatch({
        type: 'updateBoard',
        boardToEdit,
      })
    }
  },
  watch: {
    '$store.getters.currBoard'() {
      this.title = this.$store.getters.currBoard?.title
      this.subTitle = this.$store.getters.currBoard?.subtitle
      this.isStarred = this.$store.getters.currBoard?.isStarred || false
    },
  },
}
</script>

<style scoped>
@keyframes pulse-once {
  0% { transform: scale(1); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
}

.animate-pulse-once {
  animation: pulse-once 0.5s ease-in-out;
}
</style>
