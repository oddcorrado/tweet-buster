'use strict'

const socketio = require('socket.io')
const debug = require('debug')('app:socketioCaster')
let connectedCount = 0
let io = null
let emitters = []

// starts the caster, that is the socketio server side
function start (server) {
  io = socketio.listen(server)

  // on a new connection increment reference count
  io.on('connection', (socket) => {
    connectedCount++
    debug('Socket connected', connectedCount)
    if(connectedCount === 1) {
      emitters.forEach(e => e.emit('activate'))
    }

    socket.on('disconnect',  () => {
      connectedCount--
      if(connectedCount === 0) {
        emitters.forEach(e => e.emit('deactivate'))
      }
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

function registerEmitter (emitter) {
  emitters.push(emitter)
}

module.exports = {
  start,
  broadcast,
  registerEmitter
}
