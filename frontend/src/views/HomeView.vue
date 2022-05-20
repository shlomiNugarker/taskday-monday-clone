<template>
  <section class="home-view">
    <!-- <h1 @click="goDemo">Hello home go</h1> -->
    <div class="header-container">
      <header class="header">
        <div class="container-logo">
          <div class="logo">
            <div class="blue"></div>
            <div class="yellow">
              <div class="green-dot"></div>
            </div>
            <div class="red">
              <div class="yellow-dot"></div>
            </div>
          </div>
          <div class="logo-txt">
            <span class="green">T</span>as<span class="yellow">k</span>da<span
              class="red"
              >y</span
            >
          </div>
        </div>

        <nav class="nav-bar">
          <ul>
            <li class="contact-btn">
              <button>Contact sales</button>
            </li>
            <li class="login-btn" @click="goLogin">
              <button>Log in</button>
            </li>
            <li class="go-demo-btn" @click="goDemo">
              <button>See Demo</button>
              <font-awesome-icon class="arrow-right" icon="arrow-right" />
            </li>
          </ul>
        </nav>
      </header>
    </div>

    <div class="title-container">
      <div class="title">
        <p>A platform built for a</p>
        <p>new way of working</p>
        <span
          >What would you like to manage with
          <span class="green">T</span>as<span class="yellow">k</span>da<span
            class="red"
            >y</span
          >?</span
        >
      </div>
    </div>

    <div class="see-demo-btn-container">
      <button @click="goDemo">
        <span> See Demo </span>
        <font-awesome-icon class="arrow-right" icon="arrow-right" />
      </button>
    </div>

    <!-- <div class="carrousel-container">
      <el-carousel :interval="4000" type="card" height="200px">
        <el-carousel-item v-for="url in imgs" :key="url">
          <img :src="url" alt="" />
        </el-carousel-item>
      </el-carousel>
    </div> -->
    <div class="imgs-container">
      <div class="img-container">
        <img class="img img-1" src="../styles/images/1.png" alt="" />
      </div>
      <div class="img-container">
        <img class="img img-2" src="../styles/images/2.png" alt="" />
      </div>
      <div class="img-container">
        <img class="img img-3" src="../styles/images/3.png" alt="" />
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      imgs: [
        '../styles/images/1.png',
        '../styles/images/2.png',
        '../styles/images/3.png',
      ],
    }
  },
  computed: {
    boardsList() {
      return this.$store.getters.boardsList
    },
  },
  created() {
    this.$store.dispatch({ type: 'getBoardsList' })
    this.loadUsers()
  },
  methods: {
    goDemo() {
      var boardId = this.boardsList[0].boardId
      console.log(boardId)
      this.$router.push(`/board/${boardId}`)
    },
    goLogin() {
      var boardId = this.boardsList[0].boardId
      console.log(boardId)
      this.$router.push(`/login/`)
    },
    loadUsers() {
      this.$store.dispatch({ type: 'loadUsers' })
    },
  },
  components: {},
}
</script>

<style scoped>
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
