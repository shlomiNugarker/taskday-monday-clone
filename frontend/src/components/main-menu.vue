<template>
  <section class="flex">
    <!-- Desktop Menu -->
    <header class="main-menu">
      <span class="toggle-nav-bar" @click="closeModal">
        <font-awesome-icon class="icon-right" icon="angle-right" />
      </span>
      
      <div class="seen-plans">
        <p>See plans</p>
      </div>
      
      <div>
        <div class="icon" @click="goToHomePage">
          <div class="logo">
            <div class="blue"></div>
            <div class="yellow">
              <div class="green-dot"></div>
            </div>
            <div class="red">
              <div class="yellow-dot"></div>
            </div>
          </div>
        </div>

        <div class="top-navigation-items-area">
          <div class="menu-icon" :class="{ 'cliked-btn-nav': isNavBarOpen }" @click="toggleNavBar">
            <menu-icon></menu-icon>
          </div>
          <div>
            <notification-icon></notification-icon>
          </div>
          <div>
            <inbox-icon></inbox-icon>
          </div>
          <div>
            <work-icon></work-icon>
          </div>
        </div>
      </div>

      <div class="container-bottom">
        <div class="bottom-navigation-items-area">
          <div>
            <appsIcon></appsIcon>
          </div>
          <div>
            <invite-icon></invite-icon>
          </div>
          <div>
            <search-icon></search-icon>
          </div>
          <div>
            <help-icon></help-icon>
          </div>
        </div>

        <div class="icon-container">
          <img
            class="name-icon"
            src="https://res.cloudinary.com/duajg3ah1/image/upload/v1660763357/shlomiN_mewit4.jpg"
            alt=""
          />
        </div>
      </div>
    </header>

    <div class="empty-div" v-if="!isNavBarOpen"></div>

    <!-- Mobile Menu -->
    <div class="main-menu-mobile">
      <div class="icon" @click="goToHomePage">
        <div class="logo-container">
          <div class="logo">
            <div class="blue"></div>
            <div class="yellow">
              <div class="green-dot"></div>
            </div>
            <div class="red">
              <div class="yellow-dot"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="bars-container">
        <font-awesome-icon
          v-if="!isNavBarOpen"
          class="bars"
          icon="bars"
          @click="toggleNavBarMobile(isOpen)"
        />
        <font-awesome-icon
          icon="x"
          v-if="isNavBarOpen"
          class="bars"
          @click="toggleNavBarMobile(isOpen)"
        />
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
.main-menu-mobile {
  display: none;
}

.main-menu {
  z-index: 15;
  background-color: #292f4c;
  width: 70px;
  height: 100vh;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  color: white;
}

.container-bottom {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.menu-icon {
  cursor: pointer;
}

.toggle-nav-bar {
  position: absolute;
  left: 87px;
  background-color: #ffffff;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  top: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #d0d4e4;
  cursor: pointer;
  transition: width 0.3s;
  z-index: 3000;
}

.toggle-nav-bar:hover {
  background-color: #0073ea;
  width: 35px;
  border-radius: 20px;
}

.toggle-nav-bar:hover .icon-right {
  color: white;
}

.icon-right {
  color: #68696c;
}

.icon {
  position: relative;
  width: 35px;
  height: 67px;
  left: 3px;
  top: 3px;
  cursor: pointer;
}

.logo {
  font-size: 1.5em;
  display: flex;
  position: relative;
  margin-top: -25px;
  font-weight: bold;
}

.blue {
  position: absolute;
  border: 1px solid #00c875;
  width: 25px;
  height: 12.5px;
  top: 30px;
  left: -3px;
  transition: all 0.2s ease;
}

.yellow {
  position: absolute;
  width: 12.5px;
  height: 25px;
  border: 1px solid #ffcb00;
  left: 15px;
  top: 35px;
  transition: all 0.2s ease;
}

.green-dot {
  width: 1px;
  height: 1px;
  background-color: #00c875;
  left: -1px;
  position: absolute;
  top: 5.5px;
}

.red {
  position: absolute;
  width: 12.5px;
  height: 12.5px;
  left: 24px;
  top: 30px;
  border: 1px solid #e2435c;
  transition: all 0.2s ease;
}

.yellow-dot {
  width: 1px;
  height: 1px;
  background-color: #ffcb00;
  left: 1.5px;
  position: absolute;
  bottom: -1px;
}

.container-name-icon {
  background-color: #ffffff;
  padding: 5px;
  width: 45px;
  border-radius: 50%;
}

.name-icon {
  height: 40px;
  display: flex;
  width: 40px;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  border-radius: 50%;
}

.icon-container {
  width: 43px;
  height: 43px;
  border-radius: 50%;
  margin-bottom: 10px;
  background-color: rgb(255, 255, 255);
  display: flex;
  align-items: center;
  justify-content: center;
}

.top-navigation-items-area {
  display: flex;
  flex-direction: column;
}

.top-navigation-items-area div {
  z-index: 5;
  display: flex;
  width: 35px;
  height: 35px;
  text-align: center;
  align-content: center;
  justify-content: center;
  align-items: center;
  margin: 5px;
  border-radius: 10px;
  transition: background-color 0.2s;
}

.top-navigation-items-area div:hover {
  background-color: rgba(0, 0, 0, 0.6);
}

.bottom-navigation-items-area {
  z-index: 5;
}

.bottom-navigation-items-area div {
  width: 35px;
  height: 35px;
  align-content: center;
  justify-content: center;
  align-items: center;
  display: flex;
  text-align: center;
  margin: 7px;
  border-radius: 10px;
  transition: background-color 0.2s;
}

.bottom-navigation-items-area div:hover {
  background-color: rgba(0, 0, 0, 0.6);
}

.bottom-navigation-items-area div img {
  width: 25px;
}

.cliked-btn-nav {
  background-color: rgba(255, 255, 255, 0.3);
}

.seen-plans {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  background-color: #258750;
  border-radius: 0 16px 16px 0;
  height: 110px;
  width: 35px;
  top: 43%;
  left: 0;
  transition: width 0.3s;
}

.seen-plans:hover {
  width: 40px;
}

.seen-plans p {
  transform: rotate(180deg);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  writing-mode: vertical-rl;
  font-size: 15px;
  line-height: 22.5px;
}

.empty-div {
  width: 30px;
  background-color: #f6f7fb;
  height: 100vh;
  border-right: 1px solid #d0d4e4;
}

@media (max-width: 620px) {
  .main-menu {
    display: none;
  }
  
  .main-menu-mobile {
    z-index: 2000;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: fixed;
    background-color: #292f4c;
    padding: 0 10px;
    width: 100vw;
    height: 70px;
  }
  
  .main-menu-mobile .icon .logo-container {
    position: relative;
    width: 35px;
    height: 67px;
    left: 2px;
    top: 13px;
    cursor: pointer;
  }
  
  .main-menu-mobile .icon .logo-container .logo {
    font-size: 1.5em;
    display: flex;
    position: relative;
    margin-top: -25px;
    font-weight: bold;
  }
  
  .main-menu-mobile .bars-container .bars {
    color: white;
    font-size: 25px;
  }
}
</style>