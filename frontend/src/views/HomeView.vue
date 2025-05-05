<template>
  <section class="bg-gradient-to-br from-[#040539] to-[#0a0a4d] min-h-screen font-[sofia-pro,Roboto,Helvetica,Arial,sans-serif] overflow-auto">
    <div class="fixed w-full bg-white/95 flex justify-center items-center shadow-md z-[100] backdrop-blur-sm">
      <header class="flex items-center justify-between w-[90%] h-[70px] p-[15px] max-w-[1400px]">
        <div class="flex items-center">
          <div class="relative text-2xl font-bold mt-[-25px] transition-transform duration-300 hover:scale-105">
            <div class="absolute border-2 border-[#00c875] w-[50px] h-[25px] transition-all duration-300"></div>
            <div class="absolute w-[25px] h-[50px] border-2 border-[#ffcb00] left-[40px] top-[10px] transition-all duration-300">
              <div class="absolute w-[3px] h-[3px] bg-[#00c875] left-[-2px] top-[11px] rounded-full"></div>
            </div>
            <div class="absolute w-[25px] h-[25px] left-[53px] border-2 border-[#e2435c] transition-all duration-300">
              <div class="absolute w-[3px] h-[3px] bg-[#ffcb00] left-[8px] bottom-[-2px] rounded-full"></div>
            </div>
          </div>
          <div class="relative left-[90px] top-[8px] text-[30px] font-semibold tracking-[-0.5px] md:block hidden">
            <span class="text-[#00c875]">T</span>as<span class="text-[#ffcb00]">k</span>da<span class="text-[#e2435c]">y</span>
          </div>
        </div>

        <nav>
          <ul class="flex items-center">
            <li class="list-none ml-[20px] transition-all duration-200 rounded-lg hover:bg-[#f0f3ff] hidden sm:block">
              <button class="text-[#535768] p-[8px_12px] bg-transparent border-none text-[14px] font-medium transition-all duration-200 cursor-pointer hover:text-[#5034ff]">Contact sales</button>
            </li>
            <li class="list-none ml-[20px] transition-all duration-200 rounded-lg hover:bg-[#f0f3ff]" @click="goLogin">
              <button class="text-[#535768] p-[8px_12px] bg-transparent border-none text-[14px] font-medium transition-all duration-200 cursor-pointer hover:text-[#5034ff]">Log in</button>
            </li>
            <li class="list-none ml-[20px] transition-all duration-300 bg-[#6c6cff] flex items-center p-[10px_16px] rounded-[25px] cursor-pointer hover:bg-[#5a5ad5] hover:translate-y-[-2px] hover:shadow-[0_4px_12px_rgba(108,108,255,0.3)]" @click="goDemo">
              <button class="text-white cursor-pointer font-medium bg-transparent border-none text-[14px]">See Demo</button>
              <font-awesome-icon class="text-white ml-[5px]" icon="arrow-right" />
            </li>
          </ul>
        </nav>
      </header>
    </div>

    <div class="flex text-white justify-center items-center pt-[140px] px-4 sm:px-0">
      <div class="flex flex-col items-center text-center">
        <p class="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold m-0 leading-tight bg-gradient-to-r from-white to-[#e0e0ff] bg-clip-text text-transparent shadow-[0_2px_15px_rgba(255,255,255,0.1)]">A platform built for a</p>
        <p class="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold m-0 leading-tight bg-gradient-to-r from-white to-[#e0e0ff] bg-clip-text text-transparent shadow-[0_2px_15px_rgba(255,255,255,0.1)]">new way of working</p>
        <span class="mt-[25px] text-base sm:text-xl opacity-90">
          What would you like to manage with
          <span class="text-[#00c875]">T</span>as<span class="text-[#ffcb00]">k</span>da<span class="text-[#e2435c]">y</span>?
        </span>
      </div>
    </div>

    <div class="flex justify-center items-center mt-[50px]">
      <button @click="goDemo" class="bg-gradient-to-r from-[#6c6cff] to-[#5034ff] flex items-center text-white py-3 px-5 sm:py-4 sm:px-6 rounded-[30px] cursor-pointer border-none text-sm sm:text-base font-medium transition-all duration-300 shadow-[0_5px_20px_rgba(108,108,255,0.4)] hover:bg-[#5a5ad5] hover:translate-y-[-3px] hover:shadow-[0_8px_25px_rgba(108,108,255,0.5)] active:translate-y-[1px]">
        <span class="mr-2">See Demo</span>
        <font-awesome-icon icon="arrow-right" />
      </button>
    </div>

    <div class="flex flex-col md:flex-row items-center justify-center mt-[70px] pb-[40px] px-4">
      <div class="relative flex items-center justify-center transition-all duration-400 hover:translate-y-[-10px] my-4 md:my-0">
        <img class="rounded-xl transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.3)] hover:shadow-[0_15px_40px_rgba(255,255,255,0.25)] w-[85%] md:w-3/4 transform md:-rotate-5" src="../styles/images/1.png" alt="Task management interface" />
      </div>
      <div class="relative flex items-center justify-center transition-all duration-400 hover:translate-y-[-10px] my-4 md:my-0">
        <img class="rounded-xl transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.3)] hover:shadow-[0_15px_40px_rgba(255,255,255,0.25)] w-[85%] md:w-[120%] lg:w-[150%] z-[5]" src="../styles/images/2.png" alt="Project management dashboard" />
      </div>
      <div class="relative flex items-center justify-center transition-all duration-400 hover:translate-y-[-10px] my-4 md:my-0">
        <img class="rounded-xl transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.3)] hover:shadow-[0_15px_40px_rgba(255,255,255,0.25)] w-[85%] md:w-3/4 transform md:rotate-5" src="../styles/images/3.png" alt="Team collaboration tools" />
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