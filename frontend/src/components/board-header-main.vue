<template>
  <section>
    <div class="board-header-main">
      <div>
        <div class="title">
          <!-- <h1>{{ board.title }}</h1> -->
          <h1><input type="text" /></h1>

          <span @click="onClickInfo" :class="getInfo">
            <font-awesome-icon class="info-icon" icon="circle-info" />
          </span>

          <span @click="onClickStar" :class="getStar">
            <img class="star-icon" src="../styles/icon/star-yellow.png" />
          </span>
        </div>
      </div>

      <div class="right-side-header">
        <div class="last-seen-btn">
          <button>Last seen</button>
        </div>

        <div>
          <button>
            <img class="invite-user-img" src="../styles/icon/user.png" alt="" />
            Invite/ <span>4</span>
          </button>
        </div>

        <div class="invite">
          <button class="invite">Activty</button>
        </div>

        <div class="add-to-board">
          <p><span>+</span> Add to board</p>
        </div>

        <div class="container-dots">
          <font-awesome-icon class="dots-icon" icon="ellipsis" />
        </div>
      </div>
    </div>
    <p class="subtitle" v-if="isInfo">
      Learn how to create tasks that are clear, transparent, and on point.
    </p>
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
      isInfo: true,
    }
  },
  components: {},
  computed: {},
  methods: {},
}
</script>
