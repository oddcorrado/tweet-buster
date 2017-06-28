const io = require('socket.io-client')
const PIXI = require('pixi.js')
const socket = io()
const SlidingText = require('./components/SlidingText')
const WaitingText = require('./components/WaitingText')
const ScoreDisplay = require('./components/ScoreDisplay')
const LifeManager = require('./components/LifeManager')


const style = new PIXI.TextStyle({
  fontFamily: 'Arial',
  fontSize: 20,
  fill: '#ffffff',
})

const scoreStyle = new PIXI.TextStyle({
  fontFamily: 'Arial',
  fontSize: Math.min(window.innerWidth, window.innerHeight) / 2,
  fill: '#ffffff'
})

PIXI.loader
  .add("images/heart.png")
  .load(() => {setup()})

// setup is called once all PIXI assets ahve been loaded
let setup = () => {
  let isGameOver = false

  let slidingTexts = []

  // For now simply get the data from the socket and insert it into the page
  socket.on('sentence', (sentence) => {
    if(!isGameOver) {
      // kill the intro
      WaitingText.stop(stage, style)
      // only stage will reference the sliding text, it will be destroyed when it leaves the screen
      slidingTexts.push(
        new SlidingText(sentence, stage, style, score, lose)
      )
    }
  })

  let score = (destroyed) => {
    slidingTexts = slidingTexts.filter(elt => elt !== destroyed)
    scoreDisplay.score(1)
  }

  let lose = (destroyed) => {
    slidingTexts = slidingTexts.filter(elt => elt !== destroyed)
    lifeManager.lose()
  }

  let gameOver = () => {
    slidingTexts.forEach(elt => elt.destroy())
    isGameOver = true
  }

  // use the auto detect that automatically switches to WebGL or Canvas
  let renderer = new PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight)
  document.body.appendChild(renderer.view)

  // create the stage that is the main container
  let stage = new PIXI.Container

  // create the scoreDisplay and lifeManger
  let scoreDisplay = new ScoreDisplay(stage, scoreStyle, window.innerWidth / 2, window.innerHeight / 2)
  let lifeManager = new LifeManager(stage, gameOver)


  lifeManager.start()

  // launch the game loop
  function draw () {
    renderer.render(stage)
    requestAnimationFrame(draw)
  }

  draw()

  WaitingText.start(stage, style)
}
