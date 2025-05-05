<template>
  <section class="min-h-screen bg-white">
    <!-- Header -->
    <header class="flex justify-between items-center h-20 px-4 bg-gray-50 border-b border-gray-200">
      <!-- Logo -->
      <div class="flex items-center cursor-pointer" @click="goHome">
        <div class="relative ml-4 group transition-transform duration-300 hover:scale-105">
          <div class="absolute border-2 border-emerald-500 w-[50px] h-[25px]"></div>
          <div class="absolute w-[25px] h-[50px] border-2 border-amber-400 left-[40px] top-[10px]">
            <div class="absolute w-[2px] h-[2px] bg-emerald-500 rounded-full left-[-2px] top-[11px]"></div>
          </div>
          <div class="absolute w-[25px] h-[25px] border-2 border-rose-500 left-[53px]">
            <div class="absolute w-[2px] h-[2px] bg-amber-400 rounded-full left-[8px] bottom-[-2px]"></div>
          </div>
        </div>
        <div class="relative ml-16 text-3xl font-semibold">
          <span class="text-emerald-500">T</span>as<span class="text-amber-400">k</span>da<span class="text-rose-500">y</span>
        </div>
      </div>

      <!-- Demo Button -->
      <div class="flex items-center px-4 py-2 rounded-full border border-gray-300 cursor-pointer hover:bg-gray-100 transition-colors duration-200" @click="goDemo">
        <button class="bg-transparent text-gray-800 border-none cursor-pointer">See Demo</button>
        <font-awesome-icon class="text-gray-800 ml-2" icon="arrow-right" />
      </div>
    </header>

    <!-- Logged in User Display -->
    <div v-if="loggedinUser" class="flex flex-col items-center mt-16">
      <h3 class="text-xl font-medium mb-2">
        Loggedin User: {{ loggedinUser.username }}
      </h3>
      <button 
        @click="doLogout" 
        class="mt-4 bg-blue-600 text-white py-3 px-6 rounded hover:bg-blue-700 transition-colors duration-200 shadow-sm"
      >
        Logout
      </button>
    </div>

    <!-- Login/Signup Form Container -->
    <div v-if="!loggedinUser" class="flex flex-col items-center max-w-md mx-auto mt-16 px-4">
      <div class="w-full text-center">
        <p class="text-3xl font-semibold mb-5">{{ isLogin ? 'Log in to your account' : 'Sign up for your account' }}</p>
        <p class="text-gray-600 mb-5">Enter your work user name and password</p>
      </div>

      <!-- Login Form -->
      <form v-if="isLogin" @submit.prevent="doLogin" class="w-full max-w-sm">
        <input
          type="text"
          placeholder="Username"
          v-model="loginCred.username"
          class="w-full mb-3 px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <input
          type="password"
          placeholder="Password"
          v-model="loginCred.password"
          class="w-full mb-4 px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button 
          type="submit"
          class="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition-colors duration-200 shadow-sm"
        >
          Login
        </button>
      </form>

      <!-- Signup Form -->
      <form v-if="!isLogin" @submit.prevent="doSignup" class="w-full max-w-sm">
        <input
          type="text"
          v-model="signupCred.fullname"
          placeholder="Your full name"
          class="w-full mb-3 px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <input
          type="text"
          placeholder="Username"
          v-model="signupCred.username"
          class="w-full mb-3 px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <input
          type="password"
          placeholder="Password"
          v-model="signupCred.password"
          class="w-full mb-4 px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button 
          type="submit"
          class="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition-colors duration-200 shadow-sm"
        >
          Signup
        </button>
      </form>

      <!-- Error Message -->
      <p class="mt-3 text-red-500">{{ msg }}</p>

      <!-- Or Sign in with separator -->
      <div class="flex items-center justify-center w-full my-6">
        <div class="flex-grow border-t border-gray-300"></div>
        <p class="mx-4 text-sm text-gray-500">Or Sign in with</p>
        <div class="flex-grow border-t border-gray-300"></div>
      </div>

      <!-- Google Sign In -->
      <button type="button" class="flex items-center justify-center w-full max-w-sm py-2.5 border border-gray-300 rounded hover:bg-gray-50 transition-colors duration-200">
        <img
          class="w-5 h-5 mr-3"
          src="../styles/icon/logo-google.svg"
          aria-hidden="true"
          alt=""
        />
        <div class="font-medium text-gray-700">Google</div>
      </button>

      <!-- Switch between Login/Signup -->
      <div class="mt-6 text-sm text-center">
        <div v-if="isLogin">
          Don't have an account yet?
          <span @click="isLogin = false" class="text-blue-500 cursor-pointer hover:underline">Sign up</span>
        </div>
        <div v-if="!isLogin">
          Already have an account? 
          <span @click="isLogin = true" class="text-blue-500 cursor-pointer hover:underline">Login</span>
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