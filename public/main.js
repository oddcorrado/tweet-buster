const io = require('socket.io-client')
const PIXI = require('pixi.js')
const socket = io()
const SlidingText = require('./components/SlidingText')
const WaitingText = require('./components/WaitingText')

// For now simply get the data from the socket and insert it into the page
socket.on('sentence', (sentence) => {
  // kill the intro
  WaitingText.stop(stage, style)
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
})


function draw () {
  renderer.render(stage)
  requestAnimationFrame(draw)
}

draw()

WaitingText.start(stage, style)
