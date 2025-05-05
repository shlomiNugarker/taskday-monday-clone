<template>
  <section class="flex">
    <header class="main-menu">
      <span class="toggle-nav-bar" @click="closeModal"
        ><font-awesome-icon class="icon-right" icon="angle-right"
      /></span>
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
  created() {},
  watch: {},
}
</script>
