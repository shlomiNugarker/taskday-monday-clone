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
          <el-dropdown trigger="click" @command="handleCommand">
            <span class="el-dropdown-link" style="background: transparent; border: none;">
              <img
                v-if="loggedinUser && loggedinUser.imgUrl"
                class="name-icon"
                :src="loggedinUser.imgUrl"
                :alt="loggedinUser.fullname"
              />
              <div v-else-if="loggedinUser" class="user-initial">
                {{ getUserInitials }}
              </div>
              <img
                v-else
                class="name-icon"
                src="https://res.cloudinary.com/duajg3ah1/image/upload/v1660763357/shlomiN_mewit4.jpg"
                alt="Default user"
              />
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <div class="user-info">
                  <p class="user-name">{{ loggedinUser ? loggedinUser.fullname : 'Guest' }}</p>
                  <p class="user-email">{{ loggedinUser ? loggedinUser.username : 'Not logged in' }}</p>
                </div>
                <div class="menu-divider"></div>
                <el-dropdown-item command="profile">
                  <font-awesome-icon icon="user" /> Profile
                </el-dropdown-item>
                <el-dropdown-item command="logout" v-if="loggedinUser">
                  <font-awesome-icon icon="sign-out-alt" /> Logout
                </el-dropdown-item>
                <el-dropdown-item command="login" v-else>
                  <font-awesome-icon icon="sign-in-alt" /> Login
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
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
    loggedinUser() {
      console.log('loggedinUser', this.$store.getters.loggedinUser)
      return this.$store.getters.loggedinUser
    },
    getUserInitials() {
      if (!this.loggedinUser || !this.loggedinUser.fullname) return 'G'
      
      const nameParts = this.loggedinUser.fullname.split(' ')
      if (nameParts.length > 1) {
        return (nameParts[0][0] + nameParts[1][0]).toUpperCase()
      }
      return nameParts[0][0].toUpperCase()
    }
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
    editProfile() {
      // Navigate to profile edit page
    },
    logout() {
      this.$store.dispatch({ type: 'logout' })
      this.$router.push('/login')
    },
    login() {
      this.$router.push('/login')
    },
    handleCommand(command) {
      if (command === 'profile') {
        this.editProfile()
      } else if (command === 'logout') {
        this.logout()
      } else if (command === 'login') {
        this.login()
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
  created() {
  },
  beforeDestroy() {
  },
  watch: {},
}
</script>

<style scoped>
.user-initial {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #0073ea;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.user-info {
  padding: 15px;
}

.user-name {
  font-weight: bold;
  margin: 0 0 5px 0;
}

.user-email {
  font-size: 0.85em;
  color: #666;
  margin: 0;
}

.menu-divider {
  height: 1px;
  background-color: #eaeaea;
  margin: 5px 0;
}

.el-dropdown-link {
  cursor: pointer;
  display: flex;
  align-items: center;
  background: transparent;
}

.name-icon {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
  background: transparent;
}

.icon-container {
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
}

:deep(.el-dropdown) {
  background: transparent;
}

:deep(.el-popper) {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
}

/* Override default element-plus styles that might be causing the white circle */
:deep(.el-button),
:deep(.el-button:hover),
:deep(.el-button:focus) {
  background: transparent;
  border: none;
  box-shadow: none;
  padding: 0;
}

/* Override Element Plus dropdown positioning */
:deep(.el-dropdown-menu) {
  min-width: 220px;
}

:deep(.el-dropdown-item) {
  display: flex;
  align-items: center;
  gap: 10px;
}

/* Additional styles to remove any white background */
:deep(.el-dropdown .el-dropdown__caret-button) {
  background-color: transparent;
  border: none;
}

:deep(.el-dropdown-selfdefine) {
  background-color: transparent;
  border: none;
  outline: none;
  box-shadow: none;
}

:deep(.el-button) {
  background-color: transparent !important;
  border: none !important;
  box-shadow: none !important;
  padding: 0 !important;
}

:deep(.el-dropdown-link) {
  padding: 0;
  margin: 0;
  border: none;
  box-shadow: none;
  background-color: transparent !important;
}
</style>
