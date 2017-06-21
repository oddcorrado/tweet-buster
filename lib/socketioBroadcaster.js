'use strict'

const socketio = require('socket.io')
const debug = require('debug')('socketioCaster')
let connectedCount = 0
let io = null

// starts the caster, that is the socketio server side
function start (server) {
  io = socketio.listen(server)

  // on a new connection increment reference count
  // TODO notify if reference count value changes
  io.on('connection', (socket) => {
    connectedCount++
    debug('Socket connected', connectedCount)

    socket.on('disconnect',  () => {
      connectedCount--
      debug('Socket disconnected', connectedCount)
    })
  })
}

// broadcasts the sentence to all socketio clients
function broadcast (sentence) {
  // make sure we have a server then emit the 'sentence' message
  if(io) {
    io.emit('sentence', sentence)
  }
}

module.exports = {
  start,
  broadcast
}
