<template>
  <main>
    <section class="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[100] animate-fade-in" ref="detailModal">
      <div class="w-[90%] max-w-[800px] bg-white rounded-xl shadow-modal p-6 relative animate-slide-up">
        <div class="absolute top-4 right-4 cursor-pointer text-[#676879] hover:text-[#323338] hover:bg-gray-100 p-2 rounded-full transition-all duration-200" @click="handleClose">
          <font-awesome-icon class="text-lg" icon="x" />
        </div>

        <div class="mb-6">
          <h1 class="text-2xl font-medium mb-3 text-[#323338] hover:text-[#0073ea] transition-colors duration-200">{{ currTask.title }}</h1>
          <div class="flex items-center justify-between border-b border-[#e0e3e7] pb-3">
            <div class="flex items-center">
              <img src="" alt="" />
              <p class="w-[1px] h-[20px] bg-[#e0e3e7] mx-2"></p>
            </div>
            <div class="cursor-pointer p-2 hover:bg-[#f5f6f8] rounded-md transition-colors duration-200">
              <font-awesome-icon class="text-[#676879]" icon="ellipsis" />
            </div>
          </div>
        </div>

        <div class="flex flex-col">
          <div class="mb-6">
            <div class="flex mb-4">
              <input
                type="text"
                placeholder="Write an update"
                v-model="updateTxt"
                @keyup.enter="addUpdate"
                class="flex-1 px-4 py-3 border border-[#e0e3e7] rounded-lg mr-2 focus:outline-none focus:border-[#0073ea] focus:ring-2 focus:ring-[#0073ea]/20 transition-all duration-200"
              />
              <div>
                <button 
                  class="bg-gradient-to-r from-[#0073ea] to-[#0060d9] text-white px-4 py-3 rounded-lg hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0" 
                  @click="addUpdate"
                >
                  Update
                </button>
              </div>
            </div>
            <div></div>
          </div>

          <div class="space-y-4" v-if="currTask.comments.length">
            <div
              class="bg-white p-5 rounded-xl shadow-task border border-[#e0e3e7] hover:border-[#0073ea]/30 transition-all duration-200 hover:shadow-board"
              v-for="comment in currTask.comments"
              :key="comment._id"
            >
              <div class="flex justify-between items-center mb-3">
                <div class="flex items-center">
                  <div class="w-[40px] h-[40px] mr-3 transition-transform duration-200 hover:scale-110">
                    <img class="w-full h-full rounded-full object-cover border-2 border-white shadow-sm" :src="comment.byUser.imgUrl" />
                  </div>
                  <div class="font-medium text-[#323338]">{{ comment.byUser.fullname }}</div>

                  <div class="ml-2">
                    <p class="w-[8px] h-[8px] bg-[#00c875] rounded-full"></p>
                  </div>
                </div>
                <div class="flex items-center text-[#676879] text-sm">
                  <div class="mr-1 opacity-70 hover:opacity-100 transition-opacity duration-200">
                    <img
                      class="w-4 h-4"
                      src="../styles/icon/clock.png"
                      alt
                    />
                  </div>
                  <div class="mr-2">1d</div>
                  <div class="opacity-70 hover:opacity-100 transition-opacity duration-200">
                    <img
                      class="w-4 h-4"
                      src="../styles/icon/alarm-details.png"
                      alt
                    />
                  </div>
                </div>
              </div>
              <div class="mb-4">
                <p class="text-[#323338] mb-2 leading-relaxed">{{ comment.txt }}</p>
                <div class="flex items-center text-xs text-[#676879]">
                  <span class="mr-1">
                    <img class="w-3 h-3" src="../styles/icon/view.png" alt />
                  </span>
                  <span class="mr-1">1</span>
                  <p>seen</p>
                </div>
              </div>

              <div class="flex border-t border-[#e0e3e7] pt-3">
                <div 
                  class="flex items-center mr-4 cursor-pointer px-2 py-1 rounded-md hover:bg-[#f5f6f8] transition-colors duration-200" 
                  @click="addLike(comment.id)"
                >
                  <span class="mr-1">
                    <font-awesome-icon
                      :class="{ 'text-[#0073ea]': comment.isLike, 'text-[#676879]': !comment.isLike }"
                      class="text-sm"
                      icon="thumbs-up"
                    />
                  </span>
                  <p :class="{ 'text-[#0073ea]': comment.isLike, 'text-[#676879]': !comment.isLike }">Like</p>
                </div>

                <div 
                  class="flex items-center cursor-pointer px-2 py-1 rounded-md hover:bg-[#f5f6f8] transition-colors duration-200" 
                  @click="showReplay(comment.id)"
                >
                  <span class="mr-1">
                    <font-awesome-icon class="text-[#676879] text-sm" icon="reply" />
                  </span>
                  <p class="text-[#676879]">Reply</p>
                </div>
              </div>
              <!-- Replay -->
              <div class="mt-3 space-y-3 pl-3 border-l-2 border-[#e0e3e7]" v-if="comment.replies && comment.replies.length">
                <div
                  class="flex items-start"
                  v-for="reply in comment.replies"
                  :key="reply.id"
                >
                  <img
                    class="w-[24px] h-[24px] rounded-full object-cover mr-2 border border-white shadow-sm"
                    :src="reply.byUser.imgUrl || '../styles/icon/def-user.png'"
                    alt=""
                  />
                  <div>
                    <p class="font-medium text-[#323338] text-sm">{{ reply.byUser.fullname }}</p>
                    <p class="text-[#676879] text-sm">{{ reply.txt }}</p>
                  </div>
                </div>
              </div>

              <div v-if="comment.id === replayToShow" class="mt-3 flex animate-fade-in">
                <div class="mr-2">
                  <div>
                    <img
                      class="w-[24px] h-[24px] rounded-full object-cover border border-white shadow-sm"
                      :src="loggedinUser?.imgUrl || '../styles/icon/def-user.png'"
                      alt=""
                    />
                  </div>
                </div>
                <div class="flex-1">
                  <div class="mb-2">
                    <div>
                      <input 
                        type="text" 
                        v-model="replayTxt" 
                        class="w-full px-3 py-2 border border-[#e0e3e7] rounded-md focus:outline-none focus:border-[#0073ea] focus:ring-2 focus:ring-[#0073ea]/20 transition-all duration-200" 
                        placeholder="Write a reply..."
                      />
                    </div>

                    <div class="flex justify-between items-center mt-2">
                      <div>
                        <span class="flex items-center text-sm text-[#676879] hover:text-[#0073ea] transition-colors duration-200">
                          <font-awesome-icon class="mr-1" icon="file" />
                          <a href class="no-underline text-[#676879] hover:text-[#0073ea]">Add files</a>
                        </span>
                      </div>
                      <div @click="addReplay(comment.id)">
                        <button class="bg-gradient-to-r from-[#0073ea] to-[#0060d9] text-white px-3 py-1 rounded-md text-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0">Reply</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div v-else class="flex flex-col items-center justify-center py-6 text-center">
            <font-awesome-icon icon="comments" class="text-4xl text-gray-300 mb-3" />
            <p class="text-[#676879] text-lg">No comments yet</p>
            <p class="text-[#676879] text-sm mb-3">Be the first to add a comment to this task.</p>
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
      if (!this.replayTxt.trim()) return

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
      console.log(commentId)
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
      if (!this.updateTxt.trim()) return

      var comment = {
        id: utilService.makeId(),
        byUser: {
          id: this.loggedinUser?._id || utilService.makeId(),
          fullname: this.loggedinUser?.fullname || 'Guest',
          imgUrl:
            this.loggedinUser?.imgUrl ||
            'https://cdn1.monday.com/dapulse_default_photo.png',
        },
        txt: this.updateTxt,
        time: Date.now(),
        replies: [],
        isLike: false,
      }

      const copyTask = JSON.parse(JSON.stringify(this.currTask))
      copyTask.comments.unshift(comment)

      this.$store.dispatch({
        type: 'editTask',
        task: copyTask,
        groupId: this.groupId,
      })

      this.updateTxt = ''
    },
  },
}
</script>

<style></style>