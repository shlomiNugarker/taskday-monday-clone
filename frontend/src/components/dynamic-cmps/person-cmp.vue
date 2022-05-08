<template>
  <section class="person-cmp" @mouseover="mouseOver" @mouseleave="mouseLeave">
    <font-awesome-icon icon="plus" class="plus-icon" :class="hideStyle" />
    <div class="container">
      <avatar :members="task.members"></avatar>
    </div>
  </section>
</template>

<script>
import avatar from '../avatar-img.vue'

export default {
  props: {
    task: {
      type: Object,
    },
    boardId: String,
    groupId: String,
  },
  name: 'person-cmp',
  data() {
    return {
      isOver: false,
    }
  },
  computed: {
    hideStyle() {
      return !this.isOver ? 'hidden' : ''
    },
  },
  watch: {},
  created() {},
  methods: {
    mouseOver() {
      this.isOver = true
    },
    mouseLeave() {
      this.isOver = false
    },
  },
  components: {
    avatar,
  },
}
</script>

<style>
.plus-icon {
  position: relative;
  left: -55px;
  color: white;
  font-size: 13px;
  border-radius: 50%;
  padding: 2px;
  background-color: #0073ea;
}
.hidden {
  visibility: hidden;
}
</style>
