<template>
  <section class="flex">
    <!-- Desktop Menu -->
    <header class="z-15 bg-[#292f4c] w-[70px] h-screen flex flex-col justify-between items-center text-white relative">
      <span 
        class="absolute left-[87px] top-[30px] bg-white rounded-full w-[25px] h-[25px] flex items-center justify-center border border-[#d0d4e4] cursor-pointer transition-all duration-300 z-[3000] hover:bg-[#0073ea] hover:text-white hover:w-[35px] hover:rounded-[20px] shadow-sm hover:shadow-md"
        @click="closeModal"
      >
        <font-awesome-icon class="text-[#68696c] transition-colors duration-300 group-hover:text-white" icon="angle-right" />
      </span>
      
      <div class="flex items-center justify-center absolute bg-[#258750] rounded-r-2xl h-[110px] w-[35px] top-1/2 left-0 -translate-y-1/2 transition-all duration-300 hover:w-[40px] hover:bg-[#1e7a45] shadow-md cursor-pointer">
        <p class="rotate-180 flex items-center justify-center w-[30px] writing-mode-vertical-rl text-[15px] leading-[22.5px]">See plans</p>
      </div>
      
      <div>
        <div 
          class="relative w-[35px] h-[67px] left-[3px] top-[3px] cursor-pointer transform transition-transform duration-300 hover:scale-105" 
          @click="goToHomePage"
        >
          <div class="logo font-bold text-[1.5em] flex relative mt-[-25px]">
            <div class="blue absolute border border-[#00c875] w-[25px] h-[12.5px] top-[30px] left-[-3px] transition-all duration-200"></div>
            <div class="yellow absolute border border-[#ffcb00] w-[12.5px] h-[25px] left-[15px] top-[35px] transition-all duration-200">
              <div class="green-dot w-[1px] h-[1px] bg-[#00c875] left-[-1px] absolute top-[5.5px]"></div>
            </div>
            <div class="red absolute border border-[#e2435c] w-[12.5px] h-[12.5px] left-[24px] top-[30px] transition-all duration-200">
              <div class="yellow-dot w-[1px] h-[1px] bg-[#ffcb00] left-[1.5px] absolute bottom-[-1px]"></div>
            </div>
          </div>
        </div>
        
        <div class="flex flex-col mt-4 space-y-1">
          <div 
            class="menu-icon cursor-pointer z-5 flex w-[35px] h-[35px] text-center items-center justify-center m-[5px] rounded-[10px] transition-all duration-200 hover:bg-white/30 transform hover:scale-105 relative group" 
            :class="{ 'bg-white/30': isNavBarOpen }" 
            @click="toggleNavBar"
          >
            <menu-icon></menu-icon>
            <div class="hidden absolute left-full ml-2 pl-2 pr-3 py-1 bg-gray-800 text-white text-xs rounded shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
              Menu
            </div>
          </div>
          
          <div class="z-5 flex w-[35px] h-[35px] text-center items-center justify-center m-[5px] rounded-[10px] transition-all duration-200 hover:bg-white/30 transform hover:scale-105 relative group">
            <notification-icon></notification-icon>
            <div class="hidden absolute left-full ml-2 pl-2 pr-3 py-1 bg-gray-800 text-white text-xs rounded shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
              Notifications
            </div>
          </div>
          
          <div class="z-5 flex w-[35px] h-[35px] text-center items-center justify-center m-[5px] rounded-[10px] transition-all duration-200 hover:bg-white/30 transform hover:scale-105 relative group">
            <inbox-icon></inbox-icon>
            <div class="hidden absolute left-full ml-2 pl-2 pr-3 py-1 bg-gray-800 text-white text-xs rounded shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
              Inbox
            </div>
          </div>
          
          <div class="z-5 flex w-[35px] h-[35px] text-center items-center justify-center m-[5px] rounded-[10px] transition-all duration-200 hover:bg-white/30 transform hover:scale-105 relative group">
            <work-icon></work-icon>
            <div class="hidden absolute left-full ml-2 pl-2 pr-3 py-1 bg-gray-800 text-white text-xs rounded shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
              My Work
            </div>
          </div>
        </div>
      </div>
      
      <div class="flex flex-col items-center space-y-1 mb-2">
        <div class="z-5 flex flex-col space-y-1">
          <div class="w-[35px] h-[35px] flex items-center justify-center text-center m-[7px] rounded-[10px] transition-all duration-200 hover:bg-white/30 transform hover:scale-105 relative group">
            <appsIcon></appsIcon>
            <div class="hidden absolute left-full ml-2 pl-2 pr-3 py-1 bg-gray-800 text-white text-xs rounded shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
              Apps
            </div>
          </div>
          
          <div class="w-[35px] h-[35px] flex items-center justify-center text-center m-[7px] rounded-[10px] transition-all duration-200 hover:bg-white/30 transform hover:scale-105 relative group">
            <invite-icon></invite-icon>
            <div class="hidden absolute left-full ml-2 pl-2 pr-3 py-1 bg-gray-800 text-white text-xs rounded shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
              Invite Members
            </div>
          </div>
          
          <div class="w-[35px] h-[35px] flex items-center justify-center text-center m-[7px] rounded-[10px] transition-all duration-200 hover:bg-white/30 transform hover:scale-105 relative group">
            <search-icon></search-icon>
            <div class="hidden absolute left-full ml-2 pl-2 pr-3 py-1 bg-gray-800 text-white text-xs rounded shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
              Search
            </div>
          </div>
          
          <div class="w-[35px] h-[35px] flex items-center justify-center text-center m-[7px] rounded-[10px] transition-all duration-200 hover:bg-white/30 transform hover:scale-105 relative group">
            <help-icon></help-icon>
            <div class="hidden absolute left-full ml-2 pl-2 pr-3 py-1 bg-gray-800 text-white text-xs rounded shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
              Help
            </div>
          </div>
        </div>
        
        <div class="w-[43px] h-[43px] rounded-full mb-[10px] bg-white ring-2 ring-white/50 shadow-md flex items-center justify-center overflow-hidden transform transition-all duration-200 hover:scale-110 hover:ring-blue-400 cursor-pointer group relative">
          <img class="h-[40px] w-[40px] object-cover" src="https://res.cloudinary.com/duajg3ah1/image/upload/v1660763357/shlomiN_mewit4.jpg" alt="Profile" />
          <div class="hidden absolute left-full ml-2 pl-2 pr-3 py-1 bg-gray-800 text-white text-xs rounded shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            My Profile
          </div>
        </div>
      </div>
    </header>
    
    <div class="w-[30px] bg-[#f6f7fb] h-screen border-r border-[#d0d4e4]" v-if="!isNavBarOpen"></div>
    
    <!-- Mobile Menu -->
    <div class="hidden max-[620px]:flex z-[2000] items-center justify-between fixed bg-[#292f4c] px-[10px] w-screen h-[70px] shadow-lg">
      <div 
        class="relative w-[35px] h-[67px] left-[2px] top-[13px] cursor-pointer transform transition-transform duration-300 hover:scale-105" 
        @click="goToHomePage"
      >
        <div class="logo font-bold text-[1.5em] flex relative mt-[-25px]">
          <div class="blue absolute border border-[#00c875] w-[25px] h-[12.5px] top-[30px] left-[-3px] transition-all duration-200"></div>
          <div class="yellow absolute border border-[#ffcb00] w-[12.5px] h-[25px] left-[15px] top-[35px] transition-all duration-200">
            <div class="green-dot w-[1px] h-[1px] bg-[#00c875] left-[-1px] absolute top-[5.5px]"></div>
          </div>
          <div class="red absolute border border-[#e2435c] w-[12.5px] h-[12.5px] left-[24px] top-[30px] transition-all duration-200">
            <div class="yellow-dot w-[1px] h-[1px] bg-[#ffcb00] left-[1.5px] absolute bottom-[-1px]"></div>
          </div>
        </div>
      </div>
      
      <div class="flex items-center space-x-2">
        <div class="w-[35px] h-[35px] rounded-full bg-white/10 flex items-center justify-center transition-all duration-200 hover:bg-white/20">
          <search-icon class="w-5 h-5"></search-icon>
        </div>
        
        <div class="w-[35px] h-[35px] rounded-full bg-white/10 flex items-center justify-center transition-all duration-200 hover:bg-white/20">
          <notification-icon class="w-5 h-5"></notification-icon>
        </div>
        
        <button 
          class="w-10 h-10 flex items-center justify-center rounded-full transition-all duration-200 hover:bg-white/20"
          @click="toggleNavBarMobile(isOpen)"
        >
          <font-awesome-icon v-if="!isNavBarOpen" class="text-white text-[20px]" icon="bars" />
          <font-awesome-icon v-if="isNavBarOpen" class="text-white text-[20px]" icon="x" />
        </button>
      </div>
    </div>
    
    <!-- Mobile Nav Overlay -->
    <div 
      v-if="isNavBarOpen && isOpen" 
      class="fixed inset-0 bg-black bg-opacity-50 z-[1999] max-[620px]:block hidden"
      @click="toggleNavBarMobile(true)"
    ></div>
    
    <!-- Mobile Nav Menu -->
    <div 
      v-if="isNavBarOpen && isOpen" 
      class="fixed right-0 top-[70px] bottom-0 w-[250px] bg-[#292f4c] z-[2000] max-[620px]:block hidden shadow-lg transform transition-transform duration-300"
      :class="{ 'translate-x-0': isNavBarOpen && isOpen, 'translate-x-full': !isNavBarOpen || !isOpen }"
    >
      <div class="flex flex-col p-4 h-full overflow-y-auto">
        <div class="flex items-center space-x-2 p-3 rounded-lg hover:bg-white/10 transition-colors duration-200 cursor-pointer">
          <work-icon></work-icon>
          <span class="text-white text-sm">My Work</span>
        </div>
        
        <div class="flex items-center space-x-2 p-3 rounded-lg hover:bg-white/10 transition-colors duration-200 cursor-pointer">
          <inbox-icon></inbox-icon>
          <span class="text-white text-sm">Inbox</span>
        </div>
        
        <div class="border-t border-white/10 my-2"></div>
        
        <div class="flex items-center space-x-2 p-3 rounded-lg hover:bg-white/10 transition-colors duration-200 cursor-pointer">
          <appsIcon></appsIcon>
          <span class="text-white text-sm">Apps</span>
        </div>
        
        <div class="flex items-center space-x-2 p-3 rounded-lg hover:bg-white/10 transition-colors duration-200 cursor-pointer">
          <invite-icon></invite-icon>
          <span class="text-white text-sm">Invite Members</span>
        </div>
        
        <div class="flex items-center space-x-2 p-3 rounded-lg hover:bg-white/10 transition-colors duration-200 cursor-pointer">
          <help-icon></help-icon>
          <span class="text-white text-sm">Help</span>
        </div>
        
        <div class="mt-auto flex items-center space-x-3 p-3 rounded-lg hover:bg-white/10 transition-colors duration-200 cursor-pointer">
          <div class="w-[35px] h-[35px] rounded-full bg-white flex items-center justify-center overflow-hidden">
            <img class="h-[35px] w-[35px] object-cover" src="https://res.cloudinary.com/duajg3ah1/image/upload/v1660763357/shlomiN_mewit4.jpg" alt="Profile" />
          </div>
          <span class="text-white text-sm">My Profile</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import menuIcon from './icons/menu-icon.vue'
import notificationIcon from './icons/notification-icon.vue'
import inboxIcon from './icons/inbox-icon.vue'
import workIcon from './icons/work-icon.vue'
import appsIcon from './icons/apps-icon.vue'
import inviteIcon from './icons/invite-icon.vue'
import searchIcon from './icons/search-icon.vue'
import helpIcon from './icons/help-icon.vue'

export default {
  data() {
    return {
      isOpen: false,
    }
  },
  computed: {
    isNavBarOpen() {
      return this.$store.getters.isNavBarOpen
    },
  },
  created() {
    // Close mobile menu on window resize if window width is more than 620px
    window.addEventListener('resize', this.handleResize)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    goToHomePage() {
      this.$router.push(`/`)
    },
    toggleNavBar() {
      this.$store.commit({ type: 'toggleNavBar', bool: true })
    },
    toggleNavBarMobile(bool) {
      this.$store.commit({ type: 'toggleNavBar', bool })
      this.isOpen = !this.isOpen
    },
    closeModal() {
      this.$store.commit({ type: 'toggleNavBar', bool: true })
    },
    handleResize() {
      if (window.innerWidth > 620 && this.isOpen) {
        this.isOpen = false
      }
    }
  },
  components: {
    menuIcon,
    notificationIcon,
    inboxIcon,
    workIcon,
    inviteIcon,
    appsIcon,
    searchIcon,
    helpIcon,
  },
}
</script>

<style scoped>
/* Custom vertical text writing mode for the "See plans" text */
.writing-mode-vertical-rl {
  writing-mode: vertical-rl;
  text-orientation: mixed;
}

/* Smooth fade in animation for tooltips */
.group:hover .group-hover\:opacity-100 {
  animation: fadeIn 0.2s ease-in-out forwards;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateX(-5px); }
  to { opacity: 1; transform: translateX(0); }
}

/* Mobile menu slide animation */
.translate-x-full {
  transform: translateX(100%);
}
</style>