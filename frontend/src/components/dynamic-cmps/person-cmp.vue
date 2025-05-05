<template>
  <section class="person-cmp" @mouseover="mouseOver" @mouseleave="mouseLeave">
    <el-dropdown class="side-drop-down" trigger="click">
      <span class="el-dropdown-link">
        <font-awesome-icon icon="plus" class="plus-icon" :class="hideStyle" />
        <div v-if="assignedMembers.length">
          <img
            v-for="(member, idx) in assignedMembers"
            :key="idx"
            class="avater-img"
            :src="member.imgUrl"
            alt=""
            :style="{ marginLeft: idx * this.margin + 'px' }"
          />
        </div>
        <div v-else>
          <img
            class="avater-img"
            src="https://cdn.monday.com/icons/dapulse-person-column.svg"
            alt=""
          />
        </div>

        <el-icon class="el-icon2"> </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item v-for="member in assignedMembers" :key="member._id">
            <span class="member-opt" @click="removePerson(member)">
              <img class="img-url-person" :src="member.imgUrl" alt="" />
              <span> {{ member.fullname }}</span>
              <font-awesome-icon icon="xmark" />
            </span>
          </el-dropdown-item>
          <p class="divider-p">People</p>
          <el-dropdown-item
            v-for="member in notAssignedMembers"
            :key="member._id"
          >
            <span @click="addPerson(member)" class="flex">
              <img class="img-url-person" :src="member.imgUrl" alt="" />
              <span>
                {{ member.fullname }}
              </span>
            </span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
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
  name: 'person-cmp',
  data() {
    return {
      margin: -7,
      isOver: false,
      assignedMembers: [],
      notAssignedMembers: [],
    }
  },
  computed: {
    hideStyle() {
      return !this.isOver ? 'hidden' : ''
    },
    members() {
      return this.$store.getters.members
    },
  },
  watch: {},
  created() {
    this.assignedMembers = [...this.task.person]
    this.notAssignedMembers = this.members.filter((member) => {
      return !this.assignedMembers.find((assMem) => assMem._id === member._id)
    })
  },
  methods: {
    mouseOver() {
      this.isOver = true
    },
    mouseLeave() {
      this.isOver = false
    },
    addPerson(person) {
      this.assignedMembers.push(person)
      const idx = this.notAssignedMembers.findIndex(
        (member) => member._id === person._id
      )
      this.notAssignedMembers.splice(idx, 1)

      this.$emit('addAssignedMember', {
        person,
        groupId: this.groupId,
        taskId: this.task.id,
      })
    },
    removePerson(person) {
      this.notAssignedMembers.push(person)
      const idx = this.assignedMembers.findIndex(
        (member) => member._id === person._id
      )
      this.assignedMembers.splice(idx, 1)
      this.$emit('removeAssignedMember', {
        memberId: person._id,
        groupId: this.groupId,
        taskId: this.task.id,
      })
    },
  },
  components: {},
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
.member-opt {
  display: flex;
  min-width: 115px;

  justify-content: space-between;
  align-items: center;
}
.img-url-person {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  object-fit: cover;
}
</style>
