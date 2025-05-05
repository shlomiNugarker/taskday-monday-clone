<template>
  <main>
    <section class="fixed right-0 top-0 h-screen w-full sm:w-11/12 md:w-3/4 lg:w-[45%] bg-white border-l border-gray-200 shadow-lg z-10" ref="detailModal">
      <!-- Header -->
      <div class="p-5 border-b border-gray-200">
        <div class="flex justify-between items-center px-5">
          <h1 class="text-2xl font-medium">{{ currTask.title }}</h1>
          
          <div class="flex items-center">
            <div class="h-5 w-px bg-gray-300 mx-2"></div>
            <button class="p-2 text-gray-500 hover:bg-gray-100 rounded-md transition-colors duration-200" @click="handleClose">
              <font-awesome-icon class="w-4 h-4" icon="x" />
            </button>
          </div>
        </div>
      </div>

      <!-- Content -->
      <div class="h-[calc(100vh-80px)] overflow-y-auto">
        <!-- Update Section -->
        <div class="p-5">
          <div class="flex items-center mb-10">
            <input
              type="text"
              placeholder="Write an update"
              v-model="updateTxt"
              @keyup.enter="addUpdate"
              class="flex-grow px-5 py-3 border border-blue-500 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button 
              @click="addUpdate" 
              class="ml-3 px-5 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
            >
              Update
            </button>
          </div>

          <!-- Comments -->
          <div v-if="currTask.comments.length" class="space-y-4">
            <div
              v-for="comment in currTask.comments"
              :key="comment._id"
              class="border border-gray-200 rounded-lg overflow-hidden"
            >
              <!-- Comment Header -->
              <div class="flex justify-between p-4 border-b border-gray-100">
                <div class="flex items-center">
                  <img 
                    :src="comment.byUser.imgUrl" 
                    alt="User" 
                    class="w-10 h-10 rounded-full object-cover"
                  />
                  <div class="ml-2 font-medium">{{ comment.byUser.fullname }}</div>
                  <div class="ml-1.5 w-2.5 h-2.5 bg-emerald-500 rounded-full"></div>
                </div>
                
                <div class="flex items-center text-sm text-gray-500">
                  <img class="w-4 h-4 mr-1" src="../styles/icon/clock.png" alt="Time" />
                  <span class="mr-2">1d</span>
                  <img class="w-4 h-4" src="../styles/icon/alarm-details.png" alt="Reminder" />
                </div>
              </div>

              <!-- Comment Body -->
              <div class="p-4">
                <p class="mb-4 text-gray-800">{{ comment.txt }}</p>
                <div class="flex items-center justify-end text-sm text-gray-500">
                  <img class="w-4 h-4 mr-1" src="../styles/icon/view.png" alt="Seen" />
                  <span class="mr-1">1</span>
                  <p>seen</p>
                </div>
              </div>

              <!-- Comment Actions -->
              <div class="flex border-t border-gray-200">
                <button 
                  @click="addLike(comment.id)" 
                  :class="[
                    'flex items-center justify-center w-1/2 py-3 border-r border-gray-200 hover:bg-gray-50 transition-colors duration-200',
                    { 'text-blue-500': comment.isLike }
                  ]"
                >
                  <font-awesome-icon class="mr-2" icon="thumbs-up" />
                  <span>Like</span>
                </button>
                
                <button 
                  @click="showReplay(comment.id)" 
                  class="flex items-center justify-center w-1/2 py-3 hover:bg-gray-50 transition-colors duration-200"
                >
                  <font-awesome-icon class="mr-2" icon="reply" />
                  <span>Reply</span>
                </button>
              </div>

              <!-- Existing Replies -->
              <div v-if="comment.replies && comment.replies.length" class="border-t border-gray-200 bg-gray-50 p-2">
                <div
                  v-for="reply in comment.replies"
                  :key="reply.id"
                  class="flex p-2"
                >
                  <img
                    :src="reply.byUser.imgUrl"
                    alt="User"
                    class="w-8 h-8 rounded-full mr-2"
                  />
                  <div class="bg-white rounded-lg p-3 shadow-sm">
                    <p class="text-sm font-medium text-blue-500">{{ reply.byUser.fullname }}</p>
                    <p class="text-sm text-gray-700">{{ reply.txt }}</p>
                  </div>
                </div>
              </div>

              <!-- Reply Input -->
              <div v-if="comment.id === replayToShow" class="flex p-3 border-t border-gray-200 bg-gray-50">
                <img
                  src="../styles/icon/def-user.png"
                  alt="User"
                  class="w-8 h-8 rounded-full mr-3"
                />
                <div class="flex-grow">
                  <input 
                    type="text" 
                    v-model="replayTxt"
                    placeholder="Write a reply..."
                    class="w-full p-2 border border-gray-300 rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  
                  <div class="flex justify-between items-center">
                    <div class="text-blue-500">
                      <font-awesome-icon class="mr-1" icon="file" />
                      <a href="#" class="text-sm hover:underline">Add files</a>
                    </div>
                    
                    <button 
                      @click="addReplay(comment.id)"
                      class="px-4 py-1.5 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200"
                    >
                      Reply
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import { utilService } from '../services/util.service'
export default {
  name: 'task-details',
  props: {},
  data() {
    return {
      updateTxt: '',
      replayTxt: '',
      replayToShow: '',
    }
  },
  components: {},
  created() {
    const taskId = this.$route.params.taskId
    const boardId = this.$route.params.boardId

    this.$store.dispatch({
      type: 'getCurrTask',
      boardId,
      taskId,
    })
  },
  unmounted() {},
  computed: {
    loggedinUser() {
      return this.$store.getters.loggedinUser
    },
    currTask() {
      return this.$store.getters.currTask
    },
    groupId() {
      return this.$store.getters.currGroupId
    },
  },
  methods: {
    handleClose() {
      this.$router.push('/board/' + this.$store.getters.currBoard._id)
    },
    addLike(commentId) {
      const copyTask = JSON.parse(JSON.stringify(this.currTask))
      var commentIdx = copyTask.comments.findIndex((comment) => {
        return comment.id === commentId
      })
      copyTask.comments[commentIdx].isLike = true

      this.$store.dispatch({
        type: 'editTask',
        task: copyTask,
        groupId: this.groupId,
      })
    },
    addReplay(commentId) {
      var newReplay = {
        id: utilService.makeId(),
        byUser: {
          id: this.loggedinUser?._id || utilService.makeId(),
          fullname: this.loggedinUser?.fullname || 'Guest',
          imgUrl:
            this.loggedinUser?.imgUrl ||
            'https://cdn1.monday.com/dapulse_default_photo.png',
        },
        txt: this.replayTxt,
        time: Date.now(),
        likes: [],
      }

      const copyTask = JSON.parse(JSON.stringify(this.currTask))
      var commentIdx = copyTask.comments.findIndex((comment) => {
        return comment.id === commentId
      })

      copyTask.comments[commentIdx].replies.push(newReplay)

      this.$store.dispatch({
        type: 'editTask',
        task: copyTask,
        groupId: this.groupId,
      })

      this.replayTxt = ''
    },
    showReplay(commentId) {
      this.replayToShow = commentId
    },
    getCurrTask() {
      const taskId = this.$route.params.taskId
      const boardId = this.$route.params.boardId

      this.$store.dispatch({
        type: 'getCurrTask',
        boardId,
        taskId,
      })
    },
    addUpdate() {
      if (!this.updateTxt.length) return
      const newUpdete = {
        id: utilService.makeId(),
        byUser: {
          id: this.loggedinUser?._id || utilService.makeId(),
          fullname: this.loggedinUser?.fullname || 'Guest',
          imgUrl:
            this.loggedinUser?.imgUrl ||
            'https://cdn1.monday.com/dapulse_default_photo.png',
        },
        txt: this.updateTxt,
        replies: [],
        likes: [],
      }

      const copyTask = JSON.parse(JSON.stringify(this.currTask))
      copyTask.comments.unshift(newUpdete)
      this.updateTxt = ''

      this.$store.dispatch({
        type: 'editTask',
        task: copyTask,
        groupId: this.groupId,
      })
    },
  },
}
</script>