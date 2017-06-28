const io = require('socket.io-client')
const PIXI = require('pixi.js')
const socket = io()
const SlidingText = require('./SlidingText')
const ExplodingText = require('./ExplodingText')

// For now simply get the data from the socket and insert it into the page
socket.on('sentence', (sentence) => {
  // kill the intro
  intro(false)
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

let introText = null
intro(true)


// a dirty function to disply an intro if start is true and remove it once if strat is false
function intro (start) {

  let sentence = "WAITING FOR SERVER TO STREAM DATA..."
  let x = 100
  let y = 100

  // if asked to stop and laredy stoppe return
  if(!start && !introText) { return}

  if(start) {
    introText = new PIXI.Text(sentence, style)
    stage.addChild(introText)
    introText.x = x
    introText.y = y
  } else {
    stage.removeChild(introText)
    new ExplodingText(sentence, stage, style, {x, y})
    introText = null
  }
}
