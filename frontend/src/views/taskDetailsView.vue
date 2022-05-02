<template>
  <section class="task-details" ref="detailModal">
    <div class="container">
      <div class="close-details-btn" @click="closeDetails">
        <font-awesome-icon class="close-icon" icon="x" />
      </div>

      <div class="details-input flex">
        <h1>task title</h1>
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
        <!-- //LOOK -->
        <div class="input-update">
          <input
            v-model="currUpdate"
            type="text"
            placeholder="Write an update"
          />
          <div>
            <button @click="sendUpdate()">update</button>
          </div>
        </div>
        <div class="send-update">
          <div>
            <!-- ASK - think to remove this "mail" -->
            <!-- <p>Write updates via email:</p> -->
          </div>
        </div>
        <!-- //LOOK -->
        <div class="space-view">
          <div class="post-component">
            <div class="post-header">
              <div class="left-side-post">
                <div class="img-user-container">
                  <img class="user-img" src="" />
                </div>
                <div class="title">full name</div>

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
              <p class="text">message</p>
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

              <!-- //REMOVE - we wont do replay option, only like -->
              <div class="right-btn">
                <span>
                  <font-awesome-icon class="reply-icon" icon="reply" />
                </span>
                <p @click="isReply = !isReply">Reply</p>
              </div>
            </div>
            <div class="reply-container" v-if="isReply">
              <div class="left-side-reply">
                <div>
                  <!-- ITZIK - this line should word, fix it! -->
                  <!-- <img class="user-img" :src="updates.byMember.imgUrl" alt="" /> -->
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
            </div>
          </div>
        </div>
      </div>
      <div class="files-details-page detail-page"></div>
      <div class="activity-details-page detail-page"></div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'task-details',
  props: {},
  data() {
    return {
      //ITZIK
      tasksss: {
        id: 'c201',
        title:
          'Participate in the entire application lifecycle, focusing on coding and debugging.',
        status: 'Working on it',
        priority: 'Medium',
        members: [
          {
            _id: 'u103',
            fullname: 'Shlomi Nugarker',
            imgUrl:
              'https://cdn.pixabay.com/photo/2020/02/17/20/22/beard-4857726_960_720.jpg',
          },
          {
            _id: 'u103',
            fullname: 'Shlomi Nugarker',
            imgUrl:
              'https://cdn.pixabay.com/photo/2020/02/17/20/22/beard-4857726_960_720.jpg',
          },
        ],
        dates: {
          startDate: '',
          endDate: '',
        },
        updates: [
          {
            id: 'up100',
            byMember: {
              _id: 'u103',
              fullname: 'Shlomi Nugarker',
              imgUrl:
                'https://cdn.pixabay.com/photo/2020/02/17/20/22/beard-4857726_960_720.jpg',
            },
            message: 'change this JSON please',
            like: true,
          },
          {
            id: 'up101',
            byMember: {
              _id: 'u103',
              fullname: 'hare krishna',
              imgUrl:
                'https://cdn.pixabay.com/photo/2020/02/17/20/22/beard-4857726_960_720.jpg',
            },
            message: 'Jost for test',
            like: false,
          },
        ],
      },
      currUpdate: null,
      //ITZIK

      isReply: false,
      currDate: null,
      // task:null,
      task: null,
    }
  },
  components: {
    // avatarImg,
    // likeIcon,
    // Person
  },
  created() {
    // this.task = JSON.parse(JSON.stringify(this.$store.getters.getCurrTask))
    // socketService.emit(
    //   'chat task',
    //   JSON.parse(JSON.stringify(this.$store.getters.getCurrTask)).id
    // )
    // socketService.on('task changed', this.updateTask)
    //to run now func that save here in memory and save bpard
  },
  unmounted() {
    // socketService.off('chat task', this.task.id)
  },
  computed: {},
  methods: {
    updateTask(task) {
      this.task = task
      const groupId = this.$store.getters.getCurrGroupId
      this.$emit('addItemWithoutServer', groupId, this.task)
    },
    closeDetails() {
      this.$router.push('/board/someId') // need to change to real ID
    },
    sendUpdate() {
      this.task.updates.splice(0, 0, this.createEmptyUpdate(this.currUpdate))
      this.currUpdate = null
      this.editTask()
    },
    setLike(updateId) {
      var idx = this.task.updates.findIndex((update) => update.id === updateId)
      // console.log(idx);
      this.task.updates[idx].like = !this.task.updates[idx].like
      this.editTask()
    },
    async editTask() {
      const groupId = this.$store.getters.getCurrGroupId

      //bring this line back, need to save to server somehow whithout the "update board" -socket
      // save only and when you receiveMessageOnPort, also!!
      this.$emit('addItemWithoutServer', groupId, this.task)
      socketService.emit('task updated', this.task)
    },

    createEmptyUpdate(message = '') {
      return {
        id: 'up' + utilService.makeId(3),
        byMember: {
          _id: 'u101',
          fullname: 'Inbari Tzvik',
          imgUrl:
            'https://freedesignfile.com/upload/2019/04/Smiling-woman-hand-on-face-Stock-Photo.jpg',
        },
        message,
        like: false,
      }
    },
  },
}
</script>

<style></style>
