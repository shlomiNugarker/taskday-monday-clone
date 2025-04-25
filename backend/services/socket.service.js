const asyncLocalStorage = require('./als.service')
const logger = require('./logger.service')

var gIo = null

function connectSockets(http, session) {
  gIo = require('socket.io')(http, {
    cors: {
      origin: '*',
    },
    pingTimeout: 60000, // 60 seconds timeout on ping
    pingInterval: 25000 // ping every 25 seconds
  })
  
  gIo.on('connection', (socket) => {
    console.log('New socket connection:', socket.id)
    
    socket.on('disconnect', () => {
      console.log('Socket disconnected:', socket.id)
    })
    
    socket.on('error', (err) => {
      console.error('Socket error:', err)
    })
    
    socket.on('open board', (boardId) => {
      if (!boardId) {
        console.error('Invalid boardId received in open board event')
        return
      }
      
      try {
        if (socket.myBoard === boardId) return
        if (socket.myBoard) {
          socket.leave(socket.myBoard)
        }
        socket.join(boardId)
        socket.myBoard = boardId
      } catch (err) {
        console.error('Error in open board socket handler:', err)
      }
    })
    
    socket.on('board newUpdateBoard', (board) => {
      if (!board || !board._id) {
        console.error('Invalid board object received in newUpdateBoard event')
        return
      }
      
      try {
        socket.broadcast.to(board._id).emit('board updateBoard', board)
      } catch (err) {
        console.error('Error in board newUpdateBoard socket handler:', err)
      }
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
