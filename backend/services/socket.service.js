const asyncLocalStorage = require('./als.service')
const logger = require('./logger.service')

var gIo = null

function connectSockets(http, session) {
  gIo = require('socket.io')(http, {
    cors: {
      origin: '*',
    },
  })
  gIo.on('connection', (socket) => {
    console.log('New socket', socket.id)

    socket.on('disconnect', (socket) => {
      console.log('Someone disconnected')
    })
    socket.on('open board', (boardId) => {
      console.log('on open board')
      if (socket.myBoard === boardId) return
      if (socket.myBoard) {
        socket.leave(socket.myBoard)
      }
      socket.join(boardId)
      socket.myBoard = boardId
    })
    socket.on('board newUpdateBoard', (board) => {
      socket.broadcast.to(socket.myBoard).emit('board updateBoard', board)
    })
  })
}

function emitTo({ type, data, label }) {
  if (label) gIo.to('watching:' + label).emit(type, data)
  else gIo.emit(type, data)
}

async function emitToUser({ type, data, userId }) {
  logger.debug('Emiting to user socket: ' + userId)
  const socket = await _getUserSocket(userId)
  if (socket) socket.emit(type, data)
  else {
    console.log('User socket not found')
    _printSockets()
  }
}

// Send to all sockets BUT not the current socket
async function broadcast({ type, data, room = null, userId }) {
  console.log('BROADCASTING', JSON.stringify(arguments))
  const excludedSocket = await _getUserSocket(userId)
  if (!excludedSocket) {
    // logger.debug('Shouldnt happen, socket not found')
    // _printSockets();
    return
  }
  logger.debug('broadcast to all but user: ', userId)
  if (room) {
    excludedSocket.broadcast.to(room).emit(type, data)
  } else {
    excludedSocket.broadcast.emit(type, data)
  }
}

async function _getUserSocket(userId) {
  const sockets = await _getAllSockets()
  const socket = sockets.find((s) => s.userId == userId)
  return socket
}
async function _getAllSockets() {
  // return all Socket instances
  const sockets = await gIo.fetchSockets()
  return sockets
}

async function _printSockets() {
  const sockets = await _getAllSockets()
  console.log(`Sockets: (count: ${sockets.length}):`)
  sockets.forEach(_printSocket)
}

function _printSocket(socket) {
  console.log(`Socket - socketId: ${socket.id} userId: ${socket.userId}`)
}

module.exports = {
  connectSockets,
  emitTo,
  emitToUser,
  broadcast,
}
