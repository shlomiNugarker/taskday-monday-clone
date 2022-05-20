<template>
  <section class="columns-header">
    <div class="titles">
      <div class="container-first-title">
        <span
          class="btn-down-task-container"
          :style="{ 'background-color': group.color }"
        >
          <el-dropdown class="side-drop-down" trigger="click">
            <span class="el-dropdown-link">
              <font-awesome-icon icon="caret-down" />
              <el-icon class="el-icon2"> </el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="removeGroup()">
                  <font-awesome-icon icon="trash-can" />Delete
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </span>
        <div
          class="title"
          :style="{ color: group.color }"
          v-if="!isEdit"
          @click="onEdit"
        >
          {{ group.title }}
        </div>
        <div v-if="isEdit" class="title input-container">
          <input
            :style="{ color: group.color }"
            ref="input"
            v-if="isEdit"
            type="text"
            v-model="groupCopy.title"
            @focusout="isEdit = false"
            @keyup="changeGroupTitle($event)"
          />
        </div>
      </div>
      <div class="status cmp-title">Status</div>
      <div class="cmp-title">Person</div>
      <div class="cmp-title">Priority</div>
      <div class="cmp-title">Date</div>
      <div class="cmp-title">Text</div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    group: {
      type: Object,
    },
  },
  name: 'columns-header-cmp',
  data() {
    return {
      isEdit: false,
      groupCopy: null,
      cmpsOrder: [
        'task-cmp',
        'status-cmp',
        'person-cmp',
        'priority-cmp',
        'date-cmp',
        'text-cmp',
      ],
    }
  },
  computed: {},
  watch: {},
  created() {
    this.groupCopy = JSON.parse(JSON.stringify(this.group))
  },
  methods: {
    onEdit() {
      this.isEdit = true
      setTimeout(() => {
        this.$refs.input.focus()
      }, 1)
    },
    changeGroupTitle($event, title) {
      setTimeout(() => {
        this.$emit('changeGroupTitle', {
          groupId: this.group.id,
          title: this.groupCopy.title,
        })
      }, 2000)
    },
    removeGroup() {
      this.$emit('removeGroup', this.group.id)
    },
  },
  components: {},
}
</script>
<style></style>
