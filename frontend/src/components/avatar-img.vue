<template>
  <section class="avatar">
    <div class="avater-container relative">
      <img
        v-for="(member, idx) in membersToShow"
        :key="idx"
        class="avater-img"
        :src="member.imgUrl"
        alt=""
        :style="{ marginLeft: idx * this.margin + 'px' }"
      />
    </div>

    <!-- <img src="../styles/images/none-user.svg" alt="" /> -->
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
    members: Array,
  },
  created() {
    this.membersToShow = this.members || [
      { imgUrl: 'https://cdn-icons-png.flaticon.com/512/1946/1946429.png' },
    ]

    // this.membersToShow.forEach((member) => {
    //   if (!member.imgUrl) member.imgUrl = '../styles/images/none-user.svg'
    // })
  },
  components: {},
  computed: {
    getId() {
      return new Date().getTime() % 1000
    },
  },
  methods: {},
}
</script>
<style>
.avater-img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  object-fit: cover;
  /* margin-left: 20px; */
  border: 1px solid white;
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
