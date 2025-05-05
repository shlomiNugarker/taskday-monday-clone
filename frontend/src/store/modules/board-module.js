import { boardService } from '../../services/board/board.service.js'
import { socketService } from '../../services/socket.service'

export default {
  state: {
    currBoard: '',
    boardsList: null,
    filteredBoard: null,
    currView: 'main-table',
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
    isLoading: true,
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
    currView(state) {
      return state.currView
    },
  },
  mutations: {
    setBoards(state, { boards }) {
      state.boards = boards
    },
    toggleNavBar(state, { bool }) {
      state.isNavBarOpen = bool
    },
    loadBoardsList(state, { boardsList }) {
      state.boardsList = boardsList
    },
    setCurrBoard(state, { board }) {
      state.currBoard = board
      state.isLoading = false
    },
    updateFilter(state, { filterBy }) {
      state.filterBy = filterBy
    },
    updateSort(state, { sortBy }) {
      state.sortBy = sortBy
    },
    changeView(state, { view }) {
      state.currView = view
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

    addGroup(state, { copyBoard }) {
      state.currBoard = copyBoard
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

      var currTask, groupIdx, taskIdx

      for (var i = 0; i < copyBoard.groups.length; i++) {
        for (var j = 0; j < copyBoard.groups[i].tasks.length; j++) {
          if (taskId === copyBoard.groups[i].tasks[j].id) {
            groupIdx = i

            taskIdx = j
          }
        }
      }

      commit({ type: 'setCurrTaskIdx', groupIdx, taskIdx })
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
    async removeBoard({ dispatch, commit }, { boardId }) {
      await boardService.remove(boardId)
      commit({ type: 'removeBoard', boardId })

      dispatch({
        type: 'getBoardsList',
      })
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
      commit({ type: 'addTask', newTask, groupIdx })
      commit({ type: 'setCurrBoard', board: copyBoard })
    },
    async removeTask({ state, commit }, { groupId, task }) {
      const copyBoard = JSON.parse(JSON.stringify(state.currBoard))
      const group = boardService.getGroupById(copyBoard, groupId)
      var groupIdx = copyBoard.groups.findIndex((group) => group.id === groupId)
      var taskIdx = group.tasks.findIndex((reqTask) => reqTask.id === task.id)
      copyBoard.groups[groupIdx].tasks.splice(taskIdx, 1)
      socketService.emit('board newUpdateBoard', copyBoard)
      commit({ type: 'removeTask', groupIdx, taskIdx })
      commit({ type: 'setCurrBoard', board: copyBoard })
    },
    async moveTaskBetweenGroups({ state, commit }, { task, toGroupId, atIdx }) {
      const copyBoard = JSON.parse(JSON.stringify(state.currBoard))
      
      // Find source group and remove task
      let foundSourceGroup = false
      for (let i = 0; i < copyBoard.groups.length; i++) {
        const group = copyBoard.groups[i]
        const taskIdx = group.tasks.findIndex(t => t.id === task.id)
        
        if (taskIdx !== -1) {
          // Found the task, remove it from current group
          group.tasks.splice(taskIdx, 1)
          foundSourceGroup = true
          break
        }
      }
      
      // If this is a new task being added, not moved
      if (!foundSourceGroup) {
        task.groupId = toGroupId
      }
      
      // Find target group and add task
      const targetGroupIdx = copyBoard.groups.findIndex(g => g.id === toGroupId)
      if (targetGroupIdx !== -1) {
        if (atIdx !== undefined) {
          copyBoard.groups[targetGroupIdx].tasks.splice(atIdx, 0, task)
        } else {
          copyBoard.groups[targetGroupIdx].tasks.push(task)
        }
      }
      
      await boardService.update(copyBoard)
      socketService.emit('board newUpdateBoard', copyBoard)
      commit({ type: 'setCurrBoard', board: copyBoard })
    },
    
    async updateTasksOrder({ state, commit }, { tasks, groupId }) {
      const copyBoard = JSON.parse(JSON.stringify(state.currBoard))
      const groupIdx = copyBoard.groups.findIndex(g => g.id === groupId)
      
      if (groupIdx !== -1) {
        copyBoard.groups[groupIdx].tasks = [...tasks]
        await boardService.update(copyBoard)
        socketService.emit('board newUpdateBoard', copyBoard)
        commit({ type: 'setCurrBoard', board: copyBoard })
      }
    },
    
    async updateGroupsOrder({ state, commit }, { groups, boardId }) {
      const copyBoard = JSON.parse(JSON.stringify(state.currBoard))
      copyBoard.groups = [...groups]
      
      await boardService.update(copyBoard)
      socketService.emit('board newUpdateBoard', copyBoard)
      commit({ type: 'setCurrBoard', board: copyBoard })
    },
    
    async addTaskToGroup({ state, commit }, { groupId, task }) {
      const copyBoard = JSON.parse(JSON.stringify(state.currBoard))
      const groupIdx = copyBoard.groups.findIndex(g => g.id === groupId)
      
      if (groupIdx !== -1) {
        copyBoard.groups[groupIdx].tasks.push(task)
        await boardService.update(copyBoard)
        socketService.emit('board newUpdateBoard', copyBoard)
        commit({ type: 'setCurrBoard', board: copyBoard })
      }
    },
    
    async addGroup({ state, commit }) {
      const copyBoard = JSON.parse(JSON.stringify(state.currBoard))
      const newGroup = boardService.getEmptyGroup()
      copyBoard.groups.push(newGroup)
      await boardService.update(copyBoard)
      socketService.emit('board newUpdateBoard', copyBoard)
      commit({ type: 'addGroup', copyBoard })
    },
    async removeGroup({ state, commit }, { groupId }) {
      const copyBoard = JSON.parse(JSON.stringify(state.currBoard))
      const groupIdx = copyBoard.groups.findIndex(
        (currGroup) => currGroup.id === groupId
      )
      copyBoard.groups.splice(groupIdx, 1)
      await boardService.update(copyBoard)
      socketService.emit('board newUpdateBoard', copyBoard)
      commit({ type: 'setCurrBoard', board: copyBoard })
    },
    async updateBoard({ dispatch, commit }, { boardToEdit }) {
      const updatedBoard = await boardService.update(boardToEdit)
      socketService.emit('board newUpdateBoard', updatedBoard)
      commit({ type: 'updateBoard', boardToEdit: updatedBoard })
    },
    async updateTaskDragDrop({ commit, state }, { group }) {
      const copyBoard = JSON.parse(JSON.stringify(state.currBoard))
      const groupIdx = copyBoard.groups.findIndex(
        (currGroup) => currGroup.id === group.id
      )
      copyBoard.groups.splice(groupIdx, 1, group)
      socketService.emit('board newUpdateBoard', copyBoard)
      boardService.update(copyBoard)
      commit({ type: 'setCurrBoard', board: copyBoard })
    },
    async updateGroupsDragDrop({ commit, state }, { groups }) {
      const copyBoard = JSON.parse(JSON.stringify(state.currBoard))
      copyBoard.groups = groups
      socketService.emit('board newUpdateBoard', copyBoard)
      boardService.update(copyBoard)
      commit({ type: 'setCurrBoard', board: copyBoard })
    },
    async updateTask({ state, commit }, { updateType, groupId, taskId, data }) {
      try {
        const copyBoard = JSON.parse(JSON.stringify(state.currBoard))
        const groupIdx = copyBoard.groups.findIndex(g => g.id === groupId)
        
        if (groupIdx === -1) return
        
        const taskIdx = copyBoard.groups[groupIdx].tasks.findIndex(t => t.id === taskId)
        if (taskIdx === -1) return
        
        const task = copyBoard.groups[groupIdx].tasks[taskIdx]
        
        // Update based on the update type
        switch (updateType) {
          case 'title':
            task.title = data
            break
          case 'status':
            task.status = data
            break
          case 'priority':
            task.priority = data
            break
          case 'text':
            task.text = data
            break
          case 'timeline':
            task.timeline = {
              startDate: data?.[0] || null,
              endDate: data?.[1] || null
            }
            break
          case 'removeMember':
            task.person = task.person.filter(p => p._id !== data)
            break
          case 'addMember':
            if (!task.person) task.person = []
            task.person.push(data)
            break
          default:
            console.warn('Unknown update type:', updateType)
            return
        }
        
        await boardService.update(copyBoard)
        socketService.emit('board newUpdateBoard', copyBoard)
        commit({ type: 'setCurrBoard', board: copyBoard })
      } catch (error) {
        console.error('Failed to update task:', error)
      }
    },
  },
}
