<template>
  <section class="flex">
    <header class="main-menu">
      <span class="toggle-nav-bar" @click="closeModal"
        ><font-awesome-icon class="icon-right" icon="angle-right"
      /></span>
      <div class="seen-plans">
        <p>
          <!-- <img src="../../styles/icon/star-shape-big-and-small.png" alt /> -->
          See plans
        </p>
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
        <!-- <img
          src="../styles/icon/icon.png"
          alt=""
          class="icon"
          @click="goToHomePage"
        /> -->

        <div class="top-navigation-items-area">
          <div class="menu-icon cliked-btn-nav" @click="toggleNavBar">
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
      <!-- <router-link class="link" to="/">Home</router-link>
    <router-link class="link" to="/main">Main</router-link>-->
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
            src="https://media-exp1.licdn.com/dms/image/C4E03AQEnH6Lj0aymwg/profile-displayphoto-shrink_800_800/0/1650388602421?e=1657152000&v=beta&t=tsNDkf7ek1ei69b1_aAQFIQjeJiAvYnPdW-RiK2TaZA"
            alt=""
          />
        </div>
      </div>
    </header>
    <div class="empty-div" v-if="!isNavBarOpen"></div>

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
          class="bars"
          icon="bars"
          @click="toggleNavBarMobile(isOpen)"
        />
      </div>
    </div>
  </section>
</template>

<script>
// import { toyService } from "../services/toy-service.js";
// import customToyd from './custom-toyd.vue'

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
      // isWorkSpace: false,
      isOpen: false,
    }
  },
  computed: {
    isNavBarOpen() {
      return this.$store.getters.isNavBarOpen
    },
    // myClass() {
    //   // console.log('my class', this.currPage);
    //   if (this.currPage === 'homePage') return true;
    //   else return false;
    // },
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
      // this.$emit('boardClicked')
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
  created() {},
  watch: {
    // '$store.getters.currPage': {
    //   handler() {
    //     this.currPage = this.$store.getters.currPage;
    //   },
    // },
  },
}
</script>
