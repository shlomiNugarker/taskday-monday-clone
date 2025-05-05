<template>
  <section class="min-h-screen bg-gradient-to-br from-[#040539] to-[#0a0a4d] overflow-auto font-sans">
    <div class="fixed w-full bg-white/95 shadow-md backdrop-blur-sm z-50">
      <header class="flex items-center justify-between w-[90%] max-w-[1400px] h-[70px] mx-auto py-[15px]">
        <div class="flex items-center">
          <div class="relative text-2xl font-bold mt-[-25px] transition-transform duration-300 hover:scale-105">
            <div class="absolute w-[50px] h-[25px] border-2 border-[#00c875] transition-all duration-300"></div>
            <div class="absolute w-[25px] h-[50px] border-2 border-[#ffcb00] left-[40px] top-[10px] transition-all duration-300">
              <div class="absolute w-[3px] h-[3px] bg-[#00c875] left-[-2px] top-[11px] rounded-full"></div>
            </div>
            <div class="absolute w-[25px] h-[25px] left-[53px] border-2 border-[#e2435c] transition-all duration-300">
              <div class="absolute w-[3px] h-[3px] bg-[#ffcb00] left-[8px] bottom-[-2px] rounded-full"></div>
            </div>
          </div>
          <div class="relative left-[90px] top-[8px] text-[30px] font-semibold tracking-[-0.5px]">
            <span class="text-[#00c875]">T</span>as<span class="text-[#ffcb00]">k</span>da<span class="text-[#e2435c]">y</span>
          </div>
        </div>

        <nav>
          <ul class="flex items-center">
            <li class="list-none ml-5 transition-all duration-200">
              <button class="text-[#535768] px-3 py-2 bg-transparent border-none text-sm font-medium transition-all duration-200 cursor-pointer rounded-lg hover:bg-[#f0f3ff] hover:text-[#5034ff]">Contact sales</button>
            </li>
            <li class="list-none ml-5 transition-all duration-200" @click="goLogin">
              <button class="text-[#535768] px-3 py-2 bg-transparent border-none text-sm font-medium transition-all duration-200 cursor-pointer rounded-lg hover:bg-[#f0f3ff] hover:text-[#5034ff]">Log in</button>
            </li>
            <li class="list-none ml-5 flex items-center px-4 py-2.5 bg-[#6c6cff] rounded-[25px] cursor-pointer transition-all duration-300 hover:bg-[#5a5ad5] hover:translate-y-[-2px] hover:shadow-[0_4px_12px_rgba(108,108,255,0.3)]" @click="goDemo">
              <button class="text-white bg-transparent border-none text-sm font-medium cursor-pointer">See Demo</button>
              <font-awesome-icon class="text-white ml-1.5" icon="arrow-right" />
            </li>
          </ul>
        </nav>
      </header>
    </div>

    <div class="flex justify-center items-center text-white pt-[140px]">
      <div class="flex flex-col items-center text-center">
        <p class="text-[70px] font-bold m-0 leading-[1.1] bg-gradient-to-r from-white to-[#e0e0ff] bg-clip-text text-transparent shadow-[0_2px_15px_rgba(255,255,255,0.1)] md:text-[60px] sm:text-[50px] sm:px-5 xs:text-[40px] xxs:text-[32px]">A platform built for a</p>
        <p class="text-[70px] font-bold m-0 leading-[1.1] bg-gradient-to-r from-white to-[#e0e0ff] bg-clip-text text-transparent shadow-[0_2px_15px_rgba(255,255,255,0.1)] md:text-[60px] sm:text-[50px] sm:px-5 xs:text-[40px] xxs:text-[32px]">new way of working</p>
        <span class="mt-6 text-xl opacity-90 sm:text-lg xxs:text-base">
          What would you like to manage with
          <span class="text-[#00c875]">T</span>as<span class="text-[#ffcb00]">k</span>da<span class="text-[#e2435c]">y</span>?
        </span>
      </div>
    </div>

    <div class="flex justify-center items-center mt-[50px]">
      <button @click="goDemo" class="flex items-center bg-gradient-to-br from-[#6c6cff] to-[#5034ff] text-white px-6 py-4 rounded-[30px] cursor-pointer border-none text-base font-medium transition-all duration-300 shadow-[0_5px_20px_rgba(108,108,255,0.4)] hover:bg-[#5a5ad5] hover:translate-y-[-3px] hover:shadow-[0_8px_25px_rgba(108,108,255,0.5)] active:translate-y-[1px] xxs:px-5 xxs:py-3 xxs:text-sm">
        <span class="mr-2">See Demo</span>
        <font-awesome-icon icon="arrow-right" />
      </button>
    </div>

    <div class="flex items-center justify-center mt-[70px] pb-10 md:pb-10 sm:pb-10 sm:px-4 xs:flex-col">
      <div class="relative flex items-center justify-center transition-all duration-400 hover:translate-y-[-10px] xs:my-4">
        <img class="w-3/4 rounded-xl transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.3)] rotate-[-5deg] hover:shadow-[0_15px_40px_rgba(255,255,255,0.25)] md:w-3/4 xs:w-[85%] xs:rotate-0" 
          src="../styles/images/1.png" 
          alt="Dashboard screenshot" />
      </div>
      <div class="relative flex items-center justify-center transition-all duration-400 hover:translate-y-[-10px] xs:my-4">
        <img class="w-[150%] rounded-xl transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.3)] z-10 hover:shadow-[0_15px_40px_rgba(255,255,255,0.25)] md:w-[120%] xs:w-[85%]" 
          src="../styles/images/2.png" 
          alt="Task board screenshot" />
      </div>
      <div class="relative flex items-center justify-center transition-all duration-400 hover:translate-y-[-10px] xs:my-4">
        <img class="w-3/4 rounded-xl transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.3)] rotate-[5deg] hover:shadow-[0_15px_40px_rgba(255,255,255,0.25)] md:w-3/4 xs:w-[85%] xs:rotate-0" 
          src="../styles/images/3.png" 
          alt="Project view screenshot" />
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
      this.$router.push(`/board/${boardId}`)
    },
    goLogin() {
      var boardId = this.boardsList[0].boardId
      this.$router.push(`/login/`)
    },
    loadUsers() {
      this.$store.dispatch({ type: 'loadUsers' })
    },
  },
  components: {},
}
</script>

<style>
/* Custom breakpoints for xs and xxs screens */
@media (max-width: 650px) {
  .xs\:text-\[40px\] { font-size: 40px; }
  .xs\:flex-col { flex-direction: column; }
  .xs\:my-4 { margin-top: 1rem; margin-bottom: 1rem; }
  .xs\:w-\[85\%\] { width: 85%; }
  .xs\:rotate-0 { transform: rotate(0deg); }
  .xs\:px-5 { padding-left: 1.25rem; padding-right: 1.25rem; }
}

@media (max-width: 480px) {
  .xxs\:text-\[32px\] { font-size: 32px; }
  .xxs\:text-base { font-size: 1rem; }
  .xxs\:px-5 { padding-left: 1.25rem; padding-right: 1.25rem; }
  .xxs\:py-3 { padding-top: 0.75rem; padding-bottom: 0.75rem; }
  .xxs\:text-sm { font-size: 0.875rem; }
}

@media (max-width: 768px) {
  .sm\:text-\[50px\] { font-size: 50px; }
  .sm\:px-5 { padding-left: 1.25rem; padding-right: 1.25rem; }
  .sm\:text-lg { font-size: 1.125rem; }
  .sm\:pb-10 { padding-bottom: 2.5rem; }
  .sm\:px-4 { padding-left: 1rem; padding-right: 1rem; }
}

@media (max-width: 1024px) {
  .md\:text-\[60px\] { font-size: 60px; }
  .md\:w-\[120\%\] { width: 120%; }
  .md\:w-3\/4 { width: 75%; }
  .md\:pb-10 { padding-bottom: 2.5rem; }
}
</style>
