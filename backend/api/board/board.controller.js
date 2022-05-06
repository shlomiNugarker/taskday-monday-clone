const logger = require('../../services/logger.service')
const boardService = require('./board.service')

async function getBoards(req, res) {
  try {
    const boards = await boardService.query(req.query)
    res.send(boards)
  } catch (err) {
    logger.error('Cannot get boards, board-controller', err)
    res.status(500).send({ err: 'Failed to get boards' })
  }
}
async function getBoard(req, res) {
  try {
    const board = await boardService.getById(req.params.id)
    console.log(req.params.id)
    res.send(board)
  } catch (err) {
    logger.error('Cannot get boards', err)
    res.status(500).send({ err: 'Failed to get boards, board-controller' })
  }
}

async function deleteBoard(req, res) {
  try {
    await boardService.remove(req.params.id)
    res.send({ msg: 'Deleted successfully' })
  } catch (err) {
    logger.error('Failed to delete board', err)
    res.status(500).send({ err: 'Failed to delete board, board-controller' })
  }
}

async function addBoard(req, res) {
  try {
    var board = req.body

    board = await boardService.add(board)

    res.send(board)
  } catch (err) {
    console.log(err)
    logger.error('Failed to add board', err)
    res.status(500).send({ err: 'Failed to add board, board-controller' })
  }
}
async function updateBoard(req, res) {
  try {
    var board = req.body
    // board.byUserId = req.session.user._id
    board = await boardService.update(board)

    res.send(board)
  } catch (err) {
    console.log(err)
    logger.error('Failed to update board', err)
    res.status(500).send({ err: 'Failed to update board, board-controller' })
  }
}

module.exports = {
  getBoards,
  getBoard,
  deleteBoard,
  updateBoard,
  addBoard,
}
