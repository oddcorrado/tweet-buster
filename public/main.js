const io = require('socket.io-client')

var socket = io()

// For now simply get the data from the socket and insert it into the page
socket.on('sentence', (sentence) => {
  document.getElementById('test').innerHTML = sentence
})
