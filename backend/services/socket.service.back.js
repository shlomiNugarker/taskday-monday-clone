const asyncLocalStorage = require('./als.service');
const logger = require('./logger.service');

var gIo = null

function connectSockets(http, session) {
    gIo = require('socket.io')(http, {
        cors: {
            origin: '*',
        }
    })
    gIo.on('connection', socket => {
        console.log('New socket', socket.id)
        socket.on('disconnect', socket => {
            console.log('Someone disconnected')
        })

        socket.on('curr board', boardId => {
            // console.log('checkkk boardId', boardId);
            if (socket.myBoardId === boardId) return;
            if (socket.myBoardId) {
                socket.leave(socket.myBoardId)
            }
            socket.join(boardId)
            socket.myBoardId = boardId
        })
        socket.on('boardChanged', boardId => {
            //FOR MYSELF - try to remove next line cause it wasnt send in this condition
            // console.log('shivaaaa', boardId);
            // gIo.broadcast.to(socket.myBoardId).emit('boardChanged', boardId)
            gIo.to(socket.myBoardId).emit('boardChanged', boardId)
        })
        socket.on('chat task', taskId => {
            // console.log('taskIdtaskId', taskId);
            if (socket.myTaskId === taskId) return;
            if (socket.myTaskId) {
                socket.leave(socket.myTaskId)
            }
            socket.join(taskId)
            socket.myTaskId = taskId
        })
        socket.on('task updated', task => {
            // console.log('tasktask', task);
            // emits to all sockets:
            // gIo.emit('chat addMsg', msg)
            // Broadcasting manually:
            socket.broadcast.to(socket.myTaskId).emit('task changed', task)
                // emits only to sockets in the same room
                // gIo.to(socket.myTopic).emit('chat addMsg', msg)
        })



        socket.on('chat newMsg', msg => {
            console.log('Emitting Chat msg', msg);
            // emits to all sockets:
            // gIo.emit('chat addMsg', msg)
            // emits only to sockets in the same room
            gIo.to(socket.myTopic).emit('chat addMsg', msg)
        })
        socket.on('user-watch', userId => {
            socket.join('watching:' + userId)
        })
        socket.on('set-user-socket', userId => {
            logger.debug(`Setting (${socket.id}) socket.userId = ${userId}`)
            socket.userId = userId
        })
        socket.on('userIsTyping', userId => {
            console.log('user:', userId, ' is typing');
            // emits to all sockets:
            // gIo.emit('chat addMsg', msg)
            // emits only to sockets in the same room
            gIo.to(socket.myTopic).emit('chat addIsTyping', userId)
        })
        socket.on('unset-user-socket', () => {
            delete socket.userId
        })


    })
}
// socketService.emitTo({ type: 'user-updated', data: fullUser, label: fullUser._id })

function emitTo({ type, data, label }) {
    if (label) gIo.to('watching:' + label).emit(type, data)
    else gIo.emit(type, data)
}

async function emitToUser({ type, data, userId }) {
    logger.debug('Emiting to user socket: ' + userId)
    const socket = await _getUserSocket(userId)
    if (socket) socket.emit(type, data)
    else {
        console.log('User socket not found');
        _printSockets();
    }
}


// Send to all sockets BUT not the current socket 
async function broadcast({ type, data, room = null, userId }) {
    console.log('BROADCASTING', JSON.stringify(arguments));
    const excludedSocket = await _getUserSocket(userId)
    if (!excludedSocket) {
        // logger.debug('Shouldnt happen, socket not found')
        // _printSockets();
        return;
    }
    logger.debug('broadcast to all but user: ', userId)
    if (room) {
        excludedSocket.broadcast.to(room).emit(type, data)
    } else {
        excludedSocket.broadcast.emit(type, data)
    }
}

async function _getUserSocket(userId) {
    const sockets = await _getAllSockets();
    //PUT ANOTHER "/" AND CHECK!
    const socket = sockets.find(s => s.userId == userId)
    return socket;
}
async function _getAllSockets() {
    // return all Socket instances
    const sockets = await gIo.fetchSockets();
    return sockets;
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