<template>
  <section class="min-h-screen flex flex-col login-page-container relative">
    <div class="animated-bg fixed inset-0 z-0"></div>
    <header class="bg-gradient-to-r from-gray-50 to-[#f7f7f7] h-20 border-b border-[#e0e0e0] flex justify-between items-center px-6 shadow-sm">
      <div class="cursor-pointer w-20 logo-container" @click="goHome">
        <div class="relative text-2xl font-bold left-7.5 -top-3.5 sm:top-[-13px] max-sm:-top-7 logo-animation">
          <div class="absolute border-2 border-[#00c875] w-[50px] h-[25px] rounded-sm"></div>
          <div class="absolute w-[25px] h-[50px] border-2 border-[#ffcb00] left-10 top-2.5 rounded-sm">
            <div class="absolute w-0.5 h-0.5 bg-[#00c875] -left-0.5 top-[11px]"></div>
          </div>
          <div class="absolute w-[25px] h-[25px] left-[53px] border-2 border-[#e2435c] rounded-sm">
            <div class="absolute w-0.5 h-0.5 bg-[#ffcb00] left-2 -bottom-0.5"></div>
          </div>
        </div>
        <div class="relative text-3xl left-[115px] inline max-sm:hidden logo-text">
          <span class="text-[#00c875]">T</span>as<span class="text-[#ffcb00]">k</span>da<span class="text-[#e2435c]">y</span>
        </div>
      </div>
      <div class="bg-white flex items-center p-2.5 rounded-full cursor-pointer border border-solid shadow-md hover:shadow-lg transition-all duration-300" @click="goDemo">
        <button class="bg-transparent text-gray-700 font-medium cursor-pointer border-none flex items-center">
          <span class="mr-2">See Demo</span>
          <font-awesome-icon class="text-[#0073ea]" icon="arrow-right" />
        </button>
      </div>
    </header>

    <div class="flex-grow flex items-center justify-center py-10 px-4 bg-gradient-to-br from-[#f2f5fa] via-white to-[#f0f5ff]">
      <div class="w-full max-w-md fade-in">
        <!-- Logged in user view -->
        <div class="glass-card" v-if="loggedinUser">
          <div class="text-center">
            <div class="inline-block rounded-full bg-[#0073ea] bg-opacity-10 p-3 mb-4">
              <font-awesome-icon icon="user-circle" class="text-[#0073ea] text-3xl" />
            </div>
            <h3 class="text-xl font-bold text-gray-800 mb-2">
              Welcome back, {{ loggedinUser.username }}!
            </h3>
            <p class="text-gray-500 mb-6">You're successfully logged in</p>
            <button class="w-full main-btn" @click="doLogout">Logout</button>
          </div>
        </div>

        <!-- Login/Signup form -->
        <div v-if="!loggedinUser" class="glass-card">
          <div class="mb-6 text-center">
            <h2 v-if="isLogin" class="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h2>
            <h2 v-if="!isLogin" class="text-3xl font-bold text-gray-800 mb-2">Create Account</h2>
            <p class="text-gray-500">{{ isLogin ? 'Enter your credentials to continue' : 'Join us to boost your productivity' }}</p>
          </div>

          <!-- Login Form -->
          <form v-if="isLogin" class="space-y-4" @submit.prevent="doLogin">
            <div class="relative">
              <font-awesome-icon icon="user" class="absolute text-gray-400 top-3 left-3 transition-transform duration-200 group-focus-within:scale-110" />
              <input
                class="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:border-[#0073ea] focus:ring-2 focus:ring-[#0073ea] focus:ring-opacity-20 transition-all duration-200 outline-none"
                type="text"
                placeholder="Username"
                v-model="loginCred.username"
                @focus="$event.target.previousElementSibling.classList.add('scale-110')"
                @blur="$event.target.previousElementSibling.classList.remove('scale-110')"
              />
            </div>
            <div class="relative">
              <font-awesome-icon icon="lock" class="absolute text-gray-400 top-3 left-3 transition-transform duration-200 group-focus-within:scale-110" />
              <input
                class="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:border-[#0073ea] focus:ring-2 focus:ring-[#0073ea] focus:ring-opacity-20 transition-all duration-200 outline-none"
                type="password"
                placeholder="Password"
                v-model="loginCred.password"
                @focus="$event.target.previousElementSibling.classList.add('scale-110')"
                @blur="$event.target.previousElementSibling.classList.remove('scale-110')"
              />
            </div>
            <button class="w-full main-btn">Login</button>
          </form>

          <!-- Signup Form -->
          <form v-if="!isLogin" class="space-y-4" @submit.prevent="doSignup">
            <div class="relative">
              <font-awesome-icon icon="user-tag" class="absolute text-gray-400 top-3 left-3 transition-transform duration-200 group-focus-within:scale-110" />
              <input
                class="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:border-[#0073ea] focus:ring-2 focus:ring-[#0073ea] focus:ring-opacity-20 transition-all duration-200 outline-none"
                type="text"
                v-model="signupCred.fullname"
                placeholder="Your full name"
                @focus="$event.target.previousElementSibling.classList.add('scale-110')"
                @blur="$event.target.previousElementSibling.classList.remove('scale-110')"
              />
            </div>
            <div class="relative">
              <font-awesome-icon icon="user" class="absolute text-gray-400 top-3 left-3 transition-transform duration-200 group-focus-within:scale-110" />
              <input
                class="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:border-[#0073ea] focus:ring-2 focus:ring-[#0073ea] focus:ring-opacity-20 transition-all duration-200 outline-none"
                type="text"
                placeholder="Username"
                v-model="signupCred.username"
                @focus="$event.target.previousElementSibling.classList.add('scale-110')"
                @blur="$event.target.previousElementSibling.classList.remove('scale-110')"
              />
            </div>
            <div class="relative">
              <font-awesome-icon icon="lock" class="absolute text-gray-400 top-3 left-3 transition-transform duration-200 group-focus-within:scale-110" />
              <input
                class="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:border-[#0073ea] focus:ring-2 focus:ring-[#0073ea] focus:ring-opacity-20 transition-all duration-200 outline-none"
                type="password"
                placeholder="Password"
                v-model="signupCred.password"
                @focus="$event.target.previousElementSibling.classList.add('scale-110')"
                @blur="$event.target.previousElementSibling.classList.remove('scale-110')"
              />
            </div>
            <button class="w-full main-btn signup-btn">Sign Up</button>
          </form>

          <div v-if="msg" class="mt-4 p-3 rounded-lg" :class="msg.includes('Failed') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'">
            {{ msg }}
          </div>

          <div class="flex items-center justify-center my-6">
            <span class="w-full border-t border-gray-300"></span>
            <p class="text-sm text-gray-500 px-4">Or continue with</p>
            <span class="w-full border-t border-gray-300"></span>
          </div>

          <button type="button" class="w-full flex items-center justify-center google-btn">
            <img
              class="h-5 mr-3"
              src="../styles/icon/logo-google.svg"
              aria-hidden="true"
              alt=""
            />
            <div class="font-medium">
              Continue with Google
            </div>
          </button>

          <div class="mt-6 text-center">
            <div v-if="isLogin">
              Don't have an account?
              <span class="text-[#0073ea] font-medium cursor-pointer hover:underline" @click="isLogin = false">Sign up</span>
            </div>
            <div v-if="!isLogin">
              Already have an account? <span class="text-[#0073ea] font-medium cursor-pointer hover:underline" @click="isLogin = true">Login</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <footer class="bg-gray-50 py-4 text-center text-gray-500 text-sm border-t border-gray-200">
      <p>© {{ new Date().getFullYear() }} Taskday. All rights reserved.</p>
    </footer>
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

<style scoped>
.login-page-container {
  font-family: 'Inter', 'Rubik', 'Arial', sans-serif;
  position: relative;
  min-height: 100vh;
  overflow-x: hidden;
}

.animated-bg {
  pointer-events: none;
  background: radial-gradient(circle at 20% 30%, #00c87522 0%, transparent 60%),
              radial-gradient(circle at 80% 70%, #0073ea22 0%, transparent 60%),
              linear-gradient(120deg, #f2f5fa 0%, #f0f5ff 100%);
  width: 100vw;
  height: 100vh;
  animation: bg-move 16s ease-in-out infinite alternate;
}

@keyframes bg-move {
  0% {
    background-position: 20% 30%, 80% 70%, 0% 0%;
  }
  100% {
    background-position: 30% 40%, 70% 60%, 100% 100%;
  }
}

.logo-container {
  transform: scale(1);
  transition: transform 0.3s cubic-bezier(.4,2,.6,1);
}

.logo-container:hover {
  transform: scale(1.07) rotate(-2deg);
}

.logo-animation {
  position: relative;
  animation: float 6s ease-in-out infinite;
}

.logo-text {
  font-weight: 700;
  letter-spacing: -0.5px;
  text-shadow: 0 2px 8px #00c87511;
}

@keyframes float {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-5px);
  }
  100% {
    transform: translateY(0px);
  }
}

.fade-in {
  animation: fadeIn 1.1s cubic-bezier(.4,2,.6,1);
  opacity: 1;
  animation-fill-mode: forwards;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

.glass-card {
  background: rgba(255,255,255,0.85);
  border-radius: 22px;
  box-shadow: 0 8px 32px 0 rgba(31,38,135,0.10);
  backdrop-filter: blur(8px) saturate(1.2);
  -webkit-backdrop-filter: blur(8px) saturate(1.2);
  border: 1.5px solid rgba(255,255,255,0.25);
  padding: 2.5rem 2rem;
  margin: 0 auto;
  transition: box-shadow 0.3s cubic-bezier(.4,2,.6,1), background 0.3s;
}
.glass-card:hover {
  box-shadow: 0 12px 40px 0 rgba(31,38,135,0.16);
  background: rgba(255,255,255,0.93);
}

input {
  caret-color: #0073ea;
}

input::placeholder {
  color: #aaa;
  opacity: 1;
}

button {
  transform: translateY(0);
  transition: all 0.3s cubic-bezier(.4,2,.6,1);
}

button:active {
  transform: translateY(1px) scale(0.98);
}

.main-btn {
  background: linear-gradient(90deg, #0073ea 0%, #00c875 100%);
  color: #fff;
  border: none;
  padding: 0.85rem 0;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1.1rem;
  box-shadow: 0 2px 8px #0073ea22;
  letter-spacing: 0.5px;
  transition: background 0.2s, box-shadow 0.2s, filter 0.2s;
  filter: brightness(1);
}
.main-btn:hover {
  background: linear-gradient(90deg, #00c875 0%, #0073ea 100%);
  box-shadow: 0 4px 16px #00c87533;
  filter: brightness(1.08);
}
.signup-btn {
  background: linear-gradient(90deg, #00c875 0%, #ffcb00 100%);
  color: #fff;
}
.signup-btn:hover {
  background: linear-gradient(90deg, #ffcb00 0%, #00c875 100%);
}

.google-btn {
  background: rgba(255,255,255,0.95);
  border: 1.5px solid #e0e0e0;
  border-radius: 10px;
  color: #444;
  font-weight: 500;
  box-shadow: 0 2px 8px #e0e0e022;
  transition: box-shadow 0.2s, border 0.2s, background 0.2s;
  margin-bottom: 0.5rem;
  position: relative;
  overflow: hidden;
}
.google-btn::after {
  content: '';
  position: absolute;
  left: 0; top: 0; width: 100%; height: 100%;
  background: linear-gradient(90deg, #fff 60%, #f2f5fa 100%);
  opacity: 0;
  transition: opacity 0.3s;
  z-index: 0;
}
.google-btn:hover {
  box-shadow: 0 4px 16px #0073ea22;
  border: 1.5px solid #0073ea;
  background: #f7fbff;
}
.google-btn:hover::after {
  opacity: 0.18;
}

@media (max-width: 640px) {
  .login-page-container {
    background-attachment: fixed;
  }
  .glass-card {
    padding: 1.2rem 0.5rem;
    max-width: 98vw;
  }
  .fade-in {
    padding: 0;
  }
}
</style>
