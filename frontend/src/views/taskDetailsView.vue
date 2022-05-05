<template>
  <section class="task-details" ref="detailModal">
    <div class="container">
      <div class="close-details-btn">
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
        <div class="input-update">
          <input type="text" placeholder="Write an update" />
          <div>
            <button>update</button>
          </div>
        </div>
        <div class="send-update">
          <div></div>
        </div>

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
</template>

<script>
export default {
  name: 'task-details',
  props: {},
  data() {
    return {}
  },
  components: {},
  created() {},
  unmounted() {},
  computed: {},
  methods: {},
}
</script>

<style></style>
