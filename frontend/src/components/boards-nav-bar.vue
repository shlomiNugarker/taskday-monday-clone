<template>
  <section 
    class="z-[1330] h-screen w-[260px] top-0 p-4 bg-[#f6f7fb] border-r border-[#d0d4e4] transition-all duration-300 fixed max-[620px]:mt-[70px] shadow-md" 
    v-if="isNavBarOpen" 
    @mouseleave="mouseleave"
  >
    <div 
      class="flex items-center justify-center absolute w-[25px] h-[25px] bg-white rounded-full ml-[230px] border border-[#d0d4e4] transition-all duration-200 cursor-pointer text-[#5c5c61] hover:bg-[#0073ea] hover:text-white hover:w-[35px] hover:rounded-[20px] shadow-sm hover:shadow-md" 
      @click="closeModal"
    >
      <font-awesome-icon class="w-[9px] text-[15px] transition-colors duration-200" icon="angle-left" />
    </div>
    
    <div class="mb-6">
      <div class="flex justify-between items-center mb-3 text-[#757686] text-[16px] leading-[21px]">
        <p class="font-medium">Workspace</p>
        <div class="relative group">
          <button class="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors duration-200">
            <font-awesome-icon class="w-[25px] h-[17px] mx-[5px] text-[#323338]" icon="ellipsis" />
          </button>
          <div class="absolute right-0 top-full mt-1 hidden group-hover:block bg-white rounded-md shadow-lg z-10 w-48 py-1 border border-gray-200">
            <div class="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer flex items-center">
              <font-awesome-icon icon="gear" class="mr-2 text-gray-500" />
              Workspace settings
            </div>
            <div class="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer flex items-center">
              <font-awesome-icon icon="users" class="mr-2 text-gray-500" />
              Members
            </div>
            <div class="border-t border-gray-200 my-1"></div>
            <div class="px-4 py-2 text-sm text-blue-500 hover:bg-gray-100 cursor-pointer flex items-center">
              <font-awesome-icon icon="plus" class="mr-2" />
              New workspace
            </div>
          </div>
        </div>
      </div>
      
      <div class="flex items-center justify-between w-full h-[40px] p-[6px] rounded-md border border-[#d0d4e4] text-[#333439] mr-[4px] bg-white hover:shadow-sm transition-all duration-200 cursor-pointer">
        <div class="flex items-center">
          <div class="flex justify-center items-center w-[22px] h-[22px] bg-[#f279f2] rounded-md text-[18px] text-white mr-[5px]">M</div>
          <h1 class="font-medium">Main workspace</h1>
        </div>
        <button class="hover:bg-gray-100 rounded-full w-6 h-6 flex items-center justify-center transition-colors duration-200">
          <font-awesome-icon class="text-[20px] text-gray-500" icon="angle-down" />
        </button>
      </div>
    </div>
    
    <div class="relative mb-6">
      <input 
        type="text" 
        placeholder="Search boards..." 
        class="w-full h-[34px] px-8 py-2 rounded-md border border-[#d0d4e4] bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-sm"
        v-model="searchTerm"
      />
      <font-awesome-icon icon="search" class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
      <button 
        v-if="searchTerm" 
        @click="searchTerm = ''" 
        class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
      >
        <font-awesome-icon icon="times" />
      </button>
    </div>
    
    <div class="mt-[10px] text-[#323338] space-y-1">
      <div class="flex items-center justify-start rounded-md h-[35px] px-[10px] py-[8px] cursor-pointer transition-all duration-200 hover:bg-[#dcdfec] hover:shadow-sm group" @click="open">
        <span class="w-[20px] mr-[10px] text-blue-500 group-hover:text-blue-600 transition-colors duration-200">
          <font-awesome-icon icon="plus-circle" />
        </span>
        <span class="text-blue-500 group-hover:text-blue-600 font-medium transition-colors duration-200">Add Board</span>
      </div>
      
      <div class="flex items-center justify-start rounded-md h-[35px] px-[10px] py-[8px] cursor-pointer transition-all duration-200 hover:bg-[#dcdfec] hover:shadow-sm group">
        <span class="w-[20px] mr-[10px] text-gray-500 group-hover:text-gray-700 transition-colors duration-200"><filter-icon /></span>
        <span class="group-hover:font-medium transition-all duration-200">Filters</span>
      </div>
      
      <div class="flex items-center justify-start rounded-md h-[35px] px-[10px] py-[8px] cursor-pointer transition-all duration-200 hover:bg-[#dcdfec] hover:shadow-sm group">
        <span class="w-[20px] mr-[10px] text-gray-500 group-hover:text-gray-700 transition-colors duration-200"><search-icon /></span>
        <span class="group-hover:font-medium transition-all duration-200">Search</span>
      </div>
    </div>
    
    <div class="border-b border-[#dcdfec] my-[15px]"></div>
    
    <div class="flex items-center justify-between px-2 py-1 mb-2">
      <h3 class="text-sm font-medium text-gray-500">My Boards</h3>
      <div class="flex items-center space-x-1">
        <button class="w-6 h-6 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors duration-200 text-gray-500">
          <font-awesome-icon icon="sort" class="text-xs" />
        </button>
      </div>
    </div>
    
    <div class="mt-[16px] space-y-1 overflow-y-auto max-h-[calc(100vh-340px)] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent pr-1">
      <transition-group name="list" tag="div">
        <div
          v-for="board in filteredBoards"
          :key="board.boardId"
          class="flex items-center justify-between rounded-md h-[35px] px-[10px] py-[8px] cursor-pointer transition-all duration-200 hover:bg-[#dcdfec] hover:shadow-sm group"
          :class="{ 'bg-[#cce5ff] shadow-sm': currBoard?._id === board.boardId }"
        >
          <div class="flex items-center flex-grow" @click.stop="moveToBoard(board.boardId)">
            <div class="w-[25px] mr-[3px] text-gray-500 group-hover:text-gray-700 transition-colors duration-200">
              <span v-if="board.isStarred" class="text-yellow-400">
                <font-awesome-icon icon="star" />
              </span>
              <span v-else>
                <board-icon />
              </span>
            </div>
            <p class="truncate group-hover:font-medium transition-all duration-200" 
               :class="{'font-medium': currBoard?._id === board.boardId}">
              {{ board.boardTitle }}
            </p>
          </div>
          
          <div class="flex items-center space-x-1">
            <button 
              @click="toggleStar(board)" 
              class="w-6 h-6 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-gray-300/50 transition-all duration-200"
              :class="{'opacity-100': board.isStarred}"
            >
              <font-awesome-icon 
                :icon="board.isStarred ? 'star' : 'star'" 
                :class="board.isStarred ? 'text-yellow-400' : 'text-gray-400'"
              />
            </button>
            
            <el-dropdown class="flex" trigger="click" @click.stop="">
              <button class="w-6 h-6 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-gray-300/50 transition-all duration-200">
                <font-awesome-icon icon="ellipsis" class="text-gray-500" />
              </button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="duplicateBoard(board)" class="flex items-center space-x-2">
                    <font-awesome-icon icon="clone" class="text-gray-500" />
                    <span>Duplicate</span>
                  </el-dropdown-item>
                  <el-dropdown-item @click="removeBoard(board.boardId)" class="flex items-center space-x-2 text-red-500 hover:text-red-600">
                    <font-awesome-icon icon="trash-can" />
                    <span>Delete</span>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>
      </transition-group>
      
      <div v-if="filteredBoards.length === 0" class="flex flex-col items-center justify-center py-6 text-gray-500">
        <font-awesome-icon icon="search" class="text-3xl mb-2 opacity-50" />
        <p class="text-sm">No boards found</p>
        <button @click="searchTerm = ''" class="mt-2 text-xs text-blue-500 hover:underline">Clear search</button>
      </div>
    </div>
  </section>
</template>

<script>
import plusIcon from '../components/icons/plus-icon.vue'
import filterIcon from '../components/icons/filter-icon.vue'
import searchIcon from '../components/icons/search-icon.vue'
import boardIcon from '../components/icons/board-icon.vue'

export default {
  props: {},
  data() {
    return {
      newBoardName: '',
      searchTerm: '',
      leaveTimeout: null
    }
  },
  computed: {
    boardsList() {
      return this.$store.getters.boardsList
    },
    filteredBoards() {
      if (!this.searchTerm) return this.boardsList
      
      const term = this.searchTerm.toLowerCase()
      return this.boardsList.filter(board => 
        board.boardTitle.toLowerCase().includes(term)
      )
    },
    isNavBarOpen() {
      return this.$store.getters.isNavBarOpen
    },
    currBoard() {
      return this.$store.getters.currBoard
    },
  },
  created() {},
  methods: {
    closeModal() {
      this.$store.commit({ type: 'toggleNavBar', bool: false })
    },
    moveToBoard(boardId) {
      this.$router.push(`/board/${boardId}`)
      this.$store.dispatch({ type: 'getBoardById', boardId })
      // On mobile, close the navbar after selecting a board
      if (window.innerWidth <= 620) {
        this.closeModal()
      }
    },
    async newBoard() {
      var newBoard = await this.$store.dispatch({
        type: 'newBoard',
        boardName: this.newBoardName,
      })
      this.$router.push('/board/' + newBoard._id)
    },
    open() {
      this.$prompt('Please input name', 'Add new board', {
        confirmButtonText: 'ADD',
        cancelButtonText: 'Cancel',
        inputPlaceholder: 'My awesome board'
      })
        .then(({ value }) => {
          if (!value.trim()) {
            this.$message({
              type: 'warning',
              message: 'Board name cannot be empty'
            })
            return
          }
          
          this.newBoardName = value
          this.newBoard()
          this.$message({
            type: 'success',
            message: `The "${value}" board was successfully added`,
            customClass: 'el-message--success'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: 'Input canceled',
          })
        })
    },
    removeBoard(boardId) {
      if (boardId === this.boardsList[0].boardId) {
        this.$message({
          type: 'warning',
          message: 'Cannot delete the first board'
        })
        return
      }
      
      this.$confirm('Are you sure you want to delete this board?', 'Warning', {
        confirmButtonText: 'Delete',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch({
          type: 'removeBoard',
          boardId,
        })
        
        if (!this.boardsList.length) {
          this.$router.push('/')
        } else {
          this.$router.push('/board/' + this.boardsList[0].boardId)
        }
        
        this.$message({
          type: 'success',
          message: 'Board deleted successfully'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Delete canceled'
        })
      })
    },
    duplicateBoard(board) {
      const boardCopy = JSON.parse(JSON.stringify(board))
      boardCopy.boardTitle = `${boardCopy.boardTitle} (Copy)`
      
      this.$store.dispatch({
        type: 'duplicateBoard',
        board: boardCopy
      }).then(newBoard => {
        this.$message({
          type: 'success',
          message: `Board duplicated successfully`
        })
        
        this.$router.push('/board/' + newBoard._id)
      })
    },
    toggleStar(board) {
      const boardToEdit = JSON.parse(JSON.stringify(board))
      boardToEdit.isStarred = !boardToEdit.isStarred
      
      this.$store.dispatch({
        type: 'updateBoard',
        boardToEdit,
      })
    },
    mouseleave() {
      // Clear any existing timeout
      if (this.leaveTimeout) {
        clearTimeout(this.leaveTimeout)
      }
      
      // Only auto-close on desktop, not on mobile
      if (window.innerWidth > 620) {
        this.leaveTimeout = setTimeout(() => this.closeModal(), 1000)
      }
    },
  },
  components: {
    plusIcon,
    filterIcon,
    searchIcon,
    boardIcon,
  },
}
</script>

<style scoped>
/* Item transition animations */
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

/* Custom scrollbar */
.scrollbar-thin::-webkit-scrollbar {
  width: 6px;
}

.scrollbar-thin::-webkit-scrollbar-track {
  background: transparent;
}

.scrollbar-thin::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 3px;
}

.scrollbar-thin::-webkit-scrollbar-thumb:hover {
  background-color: rgba(0, 0, 0, 0.3);
}

/* Success message styling */
:deep(.el-message--success) {
  background-color: #f0f9eb;
  border-color: #e1f3d8;
}
</style> 