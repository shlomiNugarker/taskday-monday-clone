<template>
  <section>
    <div class="board-header-main">
      <div>
        <div class="title">
          <div v-if="!isEdit" @click="focusIn" @change="updateBoard">
            {{ title }}
          </div>
          <input
            v-if="isEdit"
            @keydown.enter="saveTitle"
            @input="saveTitle"
            class="input-title"
            ref="input"
            @focusout="isEdit = false"
            type="text"
            v-model="title"
          />

          <span @click="onClickInfo">
            <font-awesome-icon class="info-icon" icon="circle-info" />
          </span>

          <span @click="onClickStar">
            <img class="star-icon" src="../styles/icon/star-yellow.png" />
          </span>
        </div>
      </div>

      <div class="right-side-header">
        <div class="last-seen-btn">
          <button>Last seen</button>
        </div>

        <div class="invite-btn">
          <button @click="showUserList = !showUserList">
            <img 
              v-if="!loggedinUser || !loggedinUser.imgUrl" 
              class="invite-user-img" 
              src="../styles/icon/user.png" 
              alt="User" 
            />
            <img 
              v-else 
              class="invite-user-img" 
              :src="loggedinUser.imgUrl" 
              :alt="loggedinUser.fullname" 
            />
            Invite/ <span>{{ boardMembers.length || 1 }}</span>
          </button>
          <div v-if="showUserList" class="user-list-dropdown">
            <div class="dropdown-header">
              <h4>People on this board</h4>
            </div>
            <div class="current-users">
              <div class="user-item" v-if="loggedinUser">
                <img 
                  v-if="loggedinUser.imgUrl" 
                  class="user-avatar" 
                  :src="loggedinUser.imgUrl" 
                  :alt="loggedinUser.fullname" 
                />
                <div v-else class="user-avatar-fallback">
                  {{ getUserInitials(loggedinUser.fullname) }}
                </div>
                <div class="user-details">
                  <p class="user-name">{{ loggedinUser.fullname }}</p>
                  <p class="user-email">{{ loggedinUser.username }}</p>
                </div>
                <span class="user-role">Owner</span>
              </div>
              <div class="user-item" v-for="member in boardMembers" :key="member.id">
                <img 
                  v-if="member.imgUrl" 
                  class="user-avatar" 
                  :src="member.imgUrl" 
                  :alt="member.fullname" 
                />
                <div v-else class="user-avatar-fallback">
                  {{ getUserInitials(member.fullname) }}
                </div>
                <div class="user-details">
                  <p class="user-name">{{ member.fullname }}</p>
                  <p class="user-email">{{ member.username }}</p>
                </div>
                <span class="user-role">Member</span>
              </div>
            </div>
            <div class="invite-action">
              <input type="text" placeholder="Enter email or name" v-model="inviteEmail" />
              <button @click="inviteUser" :disabled="!inviteEmail">Invite</button>
            </div>
          </div>
        </div>

        <div class="invite">
          <button class="invite">Activty</button>
        </div>

        <div class="add-to-board">
          <p><span>+</span> Add to board</p>
        </div>

        <div class="container-dots">
          <font-awesome-icon class="dots-icon" icon="ellipsis" />
        </div>
      </div>
    </div>
    <p
      class="subtitle"
      v-if="!isEditSub"
      @click="focusSub"
      v-snip="{ lines: 1, mode: 'css' }"
    >
      {{ board.subtitle }}
    </p>
    <p class="subtitle" v-if="isEditSub">
      <input
        type="text"
        ref="inputSub"
        @focusout="isEditSub = false"
        v-model="subTitle"
        @keydown.enter="saveTitle"
        @input="saveTitle"
      />
    </p>
  </section>
</template>

<script>
export default {
  name: 'board-header-main',
  props: {
    board: Object,
  },
  data() {
    return {
      isEdit: false,
      isEditSub: false,
      title: '',
      wait: false,
      subTitle: '',
      showUserList: false,
      inviteEmail: '',
      boardMembers: []
    }
  },
  created() {
    this.title = JSON.parse(JSON.stringify(this.board?.title))
    this.subTitle = JSON.parse(JSON.stringify(this.board?.subtitle))
    this.loadBoardMembers()
    
    // Close user list dropdown when clicking outside
    document.addEventListener('click', this.closeDropdownOnClickOutside)
  },
  beforeDestroy() {
    document.removeEventListener('click', this.closeDropdownOnClickOutside)
  },
  components: {},
  computed: {
    loggedinUser() {
      return this.$store.getters.loggedinUser
    }
  },
  methods: {
    closeDropdownOnClickOutside(e) {
      if (!e.target.closest('.invite-btn') && this.showUserList) {
        this.showUserList = false
      }
    },
    getUserInitials(fullname) {
      if (!fullname) return 'U'
      
      const nameParts = fullname.split(' ')
      if (nameParts.length > 1) {
        return (nameParts[0][0] + nameParts[1][0]).toUpperCase()
      }
      return nameParts[0][0].toUpperCase()
    },
    loadBoardMembers() {
      // In a real app, we'd load board members from the board data
      // For now, we'll just simulate with an empty array
      // If the board had a members array, we'd use it
      this.boardMembers = this.board?.members || []
    },
    inviteUser() {
      if (!this.inviteEmail) return
      
      // In a real app, you'd send an invitation
      // For this demo, we just show a notification
      alert(`Invitation sent to ${this.inviteEmail}`)
      this.inviteEmail = ''
    },
    focusIn() {
      this.isEdit = true

      setTimeout(() => {
        this.$refs.input.focus()
      }, 10)
    },
    focusSub() {
      this.isEditSub = true

      setTimeout(() => {
        this.$refs.inputSub.focus()
      }, 10)
    },
    focusOut() {
      this.isEdit = false
    },
    saveTitle() {
      if (this.wait) return
      this.wait = true
      this.updateBoard()
    },
    updateBoard() {
      setTimeout(() => {
        this.wait = false

        const boardToEdit = JSON.parse(JSON.stringify(this.board))
        boardToEdit.title = this.title
        boardToEdit.subtitle = this.subTitle

        this.$store.dispatch({
          type: 'updateBoard',
          boardToEdit,
        })
      }, 2000)
    },
  },
  watch: {
    '$store.getters.currBoard'() {
      this.title = this.$store.getters.currBoard?.title
    },
  },
}
</script>

<style scoped>
.invite-btn {
  position: relative;
}

.user-list-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  width: 300px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  z-index: 100;
  overflow: hidden;
}

.dropdown-header {
  padding: 12px 16px;
  border-bottom: 1px solid #eaeaea;
}

.dropdown-header h4 {
  margin: 0;
  font-size: 16px;
  font-weight: 500;
}

.current-users {
  max-height: 200px;
  overflow-y: auto;
}

.user-item {
  display: flex;
  align-items: center;
  padding: 10px 16px;
  border-bottom: 1px solid #f5f5f5;
}

.user-avatar, .user-avatar-fallback {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right: 12px;
}

.user-avatar-fallback {
  background-color: #0073ea;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 14px;
}

.user-details {
  flex: 1;
}

.user-name {
  margin: 0;
  font-size: 14px;
  font-weight: 500;
}

.user-email {
  margin: 0;
  font-size: 12px;
  color: #666;
}

.user-role {
  font-size: 12px;
  color: #0073ea;
  font-weight: 500;
}

.invite-action {
  padding: 12px 16px;
  display: flex;
  gap: 8px;
  border-top: 1px solid #eaeaea;
}

.invite-action input {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.invite-action button {
  padding: 8px 12px;
  background-color: #0073ea;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
}

.invite-action button:disabled {
  background-color: #aaa;
  cursor: not-allowed;
}
</style>
