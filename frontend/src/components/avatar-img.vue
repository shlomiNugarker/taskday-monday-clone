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
