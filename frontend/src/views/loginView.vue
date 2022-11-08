<template>
  <section class="login-view">
    <header class="header-container">
      <div class="container-logo" @click="goHome">
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
      <div class="go-demo-btn" @click="goDemo">
        <button>See Demo</button>
        <font-awesome-icon class="arrow-right" icon="arrow-right" />
      </div>
    </header>

    <div class="loggedin-user" v-if="loggedinUser">
      <h3>
        Loggedin User:
        {{ loggedinUser.username }}
      </h3>
      <button @click="doLogout">Logout</button>
    </div>

    <div v-if="!loggedinUser" class="login-container">
      <div class="title">
        <p v-if="isLogin">Log in to your account</p>
        <p v-if="!isLogin">Sign up in to your account</p>
      </div>

      <p>Enter your work user name and password</p>

      <form v-if="isLogin" class="login-form" @submit.prevent="doLogin">
        <input
          type="text"
          placeholder="Username"
          v-model="loginCred.username"
        />
        <input
          type="password"
          placeholder="Password"
          v-model="loginCred.password"
        />
        <button>Login</button>
      </form>

      <form v-if="!isLogin" class="login-form" @submit.prevent="doSignup">
        <input
          type="text"
          v-model="signupCred.fullname"
          placeholder="Your full name"
        />
        <input
          type="text"
          placeholder="Username"
          v-model="signupCred.username"
        />
        <input
          type="password"
          placeholder="Password"
          v-model="signupCred.password"
        />
        <button>Signup</button>
      </form>
      <p>{{ msg }}</p>

      <div class="login-separator-component split-line">
        <span class="separator-line"></span>
        <h2>Or Sign in with</h2>
        <span class="separator-line"></span>
      </div>

      <button type="button" class="social-login-provider">
        <img
          class="social-login-logo"
          src="../styles/icon/logo-google.svg"
          aria-hidden="true"
          alt=""
        />
        <div class="social-login-provider-name" aria-label="Login with Google">
          Google
        </div>
      </button>

      <div v-if="isLogin" class="switch-login">
        <div>
          Don't have an account yet?
          <span @click="isLogin = false">Sign up</span>
        </div>
      </div>
      <div v-if="!isLogin" class="switch-login">
        <div>
          Already have an account? <span @click="isLogin = true">Login</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'login-signup',
  data() {
    return {
      isLogin: true,
      msg: '',
      loginCred: { username: 'user1', password: '123' },
      signupCred: {
        username: '',
        password: '',
        fullname: '',
        imgUrl: 'https://cdn1.monday.com/dapulse_default_photo.png',
      },
    }
  },
  computed: {
    users() {
      return this.$store.getters.users
    },
    loggedinUser() {
      return this.$store.getters.loggedinUser
    },
    boardsList() {
      return this.$store.getters.boardsList
    },
  },
  created() {
    this.loadUsers()
    this.$store.dispatch({ type: 'getBoardsList' })
  },
  methods: {
    goHome() {
      this.$router.push(`/`)
    },
    goDemo() {
      var boardId = this.boardsList[0].boardId
      this.$router.push(`/board/${boardId}`)
    },

    async doLogin() {
      if (!this.loginCred.username) {
        this.msg = 'Please enter username/password'
        return
      }
      try {
        await this.$store.dispatch({ type: 'login', userCred: this.loginCred })
        this.goDemo()
      } catch (err) {
        // console.log(err)
        this.msg = 'Failed to login'
      }
    },
    doLogout() {
      this.$store.dispatch({ type: 'logout' })
    },
    async doSignup() {
      if (
        !this.signupCred.fullname ||
        !this.signupCred.password ||
        !this.signupCred.username
      ) {
        this.msg = 'Please fill up the form'
        return
      }
      try {
        await this.$store.dispatch({
          type: 'signup',
          userCred: this.signupCred,
        })
        this.$router.push('/')
      } catch (err) {
        this.msg = 'Failed to signup'
      }
    },
    loadUsers() {
      this.$store.dispatch({ type: 'loadUsers' })
    },
    async removeUser(userId) {
      try {
        await this.$store.dispatch({ type: 'removeUser', userId })
        this.msg = 'User removed'
      } catch (err) {
        this.msg = 'Failed to remove user'
      }
    },
  },
}
</script>
