<template>
  <section class="add-task">
    <div class="add">
      <span class="side" :style="{ 'background-color': group.color }"></span>
      <div class="input-container">
        <input
          ref="input"
          v-model="newTaskTitle"
          type="text"
          placeholder=" + Add Task"
          @focus="isAdd = true"
          @focusout="focusOut"
          @keyup.enter="addTask"
        />
      </div>
    </div>

    <span class="right-side" @click.stop="focusIn">
      <div class="btn-container" v-if="isAdd">
        <button @click.stop="addTask">Add</button>
      </div>
    </span>
    <!-- <div class="end-cmps">
      <div></div>
    </div> -->
  </section>
</template>

<script>
export default {
  props: {
    group: {
      type: Object,
    },
  },
  name: 'add-task',
  data() {
    return {
      isAdd: false,
      newTaskTitle: '',
      currGroup: JSON.parse(JSON.stringify(this.group)),
    }
  },
  computed: {},
  watch: {},
  created() {},
  methods: {
    focusOut() {
      setTimeout(() => {
        this.isAdd = false
        this.newTaskTitle = ''
      }, 1000)
    },
    focusIn() {
      // this.$refs.input.focus()
      // console.log(this.$refs.input)
    },
    addTask() {
      this.isAdd = false
      if (!this.newTaskTitle) return
      const groupId = this.group.id
      const newTaskTitle = this.newTaskTitle
      this.newTaskTitle = ''
      this.$emit('addTask', { newTaskTitle, groupId })
    },
  },
  components: {},
}
</script>
