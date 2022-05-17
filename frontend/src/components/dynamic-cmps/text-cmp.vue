<template>
  <section class="text-cmp" @click="add">
    <div class="container-icon" v-if="!text && !isAdd">
      <font-awesome-icon class="text-icon" icon="circle-plus" />
    </div>
    <div v-if="!isAdd">{{ text }}</div>
    <div v-if="isAdd">
      <input ref="input" v-model="text" type="text" @focusout="out(text)" />
    </div>
  </section>
</template>

<script>
export default {
  props: {
    task: {
      type: Object,
    },
    boardId: String,
    groupId: String,
  },
  name: '',
  data() {
    return {
      text: this.task.text,
      isAdd: false,
    }
  },
  computed: {},
  watch: {},
  created() {},
  methods: {
    add() {
      this.isAdd = true
      setTimeout(() => this.$refs.input.focus(), 10)
    },
    out() {
      this.isAdd = false
      this.changeText()
    },
    changeText() {
      this.$emit('changeText', {
        groupId: this.groupId,
        taskId: this.task.id,
        text: this.text,
      })
    },
  },
  components: {},
}
</script>
