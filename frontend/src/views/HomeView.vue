<template>
  <section>
    <h1>Hello home</h1>

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
  </section>
</template>

<script>
export default {
  name: '',
  data() {
    return {}
  },
  computed: {},
  created() {},
  methods: {},
  components: {},
}
</script>
