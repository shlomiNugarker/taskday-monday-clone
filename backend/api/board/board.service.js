const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId

async function query(filterBy = {}) {
  try {
    // const criteria = _buildCriteria(filterBy)
    const collection = await dbService.getCollection('board')
    const boards = await collection.find().toArray()
    return boards
  } catch (err) {
    logger.error('cannot find boards, board-service', err)
    throw err
  }
}
async function getById(boardId) {
  try {
    const collection = await dbService.getCollection('board')
    const board = await collection.findOne({ _id: ObjectId(boardId) })
    return board
  } catch (err) {
    logger.error('cannot find board, board-service', err)
    throw err
  }
}
async function update(board) {
  try {
    var id = ObjectId(board._id)
    delete board._id
    const collection = await dbService.getCollection('board')
    const resBoard = await collection.updateOne(
      { _id: id },
      { $set: { ...board } }
    )
    return resBoard
  } catch (err) {
    console.log(err)
    logger.error('cannot find boards, board-service', err)
    throw err
  }
}

async function remove(boardId) {
  try {
    const collection = await dbService.getCollection('board')
    // remove only if user is owner/admin???? need to fix
    // const criteria = { _id: ObjectId(boardId) }
    // if (!isAdmin) criteria.byUserId = ObjectId(userId)
    await collection.deleteOne({ _id: ObjectId(boardId) })
    return boardId
  } catch (err) {
    logger.error(`cannot remove board, board-service, ${boardId}`, err)
    throw err
  }
}

async function add(board) {
  try {
    const collection = await dbService.getCollection('board')
    await collection.insertOne(board)
    return board
  } catch (err) {
    logger.error('cannot insert board, board-service', err)
    throw err
  }
}

module.exports = {
  query,
  getById,
  remove,
  update,
  add,
}
