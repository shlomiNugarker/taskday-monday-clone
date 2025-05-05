<template>
  <section class="min-h-screen bg-gradient-to-br from-indigo-950 to-indigo-900 font-sans overflow-auto">
    <!-- Header -->
    <div class="fixed w-full bg-white/95 shadow-md backdrop-blur-sm z-50">
      <header class="flex items-center justify-between w-[90%] max-w-7xl mx-auto h-[70px] py-4 px-6">
        <!-- Logo -->
        <div class="flex items-center">
          <div class="relative mr-4 group cursor-pointer transition-transform duration-300 hover:scale-105">
            <div class="absolute border-2 border-emerald-500 w-[50px] h-[25px] transition-all duration-300"></div>
            <div class="absolute w-[25px] h-[50px] border-2 border-amber-400 left-[40px] top-[10px] transition-all duration-300">
              <div class="absolute w-[3px] h-[3px] bg-emerald-500 rounded-full left-[-2px] top-[11px]"></div>
            </div>
            <div class="absolute w-[25px] h-[25px] border-2 border-rose-500 left-[53px] transition-all duration-300">
              <div class="absolute w-[3px] h-[3px] bg-amber-400 rounded-full left-[8px] bottom-[-2px]"></div>
            </div>
          </div>
          <div class="relative font-semibold text-3xl tracking-tighter ml-6">
            <span class="text-emerald-500">T</span>as<span class="text-amber-400">k</span>da<span class="text-rose-500">y</span>
          </div>
        </div>

        <!-- Navigation -->
        <nav>
          <ul class="flex items-center">
            <li class="list-none ml-5">
              <button class="text-gray-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-200">
                Contact sales
              </button>
            </li>
            <li class="list-none ml-5" @click="goLogin">
              <button class="text-gray-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-200">
                Log in
              </button>
            </li>
            <li class="list-none ml-5 bg-indigo-500 px-5 py-2.5 rounded-full cursor-pointer flex items-center transition-all duration-300 hover:bg-indigo-600 hover:shadow-lg hover:shadow-indigo-500/30 hover:-translate-y-0.5" @click="goDemo">
              <button class="text-white font-medium text-sm">
                See Demo
              </button>
              <font-awesome-icon class="text-white ml-1.5" icon="arrow-right" />
            </li>
          </ul>
        </nav>
      </header>
    </div>

    <!-- Hero Section -->
    <div class="pt-[140px] px-6 md:px-10 flex flex-col items-center justify-center text-white">
      <div class="text-center">
        <h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight bg-gradient-to-r from-white to-indigo-100 bg-clip-text text-transparent drop-shadow-sm">
          A platform built for a
          <br>new way of working
        </h1>
        <p class="mt-6 text-base sm:text-lg md:text-xl opacity-90">
          What would you like to manage with 
          <span class="text-emerald-500">T</span>as<span class="text-amber-400">k</span>da<span class="text-rose-500">y</span>?
        </p>
      </div>

      <!-- CTA Button -->
      <button 
        @click="goDemo"
        class="mt-12 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white px-7 py-4 rounded-full text-lg font-medium flex items-center shadow-lg shadow-indigo-500/40 hover:shadow-xl hover:shadow-indigo-500/50 hover:-translate-y-1 active:translate-y-0 transition-all duration-300"
      >
        <span class="mr-2">See Demo</span>
        <font-awesome-icon icon="arrow-right" />
      </button>

      <!-- Images Container -->
      <div class="flex flex-col md:flex-row items-center justify-center mt-16 md:mt-20 w-full px-4 pb-10">
        <div class="transform -rotate-5 md:w-1/4 transition-all duration-300 hover:-translate-y-2 mb-8 md:mb-0">
          <img 
            class="w-3/4 md:w-full mx-auto rounded-xl shadow-lg hover:shadow-xl transition-all duration-300" 
            src="../styles/images/1.png" 
            alt="Taskday screenshot" 
          />
        </div>
        <div class="z-10 md:w-2/5 transition-all duration-300 hover:-translate-y-2 mb-8 md:mb-0 md:px-3">
          <img 
            class="w-11/12 md:w-full mx-auto rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300" 
            src="../styles/images/2.png" 
            alt="Taskday main interface" 
          />
        </div>
        <div class="transform rotate-5 md:w-1/4 transition-all duration-300 hover:-translate-y-2">
          <img 
            class="w-3/4 md:w-full mx-auto rounded-xl shadow-lg hover:shadow-xl transition-all duration-300" 
            src="../styles/images/3.png" 
            alt="Taskday features" 
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'HomeView',
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
      this.$router.push(`/board/${boardId}`)
    },
    goLogin() {
      this.$router.push('/login/')
    },
    loadUsers() {
      this.$store.dispatch({ type: 'loadUsers' })
    },
  },
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
