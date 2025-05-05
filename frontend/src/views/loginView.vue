<template>
  <section class="min-h-screen bg-white flex flex-col">
    <header class="bg-[#f7f7f7] h-[80px] border-b border-[#e0e0e0] flex justify-between items-center px-2 sm:px-4">
      <div class="flex items-center cursor-pointer w-[80px]" @click="goHome">
        <div class="relative text-xl font-bold left-[30px] top-[-13px]">
          <div class="absolute border-2 border-[#00c875] w-[50px] h-[25px]"></div>
          <div class="absolute w-[25px] h-[50px] border-2 border-[#ffcb00] left-[40px] top-[10px]">
            <div class="absolute w-[2px] h-[2px] bg-[#00c875] left-[-2px] top-[11px]"></div>
          </div>
          <div class="absolute w-[25px] h-[25px] left-[53px] border-2 border-[#e2435c]">
            <div class="absolute w-[2px] h-[2px] bg-[#ffcb00] left-[8px] bottom-[-2px]"></div>
          </div>
        </div>
        <div class="relative left-[115px] text-[30px] hidden sm:inline">
          <span class="text-[#00c875]">T</span>as<span class="text-[#ffcb00]">k</span>da<span class="text-[#e2435c]">y</span>
        </div>
      </div>
      <div class="flex items-center bg-[#f7f7f7] px-4 py-2 rounded-[25px] border border-gray-300 cursor-pointer" @click="goDemo">
        <button class="bg-[#f7f7f7] text-black cursor-pointer border-none">See Demo</button>
        <font-awesome-icon class="text-black ml-2" icon="arrow-right" />
      </div>
    </header>

    <div v-if="loggedinUser" class="mt-[60px] text-center">
      <h3>
        Loggedin User:
        {{ loggedinUser.username }}
      </h3>
      <button @click="doLogout" class="mt-4 mb-4 bg-[#0073ea] text-white border-none px-4 py-2 rounded h-[45px] cursor-pointer">Logout</button>
    </div>

    <div v-if="!loggedinUser" class="flex flex-col items-center mt-[60px] sm:mt-[60px]">
      <div class="mb-4 text-center">
        <p v-if="isLogin" class="text-3xl mb-2">Log in to your account</p>
        <p v-if="!isLogin" class="text-3xl mb-2">Sign up in to your account</p>
      </div>

      <p class="mb-1">Enter your work user name and password</p>

      <form v-if="isLogin" class="flex flex-col items-center w-[90vw] max-w-[380px]" @submit.prevent="doLogin">
        <input
          type="text"
          placeholder="Username"
          v-model="loginCred.username"
          class="my-1 w-full rounded border border-gray-300 px-3 h-10 focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
        <input
          type="password"
          placeholder="Password"
          v-model="loginCred.password"
          class="my-1 w-full rounded border border-gray-300 px-3 h-10 focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
        <button class="w-full my-4 bg-[#0073ea] text-white border-none px-4 py-2 rounded h-[45px] cursor-pointer">Login</button>
      </form>

      <form v-if="!isLogin" class="flex flex-col items-center w-[90vw] max-w-[380px]" @submit.prevent="doSignup">
        <input
          type="text"
          v-model="signupCred.fullname"
          placeholder="Your full name"
          class="my-1 w-full rounded border border-gray-300 px-3 h-10 focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
        <input
          type="text"
          placeholder="Username"
          v-model="signupCred.username"
          class="my-1 w-full rounded border border-gray-300 px-3 h-10 focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
        <input
          type="password"
          placeholder="Password"
          v-model="signupCred.password"
          class="my-1 w-full rounded border border-gray-300 px-3 h-10 focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
        <button class="w-full my-4 bg-[#0073ea] text-white border-none px-4 py-2 rounded h-[45px] cursor-pointer">Signup</button>
      </form>
      <p class="text-red-500">{{ msg }}</p>

      <div class="flex items-center justify-center mb-2 w-full max-w-[380px]">
        <span class="flex-1 border-t border-gray-300 mx-4"></span>
        <h2 class="text-base font-medium">Or Sign in with</h2>
        <span class="flex-1 border-t border-gray-300 mx-4"></span>
      </div>

      <button type="button" class="flex items-center bg-white border border-gray-300 rounded px-3 py-2 mb-2 w-full max-w-[380px]">
        <img
          class="h-4 mr-2"
          src="../styles/icon/logo-google.svg"
          aria-hidden="true"
          alt=""
        />
        <div class="" aria-label="Login with Google">
          Google
        </div>
      </button>

      <div v-if="isLogin" class="mt-2 text-center">
        <div>
          Don't have an account yet?
          <span @click="isLogin = false" class="text-[#0fa2e2] cursor-pointer">Sign up</span>
        </div>
      </div>
      <div v-if="!isLogin" class="mt-2 text-center">
        <div>
          Already have an account? <span @click="isLogin = true" class="text-[#0fa2e2] cursor-pointer">Login</span>
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