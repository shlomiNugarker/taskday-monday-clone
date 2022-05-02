import { boardService } from '../../services/board/board.service'

export default {
  state: {
    // boards: null,
    currBoard: '',
    boardsList: null,
    filteredBoard: null,
    filterBy: {
      txt: '',
      personId: '',
      statusTxt: '',
      priorityTxt: '',
    },
    isNavBarOpen: false,
  },
  getters: {
    isNavBarOpen(state) {
      return state.isNavBarOpen
    },
    boardsList(state) {
      return state.boardsList
    },
    // boards(state) {
    //   return state.boards
    // },
    board(state) {
      return state.currBoard
    },
    currBoard(state) {
      return state.currBoard
    },
    members(state) {
      return state.currBoard.members
    },
    currFilterBy(state) {
      return JSON.parse(JSON.stringify(state.filterBy))
    },
  },
  mutations: {
    setBoards(state, { boards }) {
      state.boards = boards
    },
    toggleNavBar(state) {
      state.isNavBarOpen = !state.isNavBarOpen
    },
    loadBoardsList(state, { boardsList }) {
      state.boardsList = boardsList
    },
    setCurrBoard(state, { board }) {
      state.currBoard = board
      // const copyBoard = JSON.parse(JSON.stringify(state.board))
    },
    updateFilter(state, { filterBy }) {
      state.filterBy = filterBy
    },

    //Groups:
    loadGroups(state, { groups }) {
      state.currBoard.groups = groups
    },
    updateGroup(state, { groupToEdit, idx }) {
      state.currBoard.groups.splice(idx, 1, groupToEdit)
    },
    addGroup(state, { newGroup }) {
      state.currBoard.groups.unshift(newGroup)
    },

    //tasks
    addTask(state, { newTask, groupIdx }) {
      state.currBoard.groups[groupIdx].tasks.push(newTask)
    },
    removeTask(state, { groupIdx, taskIdx }) {
      state.currBoard.groups[groupIdx].tasks.splice(taskIdx, 1)
    },
  },
  actions: {
    async getBoards({ commit }, { state }) {
      try {
        const boards = await boardService.query()
        commit({
          type: 'setBoards',
          boards,
        })
      } catch {
        console.log('cannot get boards..')
      }
    },
    async getBoardsList({ commit }) {
      const boardsList = await boardService.getBoardsList()
      console.log(boardsList)
      commit({ type: 'loadBoardsList', boardsList })
    },
    async getBoardById({ commit }, { boardId }) {
      try {
        const board = await boardService.getBoardById(boardId)
        commit({
          type: 'setCurrBoard',
          board,
        })
      } catch {
        console.log('cannot get board..')
      }
    },
    async editTask({ state, commit }, { task, groupId }) {
      const copyBoard = JSON.parse(JSON.stringify(state.currBoard))
      console.log('im from rdit')

      var groupIdx = state.currBoard.groups.findIndex(
        (currGroup) => currGroup.id === groupId
      )
      var taskIdx = copyBoard.groups[groupIdx].tasks.findIndex(
        (reqTask) => reqTask.id === task.id
      )

      copyBoard.groups[groupIdx].tasks.splice(taskIdx, 1, task)
      commit({ type: 'loadGroups', groups: copyBoard.groups })
      await boardService.update(copyBoard)
    },
    async updateGroup({ state, commit }, { groupToEdit, idx }) {
      const copyBoard = JSON.parse(JSON.stringify(state.currBoard))
      copyBoard.groups.splice(idx, 1, groupToEdit)
      await boardService.update(copyBoard)
      // socketService.emit('board newUpdateBoard', copyBoard)
      commit({ type: 'updateGroup', groupToEdit, idx })
    },
    async addTask({ state, commit }, { newTaskTitle, groupId }) {
      const newTask = boardService.getEmptyTask(newTaskTitle)
      const copyBoard = JSON.parse(JSON.stringify(state.currBoard))
      const groupIdx = copyBoard.groups.findIndex(
        (currGroup) => currGroup.id === groupId
      )
      copyBoard.groups[groupIdx].tasks.push(newTask)
      await boardService.update(copyBoard)
      // socketService.emit('board newUpdateBoard', copyBoard)
      commit({ type: 'addTask', newTask, groupIdx })
    },
    async removeTask({ state, commit }, { groupId, task }) {
      const copyBoard = JSON.parse(JSON.stringify(state.currBoard))
      const group = boardService.getGroupById(copyBoard, groupId)
      var groupIdx = copyBoard.groups.findIndex((group) => group.id === groupId)
      var taskIdx = group.tasks.findIndex((reqTask) => reqTask.id === task.id)
      copyBoard.groups[groupIdx].tasks.splice(taskIdx, 1)
      // socketService.emit('board newUpdateBoard', copyBoard)
      await boardService.update(copyBoard)
      commit({ type: 'removeTask', groupIdx, taskIdx })
      // commit({ type: 'filter', filterBy: state.filterBy})
    },
    async addGroup({ state, commit }) {
      const newGroup = boardService.getEmptyGroup()
      const copyBoard = JSON.parse(JSON.stringify(state.currBoard))

      copyBoard.groups.unshift(newGroup)

      await boardService.update(copyBoard)

      commit({ type: 'addGroup', newGroup })
      // socketService.emit('board newUpdateBoard', copyBoard)
    },
    async removeGroup({ state, commit }, { groupId }) {
      const copyBoard = JSON.parse(JSON.stringify(state.currBoard))
      var groupIdx = copyBoard.groups.findIndex(
        (currGroup) => currGroup.id === groupId
      )
      copyBoard.groups.splice(groupIdx, 1)
      // socketService.emit('board newUpdateBoard', copyBoard)
      await boardService.update(copyBoard)
      commit({ type: 'setCurrBoard', board: copyBoard })
    },
  },
}
