<template>
  <section>
    <h1>fdsff</h1>
    <h1 @click="goDemo">Hello home go</h1>
    {{ boardsList }}
  </section>
</template>

<script>
export default {
  name: '',
  data() {
    return {}
  },
  computed: {
    boardsList() {
      return this.$store.getters.boardsList
    },
  },
  created() {
    this.$store.dispatch({ type: 'getBoardsList' })
  },
  methods: {
    goDemo() {
      var boardId = this.boardsList[0].boardId
      console.log(boardId)
      this.$router.push(`/board/${boardId}`)
    },
  },
  components: {},
}
</script>
