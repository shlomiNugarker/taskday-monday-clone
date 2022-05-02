<template>
  <div class="left-btn-task flex">
    <span class="btn-down-task-container" :class="isHoverStyle">
      <!-- <font-awesome-icon icon="caret-down" /> -->
      <el-dropdown class="side-drop-down" trigger="click">
        <span class="el-dropdown-link">
          <font-awesome-icon icon="caret-down" />
          <el-icon class="el-icon2"> </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="removeTask()">
              <font-awesome-icon icon="trash-can" />Delete
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </span>
    <section class="task-cmp">
      <div class="container-task flex">
        <div class="task-title">
          <span class="side" :style="{ 'background-color': groupColor }"></span>
          <p v-if="!isEdit">{{ taskCopy.title }}</p>
          <input
            ref="input"
            type="text"
            v-if="isEdit"
            v-model="taskCopy.title"
            @focusout="isEdit = false"
            @keyup="changeTitle($event, taskCopy.title)"
          />
          <button
            class="edit-btn"
            :class="isHoverStyle"
            @click="onEdit"
            v-if="!isEdit"
          >
            Edit
          </button>
        </div>
      </div>
      <add-comment-btn class="add-comment-icon" />
    </section>
  </div>
</template>

<script>
import addCommentBtn from '../icons/add-comment-btn.vue'

export default {
  props: {
    task: {
      type: Object,
    },
    isHover: {
      type: Boolean,
    },
    boardId: String,
    groupId: String,
    groupColor: String,
  },
  name: 'task-cmp',
  data() {
    return {
      isEdit: false,
      taskCopy: '',
    }
  },
  computed: {
    isHoverStyle() {
      if (this.isHover) return ''
      return 'hidden'
    },
  },
  watch: {},
  created() {
    this.taskCopy = JSON.parse(JSON.stringify(this.task))
  },
  methods: {
    onEdit() {
      this.isEdit = true
      setTimeout(() => {
        this.$refs.input.focus()
      }, 1)
    },
    changeTitle(event, title) {
      // console.log(title)
      // this.taskCopy.title = title
      // console.log(this.taskCopy.title)

      setTimeout(() => {
        this.$emit('changeTitle', {
          groupId: this.groupId,
          taskId: this.task.id,
          title,
        })
      }, 2000)
    },
    removeTask() {
      const groupId = this.groupId
      const task = this.task
      console.log(this.task)
      this.$store.dispatch({ type: 'removeTask', groupId, task })
    },
  },
  mounted() {},
  components: {
    addCommentBtn,
  },
}
</script>

<style>
.hidden {
  visibility: hidden;
}

.el-dropdown-link {
  margin-left: 15px;
}
</style>
