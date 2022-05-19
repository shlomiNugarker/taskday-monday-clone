<template>
  <section>
    <div class="board-toolbar">
      <!-- <button class="loolbar-btn">Main-table</button> -->
      <div class="toolbar-btns flex">
        <div :class="{ 'blue-bottom': currView === 'main-table' }">
          <!-- <div class="blue-bottom" > -->
          <button class="main-table-btn" @click="changeView('main-table')">
            <img
              class="icon-toolbar"
              src="../styles/icon/table.png"
              alt=""
            />Main-table
          </button>
        </div>

        <div :class="{ 'blue-bottom': currView === 'kanban' }">
          <button class="kanban-btn" @click="changeView('kanban')">
            <font-awesome-icon class="chart-icon icon-toolbar" icon="bars" />
            <!-- <img
              class="chart-icon icon-toolbar"
              src="../styles/icon/kanban.png"
              alt=""
            /> -->
            Kanban
          </button>
        </div>

        <!-- <div>
          <button>
            <img
              class="icon-toolbar"
              src="../../styles/icon/table.png"
              alt=""
            />Main-table
          </button>
        </div> -->

        <!-- <div>
          <button>
            <img
              class="icon-toolbar"
              src="../../styles/icon/gantt.png"
              alt=""
            />
            Gantt
          </button>
        </div> -->

        <!-- <div>
          <button>
            <img
              class="icon-toolbar"
              src="../../styles/icon/kanban.png"
              alt=""
            />

            Kanban
          </button>
        </div> -->
        <p class="subsets-tab"></p>
        <div>
          <button>+ Add View</button>
        </div>
      </div>

      <div class="integrations-btn-content toolbar-btns flex">
        <div>
          <button>
            <span
              ><img
                class="integrate-icon integrate-2 flex"
                src="../styles/icon/integrate-2.png"
                alt=""
            /></span>
            Integrate
            <img
              class="integrate-icon"
              src="../styles/icon/integrate.png"
              alt=""
            />
            <img class="integrate-icon" src="../styles/icon/slack.png" alt="" />
            <img class="integrate-icon" src="../styles/icon/gmail.png" alt="" />
          </button>
        </div>
        <div>
          <button>
            <span><font-awesome-icon class="robot-icon" icon="robot" /></span>
            Automate
          </button>
        </div>
        <span class="collapse-btn" @click="toggleToolbar">
          <!-- <img class="arrow-up" src="../../styles/icon/arrow-up.png" alt="" -->
          <font-awesome-icon class="arrow-up" icon="angle-up" />
        </span>
      </div>
    </div>
    <!-- <div class="collapse-btn">d</div> -->
  </section>
</template>
<script>
// import integrateBtn from './icons/integrate-btn.vue';

export default {
  name: 'board-toolbar',
  props: {},
  data() {
    return {}
  },
  components: {},
  computed: {
    currView() {
      return this.$store.getters.currView
    },
  },
  methods: {
    toggleToolbar() {
      this.$emit('toggleToolbar')
    },
    changeView(view) {
      this.$emit('changeView', view)
    },
  },
}
</script>
