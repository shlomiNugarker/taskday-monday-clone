<template>
  <main>
    <section class="task-details" ref="detailModal">
      <div class="container">
        <div class="close-details-btn" @click="handleClose">
          <font-awesome-icon class="close-icon" icon="x" />
        </div>

        <div class="details-input">
          <h1>{{ currTask.title }}</h1>
          <!-- <input type="text" /> -->
          <div class="add-view-container flex">
            <img src="" alt="" />
            <!-- <span v-for="member in task.members" :key="member._id"> -->
            <!-- <el-avatar :src="member.imgUrl" /> -->
            <!-- <avatar-img></avatar-img> -->
            <!-- </span> -->
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
              <button @click="addUpdate">update</button>
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
                <div class="left-btn">
                  <span>
                    <font-awesome-icon class="like-icon" icon="thumbs-up" />
                  </span>
                  <p>like</p>
                </div>

                <div class="right-btn">
                  <span>
                    <font-awesome-icon class="reply-icon" icon="reply" />
                  </span>

                  <p>Reply</p>
                </div>
              </div>
              <!-- Replay -->

              <!-- <div class="reply-container">
              <div class="left-side-reply">
                <div>
                  <img class="user-img" src="" alt="" />
                </div>
              </div>
              <div class="right-side-reply">
                <div class="input-btns-container">
                  <div>
                    <input type="text" />
                  </div>

                  <div class="btns-container-reply">
                    <div>
                      <span>
                        <font-awesome-icon icon="file" />
                        <a href>Add files</a>
                      </span>
                    </div>
                    <div class="reply-btn">
                      <button>Reply</button>
                    </div>
                  </div>
                </div>
              </div>
            </div> -->

              <!--  -->
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
    }
  },
  components: {},
  created() {
    const taskId = this.$route.params.taskId
    const boardId = this.$route.params.boardId
    console.log('param-task:', taskId)
    console.log('param-board:', boardId)

    this.$store.dispatch({
      type: 'getCurrTask',
      boardId,
      taskId,
    })
  },
  unmounted() {},
  computed: {
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
    getCurrTask() {
      const taskId = this.$route.params.taskId
      const boardId = this.$route.params.boardId
      console.log('param-task:', taskId)
      console.log('param-board:', boardId)

      this.$store.dispatch({
        type: 'getCurrTask',
        boardId,
        taskId,
      })
    },
    addUpdate() {
      const newUpdete = {
        id: utilService.makeId(),
        // byUser: this.$store.getters.loggedinUser,
        byUser: {
          _id: 'u10zdf1',
          fullname: 'demo loggedin User',
          imgUrl:
            'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
        },
        txt: this.updateTxt,
        replies: [],
        likes: [],
      }
      console.log(newUpdete)
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
