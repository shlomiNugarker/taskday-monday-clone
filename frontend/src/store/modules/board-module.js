import { boardService } from '../../services/board/board.service.js'
import { socketService } from '../../services/socket.service'

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
    sortBy: {
      type: '',
      direction: 1,
    },
    isNavBarOpen: false,
    isLoading: false,
    currTaskIdx: '',
  },
  getters: {
    isDetailsOpen(state) {
      return state.isDetailsOpen
    },
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
    isLoading(state) {
      return state.isLoading
    },
    members(state) {
      return state.currBoard.members
    },
    currFilterBy(state) {
      return JSON.parse(JSON.stringify(state.filterBy))
    },
    currSortBy(state) {
      return JSON.parse(JSON.stringify(state.sortBy))
    },
    currSortBy(state) {
      return JSON.parse(JSON.stringify(state.sortBy))
    },
    currTask(state) {
      return state.currBoard.groups[state.currTaskIdx.groupIdx].tasks[
        state.currTaskIdx.taskIdx
      ]
    },
    currGroupId(state) {
      return state.currBoard.groups[state.currTaskIdx.groupIdx].id
    },
    members(state) {
      return state.currBoard.members
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
      state.isLoading = false
    },
    updateFilter(state, { filterBy }) {
      console.log(filterBy)
      state.filterBy = filterBy
    },
    updateSort(state, { sortBy }) {
      state.sortBy = sortBy
    },
    setCurrTaskIdx(state, { groupIdx, taskIdx }) {
      state.currTaskIdx = { groupIdx, taskIdx }
    },

    //Boards
    addBoard(state, { newBoard }) {
      state.board = newBoard
      state.boardsList.push({
        boardId: newBoard._id,
        boardTitle: newBoard.title,
      })
    },
    removeBoard(state, { boardId }) {
      state.currBoard = null
      state.boardsList = state.boardsList.filter(
        (board) => board.boardId !== boardId
      )
    },
    //Groups:
    loadGroups(state, { groups }) {
      state.currBoard.groups = groups
    },
    updateGroup(state, { groupToEdit, idx }) {
      state.currBoard.groups.splice(idx, 1, groupToEdit)
    },
    updateBoard(state, { boardToEdit }) {
      state.currBoard = boardToEdit
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
    setLoading(state, { bool }) {
      state.isLoading = bool
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
    async newBoard({ commit, dispatch }, { boardName }) {
      var newBoard = boardService.getEmptyBoard(boardName)
      newBoard = await boardService.add(newBoard)
      commit({ type: 'addBoard', newBoard })

      dispatch({
        type: 'getBoardsList',
      })

      return newBoard
    },
    async getBoardsList({ state, commit }) {
      const boardsList = await boardService.getBoardsList()

      commit({ type: 'loadBoardsList', boardsList })
    },
    async getCurrTask({ commit, state }, { boardId, taskId }) {
      const copyBoard = JSON.parse(JSON.stringify(state.currBoard))
      // console.log(copyBoard)

      var currTask, groupIdx, taskIdx

      for (var i = 0; i < copyBoard.groups.length; i++) {
        for (var j = 0; j < copyBoard.groups[i].tasks.length; j++) {
          if (taskId === copyBoard.groups[i].tasks[j].id) {
            // console.log('groupIdx:', i)
            groupIdx = i
            // console.log('taskIdx:', j)
            taskIdx = j
            // currTask = copyBoard.groups[i].tasks[j]
          }
        }
      }

      commit({ type: 'setCurrTaskIdx', groupIdx, taskIdx })
      // console.log(currTask)
    },
    async getBoardById({ state, commit }, { boardId }) {
      try {
        commit({
          type: 'setLoading',
          bool: true,
        })

        const board = await boardService.getBoardById(boardId)

        socketService.emit('open board', board._id)

        commit({
          type: 'setCurrBoard',
          board,
        })
      } catch {
        console.log('cannot get board..')
      }
    },
    async removeBoard({ commit }, { boardId }) {
      await boardService.remove(boardId)
      commit({ type: 'removeBoard', boardId })
    },
    async editTask({ state, commit }, { task, groupId }) {
      const copyBoard = JSON.parse(JSON.stringify(state.currBoard))

      var groupIdx = state.currBoard.groups.findIndex(
        (currGroup) => currGroup.id === groupId
      )
      var taskIdx = copyBoard.groups[groupIdx].tasks.findIndex(
        (reqTask) => reqTask.id === task.id
      )

      copyBoard.groups[groupIdx].tasks.splice(taskIdx, 1, task)
      await boardService.update(copyBoard)
      socketService.emit('board newUpdateBoard', copyBoard)
      commit({ type: 'setCurrBoard', board: copyBoard })
      // commit({ type: 'loadGroups', groups: copyBoard.groups }) // <- cancel?
    },
    async updateGroup({ state, commit }, { groupToEdit, idx }) {
      const copyBoard = JSON.parse(JSON.stringify(state.currBoard))
      copyBoard.groups.splice(idx, 1, groupToEdit)
      await boardService.update(copyBoard)
      socketService.emit('board newUpdateBoard', copyBoard)
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
      socketService.emit('board newUpdateBoard', copyBoard)
      commit({ type: 'addTask', newTask, groupIdx }) // <- cancel??
      commit({ type: 'setCurrBoard', board: copyBoard })
    },
    async removeTask({ state, commit }, { groupId, task }) {
      const copyBoard = JSON.parse(JSON.stringify(state.currBoard))
      const group = boardService.getGroupById(copyBoard, groupId)
      var groupIdx = copyBoard.groups.findIndex((group) => group.id === groupId)
      var taskIdx = group.tasks.findIndex((reqTask) => reqTask.id === task.id)
      copyBoard.groups[groupIdx].tasks.splice(taskIdx, 1)
      socketService.emit('board newUpdateBoard', copyBoard)
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
      socketService.emit('board newUpdateBoard', copyBoard)
    },
    async removeGroup({ state, commit }, { groupId }) {
      const copyBoard = JSON.parse(JSON.stringify(state.currBoard))
      var groupIdx = copyBoard.groups.findIndex(
        (currGroup) => currGroup.id === groupId
      )
      copyBoard.groups.splice(groupIdx, 1)
      socketService.emit('board newUpdateBoard', copyBoard)
      await boardService.update(copyBoard)
      commit({ type: 'setCurrBoard', board: copyBoard })
    },
    async updateBoard({ dispatch, commit }, { boardToEdit }) {
      await boardService.update(boardToEdit)
      socketService.emit('board newUpdateBoard', boardToEdit)
      commit({ type: 'updateBoard', boardToEdit })
      dispatch({
        type: 'getBoardsList',
      })
    },
    async updateTaskDragDrop({ commit, state }, { group }) {
      const copyBoard = JSON.parse(JSON.stringify(state.currBoard))
      var groupIdx = state.currBoard.groups.findIndex(
        (currGroup) => currGroup.id === group.id
      )

      commit({
        type: 'setCurrBoard',
        board: copyBoard,
      })
      copyBoard.groups.splice(groupIdx, 1, group)

      await boardService.update(copyBoard)
      socketService.emit('board newUpdateBoard', copyBoard)
    },

    async updateGroupsDragDrop({ commit, state }, { groups }) {
      const copyBoard = JSON.parse(JSON.stringify(state.currBoard))

      copyBoard.groups = groups

      commit({
        type: 'setCurrBoard',
        board: copyBoard,
      })
      await boardService.update(copyBoard)
      socketService.emit('board newUpdateBoard', copyBoard)
    },
  },
}
