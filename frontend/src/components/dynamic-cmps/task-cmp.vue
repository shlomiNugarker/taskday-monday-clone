<template>
  <div class="left-btn-task flex">
    <span class="btn-down-task-container" :class="isHoverStyle">
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
          <p v-snip="{ lines: 1, mode: 'css' }" v-if="!isEdit">
            {{ task.title }}
          </p>
          <input
            ref="input"
            type="text"
            v-if="isEdit"
            v-model="copyTask.title"
            @focusout="isEdit = false"
            @keyup="changeTitle()"
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
      <span class="add-comment-container">
        <add-comment-btn @click="openDetails()" class="add-comment-icon" />
        <span v-if="commentsNum" class="msgs" @click="openDetails()">{{
          commentsNum
        }}</span>
      </span>
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
      title: '',
      copyTask: null,
    }
  },
  computed: {
    isHoverStyle() {
      if (this.isHover) return ''
      return 'hidden'
    },
    commentsNum() {
      return this.task.comments.length
    },
  },
  watch: {
    '$store.getters.currBoard'() {
      console.log('curr')
      var boardToEdit = this.$store.getters.currBoard

      // var groupIdx = currBoard.groups.findIndex(
      //   (currGroup) => currGroup.id === this.groupId
      // )
      // this.$store.dispatch({
      //   type: 'updateBoard',
      //   boardToEdit,
      // })
      // console.log('groupIdx', groupIdx)
      // if (groupIdx === -1) return
      // var taskIdx = currBoard.groups[groupIdx]?.tasks.findIndex(
      //   (currTask) => currTask.id === this.task.id
      // )
      // console.log('taskIdx', taskIdx)
      // if (taskIdx === -1) return

      // this.copyTask.title = JSON.parse(
      //   JSON.stringify(currBoard.groups[groupIdx]?.tasks[taskIdx].title)
      // )
      // console.log(this.copyTask)
    },
  },
  created() {
    this.copyTask = JSON.parse(JSON.stringify(this.task))
  },
  methods: {
    openDetails() {
      if (this.$route.params.taskId) {
        this.$router.back()
        setTimeout(() => {
          this.$router.push(
            {
              path: this.$store.getters.currBoard._id + '/task/' + this.task.id,
            },
            200
          )
        })
        return
      }

      this.$router.push(
        {
          path: this.$store.getters.currBoard._id + '/task/' + this.task.id,
        }
        // this.$store.getters.currBoard._id + '/task/' + this.task.id
      )
    },
    onEdit() {
      this.isEdit = true
      setTimeout(() => {
        this.$refs.input.focus()
      }, 1)
    },
    changeTitle() {
      setTimeout(() => {
        this.$emit('changeTitle', {
          // groupId: this.groupId,
          // taskId: this.task.id,
          title: this.copyTask.title,
        })
      }, 2000)
    },
    removeTask() {
      const groupId = this.groupId
      const task = this.task

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
