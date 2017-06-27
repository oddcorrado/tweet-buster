const io = require('socket.io-client')
const PIXI = require('pixi.js')
const socket = io()
const SlidingText = require('./SlidingText')

// For now simply get the data from the socket and insert it into the page
socket.on('sentence', (sentence) => {
  // only stage will reference the sliding text, it will be destroyed when it leaves the screen
  new SlidingText(sentence, stage, style)
})


// use the auto detect that automatically switches to WebGL or Canvas
let renderer = new PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.view)
var stage = new PIXI.Container

var style = new PIXI.TextStyle({
  fontFamily: 'Arial',
  fontSize: 20,
  fill: '#ffffff',
  // keep word wrap for later perhaps
  /* wordWrap: true,
  wordWrapWidth: 800 */
})


function draw () {
  renderer.render(stage)
  requestAnimationFrame(draw)
}

draw()
