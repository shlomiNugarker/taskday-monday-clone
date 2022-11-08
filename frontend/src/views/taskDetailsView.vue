<template>
  <main>
    <section class="task-details" ref="detailModal">
      <div class="container">
        <div class="close-details-btn" @click="handleClose">
          <font-awesome-icon class="close-icon" icon="x" />
        </div>

        <div class="details-input">
          <h1>{{ currTask.title }}</h1>
          <div class="add-view-container flex">
            <img src="" alt="" />

            <p class="subset-tab-details"></p>
            <div>
              <font-awesome-icon class="dots" icon="ellipsis" />
            </div>
          </div>
        </div>
      </div>

      <div class="details-container">
        <div class="update-details-page detail-page">
          <div class="input-update">
            <input
              type="text"
              placeholder="Write an update"
              v-model="updateTxt"
              @keyup.enter="addUpdate"
            />
            <div>
              <button class="update-btn" @click="addUpdate">update</button>
            </div>
          </div>
          <div class="send-update">
            <div></div>
          </div>

          <div class="space-view" v-if="currTask.comments.length">
            <div
              class="post-component"
              v-for="comment in currTask.comments"
              :key="comment._id"
            >
              <div class="post-header">
                <div class="left-side-post">
                  <div class="img-user-container">
                    <img class="user-img" :src="comment.byUser.imgUrl" />
                  </div>
                  <div class="title">{{ comment.byUser.fullname }}</div>

                  <div>
                    <p class="green logged-in"></p>
                  </div>
                </div>
                <div class="post-title">
                  <div>
                    <img
                      class="clock-post-img"
                      src="../styles/icon/clock.png"
                      alt
                    />
                  </div>
                  <div class="time">1d</div>
                  <div>
                    <img
                      class="alarm-post-img"
                      src="../styles/icon/alarm-details.png"
                      alt
                    />
                  </div>
                </div>
              </div>
              <div class="body-text">
                <p class="text">{{ comment.txt }}</p>
                <div class="seen-area">
                  <span>
                    <img class="view-icon" src="../styles/icon/view.png" alt />
                  </span>
                  <span class="seen">1</span>
                  <p>seen</p>
                </div>
              </div>

              <div class="post-actions">
                <div class="left-btn" @click="addLike(comment.id)">
                  <span>
                    <font-awesome-icon
                      :class="{ liked: comment.isLike }"
                      class="like-icon"
                      icon="thumbs-up"
                    />
                  </span>
                  <p :class="{ liked: comment.isLike }">Like</p>
                </div>

                <div class="right-btn" @click="showReplay(comment.id)">
                  <span>
                    <font-awesome-icon class="reply-icon" icon="reply" />
                  </span>
                  <p>Reply</p>
                </div>
              </div>
              <!-- Replay -->
              <div class="replies-container" v-if="!comment.replies.lenght">
                <div
                  class="curr-replay"
                  v-for="reply in comment.replies"
                  :key="reply"
                >
                  <img
                    class="user-icon"
                    src="../styles/icon/def-user.png"
                    alt=""
                  />
                  <div class="replay-area">
                    <p class="name">{{ reply.byUser.fullname }}</p>
                    <p class="replaies">{{ reply.txt }}</p>
                  </div>
                </div>
              </div>

              <div v-if="comment.id === replayToShow" class="reply-container">
                <div class="left-side-reply">
                  <div>
                    <img
                      class="user-img"
                      src="../styles/icon/def-user.png"
                      alt=""
                    />
                  </div>
                </div>
                <div class="right-side-reply">
                  <div class="input-btns-container">
                    <div>
                      <input type="text" v-model="replayTxt" />
                    </div>

                    <div class="btns-container-reply">
                      <div>
                        <span>
                          <font-awesome-icon icon="file" />
                          <a href>Add files</a>
                        </span>
                      </div>
                      <div class="reply-btn" @click="addReplay(comment.id)">
                        <button>Reply</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="files-details-page detail-page"></div>
        <div class="activity-details-page detail-page"></div>
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

<style></style>
