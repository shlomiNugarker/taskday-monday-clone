import { storageService } from '../async-storage.service'
import { httpService } from '../http.service'
import { utilService } from '../util.service.js'

export const boardService = {
  query,
  getBoardById,
  update,
  remove,
  getBoardsList,
  getEmptyTask,
  getGroupById,
  getEmptyGroup,
  getEmptyBoard,
  add,
}

async function query(filterBy) {
  return await httpService.query('board')
  // return await storageService.query('board')
}

async function getBoardById(boardId) {
  return await httpService.get('board/' + boardId)
  // return await storageService.get('board', boardId)
}

async function update(board) {
  const updatedBoard = await httpService.put(`board`, board)
  // const updatedBoard = await storageService.put('board', board)
  return updatedBoard
}

async function remove(boardId) {
  return await httpService.delete(`board/${boardId}`)
  // return await storageService.remove('board', boardId)
}

async function getBoardsList() {
  var res
  res = await httpService.get('board')
  console.log(res)
  // res = await storageService.query('board')

  res.forEach((board, idx) => {
    res[idx] = {
      boardId: board._id,
      boardTitle: board.title,
    }
  })

  return res
}

function getEmptyTask(groupToEditTitle) {
  const newTask = {
    id: 'i_' + utilService.makeId(),
    title: groupToEditTitle,
    createdAt: new Date().getTime(),
    date: '',
    person: [],
    status: '-',
    timeline: {
      startDate: '',
      endDate: '',
    },
    priority: '',

    activityLog: [
      {
        id: 'a_' + utilService.makeId(),
        time: Date.now(),
        action: 'Created',
        byUser: {},
      },
    ],
    person: [],
    comments: [],
  }
  return newTask
}

// Groups:

function getGroupById(board, groupId) {
  return board.groups.find((group) => group.id === groupId)
}

function getEmptyGroup() {
  return {
    id: 'g_' + utilService.makeId(),
    title: 'New Group',
    color: utilService.getRandomPredefinedColor(),
    createdAt: new Date().getTime(),
    tasks: [getEmptyTask('New Task')],
  }
}

async function removeGroup(board, groupId) {
  const groupIdx = board.groups.findIndex(
    (currGroup) => currGroup.id === groupId
  )
  board.groups.splice(groupIdx, 1)
  const updatedBoard = await httpService.put(`board`, board)
  // const updatedBoard = await storageService.put('board', board)
  return updatedBoard
}

async function add(board) {
  const addedBoard = await httpService.post(`board`, board)

  // const addedBoard = await storageService.post('board', board)
  return addedBoard
}

function getEmptyBoard(boardName) {
  const newBoard = {
    title: '',
    subtitle: 'Add subtitle',
    createdAt: new Date().getTime(),
    createdBy: {
      _id: 'u_' + utilService.makeId(), // fix to correct user
      fullname: 'Shlomi Nugarker',
      imgUrl:
        'https://files.monday.com/use1/photos/26222916/thumb_small/26222916-user_photo_2021_11_30_09_26_11.png?1638264371',
    },
    members: [
      {
        _id: 'u' + utilService.makeId(), // fix to correct user
        fullname: 'Shlomi Nugarker',
        imgUrl:
          'https://files.monday.com/use1/photos/26222916/thumb_small/26222916-user_photo_2021_11_30_09_26_11.png?1638264371',
      },
    ],
    cmpsOrder: [
      'task-cmp',
      'status-cmp',
      'person-cmp',
      'priority-cmp',
      'date-cmp',
      'text-cmp',
    ],
    predefineColors: [
      '#ff4500',
      '#ff8c00',
      '#ffd700',
      '#90ee90',
      '#00ced1',
      '#00ecd1',
      '#1e90ff',
      '#c71585',
      '#c7f5a5',
      '#c7158577',
    ],
    groups: [getEmptyGroup()],
  }
  newBoard.title = boardName
  return newBoard
}
