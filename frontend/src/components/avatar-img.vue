<template>
  <section>
    <div class="flex ml-[5px] text-[#7c7c81] relative">
      <img
        v-for="(member, idx) in membersToShow"
        :key="idx"
        class="w-[30px] h-[30px] rounded-full object-cover border border-white"
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
