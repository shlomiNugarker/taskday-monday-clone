<template>
  <section class="min-h-screen bg-gradient-to-br from-[#040539] to-[#0c0a6b] font-sans text-white overflow-auto">
    <div class="fixed w-full z-50 bg-gradient-to-br from-[#040539] to-[#0c0a6b] shadow-md">
      <header class="flex items-center justify-between w-[90%] max-w-7xl h-[70px] mx-auto py-4 px-4">
        <div class="flex items-center">
          <div class="relative">
            <div class="absolute w-[50px] h-[25px] border-2 border-accent1 rounded-sm"></div>
            <div class="absolute w-[25px] h-[50px] border-2 border-accent2 left-10 top-2.5 rounded-sm">
              <div class="absolute w-[2px] h-[2px] bg-accent1 left-[-2px] top-[11px]"></div>
            </div>
            <div class="absolute w-[25px] h-[25px] border-2 border-accent3 left-[53px] rounded-sm">
              <div class="absolute w-[2px] h-[2px] bg-accent2 left-2 bottom-[-2px]"></div>
            </div>
          </div>
          <div class="relative left-[90px] top-2 text-3xl font-semibold">
            <span class="text-accent1">T</span>as<span class="text-accent2">k</span>da<span class="text-accent3">y</span>
          </div>
        </div>

        <nav>
          <ul class="flex items-center">
            <li class="list-none ml-6">
              <button class="px-3 py-2 text-gray-dark bg-transparent border-none text-[15px] font-medium hover:bg-gray-light hover:text-[#5034ff] rounded-lg">Contact sales</button>
            </li>
            <li class="list-none ml-6" @click="goLogin">
              <button class="px-3 py-2 text-gray-dark bg-transparent border-none text-[15px] font-medium hover:bg-gray-light hover:text-[#5034ff] rounded-lg cursor-pointer">Log in</button>
            </li>
            <li class="flex items-center px-5 py-2.5 bg-primary rounded-3xl cursor-pointer hover:bg-primary-dark ml-6" @click="goDemo">
              <button class="text-white bg-transparent border-none text-[15px] font-medium cursor-pointer">See Demo</button>
              <font-awesome-icon class="text-white ml-1" icon="arrow-right" />
            </li>
          </ul>
        </nav>
      </header>
    </div>

    <div class="flex flex-col items-center pt-[150px] pb-20 px-5 max-w-7xl mx-auto">
      <div class="flex justify-center items-center w-full text-center">
        <div class="flex flex-col items-center">
          <h1 class="text-5xl font-bold leading-tight m-0 md:text-4xl sm:text-3xl">
            A platform built for a <br />
            <span class="bg-gradient-to-r from-accent1 to-[#5034ff] bg-clip-text text-transparent">new way of working</span>
          </h1>
          <p class="my-6 text-xl opacity-90 sm:text-base">
            What would you like to manage with
            <span class="text-accent1">T</span>as<span class="text-accent2">k</span>da<span class="text-accent3">y</span>?
          </p>
          
          <div class="flex gap-4 mt-5 sm:flex-col sm:w-full">
            <button class="flex items-center px-8 py-4 bg-primary text-white border-none rounded-full text-base font-semibold cursor-pointer shadow-lg shadow-primary/30 hover:bg-primary-dark sm:justify-center sm:w-full" @click="goDemo">
              <span class="mr-2">See Demo</span>
              <font-awesome-icon icon="arrow-right" />
            </button>
            <button class="px-8 py-4 bg-white/10 text-white border border-white/30 rounded-full text-base font-semibold cursor-pointer hover:bg-white/20 sm:w-full" @click="goLogin">
              <span>Sign up free</span>
            </button>
          </div>
        </div>
      </div>
      
      <div class="w-full mt-16 px-5">
        <div class="flex justify-center items-center relative">
          <div class="z-10 transform translate-x-10 translate-y-5 scale-[0.85] opacity-80 lg:hidden">
            <img class="w-full rounded-lg shadow-2xl" src="../styles/images/1.png" alt="Taskday interface example" />
          </div>
          <div class="z-30 lg:w-[90%] lg:max-w-[700px]">
            <img class="w-full rounded-lg shadow-2xl" src="../styles/images/2.png" alt="Taskday dashboard" />
          </div>
          <div class="z-10 transform -translate-x-10 translate-y-5 scale-[0.85] opacity-80 lg:hidden">
            <img class="w-full rounded-lg shadow-2xl" src="../styles/images/3.png" alt="Taskday project view" />
          </div>
        </div>
      </div>
    </div>
    
    <div class="py-24 px-5 text-center bg-white/[0.03] mt-20">
      <h2 class="text-4xl mb-16 bg-gradient-to-r from-accent2 to-accent3 bg-clip-text text-transparent inline-block sm:text-3xl">Features that help you succeed</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <div class="bg-white/5 rounded-2xl p-10 hover:bg-white/[0.08] hover:shadow-2xl transition-all">
          <font-awesome-icon class="text-5xl mb-5 text-primary" icon="tasks" />
          <h3 class="text-2xl mb-4">Task Management</h3>
          <p class="text-white/70 leading-relaxed">Organize and manage your tasks efficiently</p>
        </div>
        <div class="bg-white/5 rounded-2xl p-10 hover:bg-white/[0.08] hover:shadow-2xl transition-all">
          <font-awesome-icon class="text-5xl mb-5 text-primary" icon="users" />
          <h3 class="text-2xl mb-4">Team Collaboration</h3>
          <p class="text-white/70 leading-relaxed">Work together seamlessly with your team</p>
        </div>
        <div class="bg-white/5 rounded-2xl p-10 hover:bg-white/[0.08] hover:shadow-2xl transition-all">
          <font-awesome-icon class="text-5xl mb-5 text-primary" icon="chart-line" />
          <h3 class="text-2xl mb-4">Progress Tracking</h3>
          <p class="text-white/70 leading-relaxed">Monitor your project's progress in real-time</p>
        </div>
      </div>
    </div>

    <div class="py-24 px-5 text-center bg-gradient-to-br from-white/5 to-white/2">
      <h2 class="text-4xl mb-16 bg-gradient-to-r from-accent1 to-accent2 bg-clip-text text-transparent inline-block sm:text-3xl">Trusted by teams worldwide</h2>
      <div class="flex flex-wrap gap-8 max-w-6xl mx-auto justify-center md:flex-col md:items-center">
        <div class="flex-1 min-w-[300px] max-w-[350px] md:w-full md:max-w-[500px]">
          <div class="bg-white/5 rounded-2xl p-8 h-full flex flex-col justify-between text-left hover:bg-white/[0.08] hover:shadow-2xl transition-all">
            <font-awesome-icon class="text-primary/30 text-4xl mb-4" icon="quote-left" />
            <p class="text-white/90 text-lg leading-relaxed mb-8 italic">Taskday has completely transformed how our team collaborates. It's intuitive and powerful!</p>
            <div class="flex items-center gap-4 mt-auto">
              <div class="text-4xl text-primary">
                <font-awesome-icon icon="user-circle" />
              </div>
              <div>
                <h4 class="m-0 text-lg">Sarah Johnson</h4>
                <p class="mt-1 mb-0 text-sm text-white/70 not-italic">Project Manager, TechCorp</p>
              </div>
            </div>
          </div>
        </div>
        <div class="flex-1 min-w-[300px] max-w-[350px] md:w-full md:max-w-[500px]">
          <div class="bg-white/5 rounded-2xl p-8 h-full flex flex-col justify-between text-left hover:bg-white/[0.08] hover:shadow-2xl transition-all">
            <font-awesome-icon class="text-primary/30 text-4xl mb-4" icon="quote-left" />
            <p class="text-white/90 text-lg leading-relaxed mb-8 italic">We've increased our productivity by 40% since implementing Taskday across our organization.</p>
            <div class="flex items-center gap-4 mt-auto">
              <div class="text-4xl text-primary">
                <font-awesome-icon icon="user-circle" />
              </div>
              <div>
                <h4 class="m-0 text-lg">Michael Chen</h4>
                <p class="mt-1 mb-0 text-sm text-white/70 not-italic">COO, Innovate Inc.</p>
              </div>
            </div>
          </div>
        </div>
        <div class="flex-1 min-w-[300px] max-w-[350px] md:w-full md:max-w-[500px]">
          <div class="bg-white/5 rounded-2xl p-8 h-full flex flex-col justify-between text-left hover:bg-white/[0.08] hover:shadow-2xl transition-all">
            <font-awesome-icon class="text-primary/30 text-4xl mb-4" icon="quote-left" />
            <p class="text-white/90 text-lg leading-relaxed mb-8 italic">The customization options allow us to adapt Taskday perfectly to our unique workflow needs.</p>
            <div class="flex items-center gap-4 mt-auto">
              <div class="text-4xl text-primary">
                <font-awesome-icon icon="user-circle" />
              </div>
              <div>
                <h4 class="m-0 text-lg">Emily Rodriguez</h4>
                <p class="mt-1 mb-0 text-sm text-white/70 not-italic">Team Lead, Creative Studios</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="mt-20">
        <div class="flex justify-center gap-12 flex-wrap sm:gap-8">
          <div class="flex flex-col items-center text-white/70 hover:text-white transition-colors">
            <font-awesome-icon class="text-4xl mb-3" icon="building" />
            <span class="text-base">TechCorp</span>
          </div>
          <div class="flex flex-col items-center text-white/70 hover:text-white transition-colors">
            <font-awesome-icon class="text-4xl mb-3" icon="building" />
            <span class="text-base">Innovate Inc.</span>
          </div>
          <div class="flex flex-col items-center text-white/70 hover:text-white transition-colors">
            <font-awesome-icon class="text-4xl mb-3" icon="building" />
            <span class="text-base">Creative Studios</span>
          </div>
          <div class="flex flex-col items-center text-white/70 hover:text-white transition-colors">
            <font-awesome-icon class="text-4xl mb-3" icon="building" />
            <span class="text-base">Global Systems</span>
          </div>
        </div>
      </div>
    </div>
    
    <div class="py-24 px-5 bg-gradient-to-br from-primary/10 to-accent1/10">
      <div class="max-w-4xl mx-auto text-center">
        <div>
          <h2 class="text-5xl mb-5 bg-gradient-to-r from-accent3 to-accent2 bg-clip-text text-transparent inline-block sm:text-3xl">Ready to transform your workflow?</h2>
          <p class="text-xl text-white/90 mb-10 max-w-[700px] mx-auto sm:text-lg">Get started with Taskday today and see the difference for yourself.</p>
          <div class="flex gap-5 justify-center flex-wrap">
            <button class="flex items-center px-8 py-4 bg-primary text-white border-none rounded-full text-base font-semibold cursor-pointer shadow-lg shadow-primary/30 hover:bg-primary-dark" @click="goDemo">
              <span class="mr-2">Try Demo</span>
              <font-awesome-icon icon="arrow-right" />
            </button>
            <button class="flex items-center px-8 py-4 bg-white/10 text-white border border-white/30 rounded-full text-base font-semibold cursor-pointer hover:bg-white/20">
              <font-awesome-icon class="mr-2" icon="envelope" />
              <span>Contact Sales</span>
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <footer class="pt-20 pb-8 px-5 bg-black/30">
      <div class="max-w-6xl mx-auto flex flex-wrap justify-between gap-10 md:flex-col md:items-center md:text-center">
        <div class="flex flex-col md:items-center">
          <div class="relative w-20 h-12 mb-2 scale-75">
            <div class="absolute border-2 border-accent1 w-[50px] h-[25px] rounded-sm"></div>
            <div class="absolute w-[25px] h-[50px] border-2 border-accent2 left-10 top-2.5 rounded-sm">
              <div class="absolute w-[2px] h-[2px] bg-accent1 left-[-2px] top-[11px]"></div>
            </div>
            <div class="absolute w-[25px] h-[25px] border-2 border-accent3 left-[53px] rounded-sm">
              <div class="absolute w-[2px] h-[2px] bg-accent2 left-2 bottom-[-2px]"></div>
            </div>
          </div>
          <div class="text-2xl font-semibold">
            <span class="text-accent1">T</span>as<span class="text-accent2">k</span>da<span class="text-accent3">y</span>
          </div>
        </div>
        
        <div class="flex gap-16 flex-wrap md:w-full md:justify-center">
          <div class="md:after:left-1/2 md:after:-translate-x-1/2">
            <h3 class="text-white text-xl mb-5 relative md:text-center after:content-[''] after:absolute after:left-0 after:-bottom-2 after:w-[30px] after:h-[2px] after:bg-gradient-to-r after:from-accent1 after:to-primary">Product</h3>
            <ul class="list-none p-0 m-0">
              <li class="mb-2 text-white/70 cursor-pointer hover:text-primary">Features</li>
              <li class="mb-2 text-white/70 cursor-pointer hover:text-primary">Pricing</li>
              <li class="mb-2 text-white/70 cursor-pointer hover:text-primary">Integrations</li>
              <li class="mb-2 text-white/70 cursor-pointer hover:text-primary">Enterprise</li>
            </ul>
          </div>
          <div class="md:after:left-1/2 md:after:-translate-x-1/2">
            <h3 class="text-white text-xl mb-5 relative md:text-center after:content-[''] after:absolute after:left-0 after:-bottom-2 after:w-[30px] after:h-[2px] after:bg-gradient-to-r after:from-accent1 after:to-primary">Resources</h3>
            <ul class="list-none p-0 m-0">
              <li class="mb-2 text-white/70 cursor-pointer hover:text-primary">Documentation</li>
              <li class="mb-2 text-white/70 cursor-pointer hover:text-primary">Guides</li>
              <li class="mb-2 text-white/70 cursor-pointer hover:text-primary">Webinars</li>
              <li class="mb-2 text-white/70 cursor-pointer hover:text-primary">Blog</li>
            </ul>
          </div>
          <div class="md:after:left-1/2 md:after:-translate-x-1/2">
            <h3 class="text-white text-xl mb-5 relative md:text-center after:content-[''] after:absolute after:left-0 after:-bottom-2 after:w-[30px] after:h-[2px] after:bg-gradient-to-r after:from-accent1 after:to-primary">Company</h3>
            <ul class="list-none p-0 m-0">
              <li class="mb-2 text-white/70 cursor-pointer hover:text-primary">About Us</li>
              <li class="mb-2 text-white/70 cursor-pointer hover:text-primary">Careers</li>
              <li class="mb-2 text-white/70 cursor-pointer hover:text-primary">Press</li>
              <li class="mb-2 text-white/70 cursor-pointer hover:text-primary">Contact</li>
            </ul>
          </div>
        </div>
        
        <div>
          <div class="flex gap-4">
            <font-awesome-icon class="text-2xl text-white/70 cursor-pointer hover:text-primary" icon="fa-brands fa-twitter" />
            <font-awesome-icon class="text-2xl text-white/70 cursor-pointer hover:text-primary" icon="fa-brands fa-linkedin" />
            <font-awesome-icon class="text-2xl text-white/70 cursor-pointer hover:text-primary" icon="fa-brands fa-facebook" />
            <font-awesome-icon class="text-2xl text-white/70 cursor-pointer hover:text-primary" icon="fa-brands fa-instagram" />
          </div>
        </div>
      </div>
      
      <div class="max-w-6xl mx-auto mt-16 pt-5 border-t border-white/10 flex justify-between flex-wrap gap-5 md:flex-col md:items-center md:text-center">
        <p class="text-white/50 text-sm m-0">© 2023 Taskday. All rights reserved.</p>
        <div class="flex gap-5 md:justify-center">
          <span class="text-white/50 text-sm cursor-pointer hover:text-white">Privacy Policy</span>
          <span class="text-white/50 text-sm cursor-pointer hover:text-white">Terms of Service</span>
          <span class="text-white/50 text-sm cursor-pointer hover:text-white">Security</span>
        </div>
      </div>
    </footer>
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
      ]
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
    }
  },
  components: {},
}
</script>
