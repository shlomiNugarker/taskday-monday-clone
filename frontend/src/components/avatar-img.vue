<template>
  <section class="avatar">
    <div class="avater-container relative">
      <template v-for="(member, idx) in membersToShow" :key="idx">
        <img
          v-if="member.imgUrl"
          class="avater-img"
          :src="member.imgUrl"
          :alt="member.fullname || 'User'"
          :style="{ marginLeft: idx * this.margin + 'px' }"
        />
        <div 
          v-else 
          class="avatar-initials"
          :style="{ marginLeft: idx * this.margin + 'px' }"
        >
          {{ getUserInitials(member.fullname || 'User') }}
        </div>
      </template>
    </div>
  </section>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      membersToShow: null,
      margin: -5,
    }
  },
  props: {
    persons: Array,
  },
  created() {
    this.membersToShow = this.persons.length
      ? this.persons
      : [{ imgUrl: 'https://cdn.monday.com/icons/dapulse-person-column.svg' }]
  },
  components: {},
  computed: {
    getId() {
      return new Date().getTime() % 1000
    },
  },
  methods: {
    getUserInitials(fullname) {
      if (!fullname) return 'U'
      
      const nameParts = fullname.split(' ')
      if (nameParts.length > 1) {
        return (nameParts[0][0] + nameParts[1][0]).toUpperCase()
      }
      return nameParts[0][0].toUpperCase()
    }
  },
}
</script>
<style>
.avater-img,
.avatar-initials {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 1px solid white;
}

.avater-img {
  object-fit: cover;
}

.avatar-initials {
  background-color: #0073ea;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 12px;
}

.avater-container {
  display: flex;
  margin-left: 5px;
  color: #7c7c81;
}

.relative {
  position: relative;
}
</style>

