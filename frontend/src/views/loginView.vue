<template>
  <section class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
    <!-- Header -->
    <header class="flex items-center justify-between px-6 lg:px-8 h-20 bg-white shadow-sm">
      <!-- Logo -->
      <div class="relative flex items-center space-x-2 cursor-pointer group" @click="goHome">
        <div class="relative w-16 h-10">
          <div class="absolute w-[50px] h-[25px] border-2 border-green-500 transition-transform group-hover:scale-105"></div>
          <div class="absolute w-[25px] h-[50px] left-10 top-2.5 border-2 border-yellow-400 transition-transform group-hover:scale-105">
            <div class="absolute w-1.5 h-1.5 bg-green-500 top-2.5 left-[-3px] rounded-full"></div>
          </div>
          <div class="absolute w-[25px] h-[25px] left-[53px] border-2 border-red-500 transition-transform group-hover:scale-105">
            <div class="absolute w-1.5 h-1.5 bg-yellow-400 bottom-[-3px] left-2 rounded-full"></div>
          </div>
        </div>
        <div class="text-2xl font-bold ml-[115px] hidden sm:inline bg-gradient-to-r from-green-500 via-yellow-400 to-red-500 bg-clip-text text-transparent">
          Taskday
        </div>
      </div>

      <!-- Demo Button -->
      <button @click="goDemo" class="flex items-center space-x-3 px-5 py-2.5 bg-white border border-gray-200 rounded-full cursor-pointer hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 shadow-sm">
        <span class="text-gray-700 font-medium">See Demo</span>
        <font-awesome-icon class="text-gray-600" icon="arrow-right" />
      </button>
    </header>

    <!-- Logged in user -->
    <div v-if="loggedinUser" class="flex flex-col items-center justify-center mt-20">
      <div class="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full mx-4">
        <h3 class="text-xl font-medium text-gray-800 mb-4">Welcome back, {{ loggedinUser.username }}!</h3>
        <button
          @click="doLogout"
          class="w-full px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 font-medium"
        >
          Logout
        </button>
      </div>
    </div>

    <!-- Login/Signup Form -->
    <div v-if="!loggedinUser" class="flex flex-col items-center mt-20 px-4">
      <div class="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full">
        <div class="text-center mb-8">
          <h1 class="text-3xl font-bold text-gray-900">
            {{ isLogin ? 'Welcome back' : 'Create account' }}
          </h1>
          <p class="text-gray-600 mt-3">
            {{ isLogin ? 'Please enter your details' : 'Get started with your account' }}
          </p>
        </div>

        <!-- Login -->
        <form v-if="isLogin" @submit.prevent="doLogin" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input 
              v-model="loginCred.username" 
              type="text" 
              placeholder="Enter your username" 
              class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input 
              v-model="loginCred.password" 
              type="password" 
              placeholder="••••••••" 
              class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>
          <button class="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium mt-6">
            Sign in
          </button>
        </form>

        <!-- Signup -->
        <form v-if="!isLogin" @submit.prevent="doSignup" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input 
              v-model="signupCred.fullname" 
              type="text" 
              placeholder="Enter your full name" 
              class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input 
              v-model="signupCred.username" 
              type="text" 
              placeholder="Choose a username" 
              class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input 
              v-model="signupCred.password" 
              type="password" 
              placeholder="Create a strong password" 
              class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>
          <button class="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium mt-6">
            Create account
          </button>
        </form>

        <!-- Error Message -->
        <p v-if="msg" class="mt-4 text-sm text-red-600 bg-red-50 p-3 rounded-lg">{{ msg }}</p>

        <!-- Social Login -->
        <div class="relative mt-8 mb-6">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-200"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-4 text-gray-500 bg-white">Or continue with</span>
          </div>
        </div>

        <button class="w-full flex items-center justify-center space-x-3 border border-gray-300 rounded-lg px-4 py-3 bg-white hover:bg-gray-50 transition-colors duration-200">
          <img src="../styles/icon/logo-google.svg" class="h-5" alt="Google" />
          <span class="text-gray-700 font-medium">Google</span>
        </button>

        <!-- Switch -->
        <div class="text-sm text-center mt-6">
          <div v-if="isLogin">
            <span class="text-gray-600">Don't have an account?</span>
            <button @click="isLogin = false" class="ml-1 text-blue-600 hover:text-blue-700 font-medium">
              Sign up
            </button>
          </div>
          <div v-else>
            <span class="text-gray-600">Already have an account?</span>
            <button @click="isLogin = true" class="ml-1 text-blue-600 hover:text-blue-700 font-medium">
              Sign in
            </button>
          </div>
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
