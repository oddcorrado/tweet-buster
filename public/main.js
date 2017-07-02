const io = require('socket.io-client')
const PIXI = require('pixi.js')
const socket = io()
const SlidingText = require('./components/SlidingText')
const WaitingText = require('./components/WaitingText')
const ScoreDisplay = require('./components/ScoreDisplay')
const LifeManager = require('./components/LifeManager')
const PlayButton = require('./components/PlayButton')
const styles = require('./pixiStyles')

PIXI.loader
  .add("images/heart.png")
  .load(() => {setup()})

// setup is called once all PIXI assets ahve been loaded
let setup = () => {
  let isGameOver = true

  let slidingTexts = []

  // For now simply get the data from the socket and insert it into the page
  socket.on('sentence', (sentence) => {
    // kill the intro
    WaitingText.stop(stage, styles.style)
    if(!isGameOver) {
      // only stage will reference the sliding text, it will be destroyed when it leaves the screen
      slidingTexts.push(
        new SlidingText(sentence, stage, styles.style, onScore, onLose)
      )
    }
  })

  // this callback is called each time a tweet is hit
  // => just update score
  let onScore = (destroyed) => {
    slidingTexts = slidingTexts.filter(elt => elt !== destroyed)
    scoreDisplay.score(1)
  }

  // this callback is called when a tweet exits screen
  // => forward to life manager
  let onLose = (destroyed) => {
    slidingTexts = slidingTexts.filter(elt => elt !== destroyed)
    lifeManager.lose()
  }

  // this callback is called when the game is over (i.e. nor more lives)
  // => clean up stage and activate play button
  let onGameOver = () => {
    slidingTexts.forEach(elt => elt.destroy())
    slidingTexts = []
    isGameOver = true
    playButton.reset()
  }

  // this callback is called when the play button is pressed
  // => reset score display and start life manager
  let onPlay = () => {
    scoreDisplay.reset()
    lifeManager.start()
    isGameOver = false
  }

  // use the auto detect that automatically switches to WebGL or Canvas
  let renderer = new PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight)
  document.body.appendChild(renderer.view)

  // create the stage that is the main container
  let stage = new PIXI.Container

  // create the scoreDisplay and lifeManger
  let scoreDisplay = new ScoreDisplay(stage,  styles.scoreStyle, window.innerWidth / 2, window.innerHeight / 2)
  let lifeManager = new LifeManager(stage, onGameOver)
  let playButton = new PlayButton(stage,  styles.playStyle, window.innerWidth / 2, window.innerHeight / 6, onPlay)


  // launch the game loop
  function draw () {
    renderer.render(stage)
    requestAnimationFrame(draw)
  }

  draw()

  WaitingText.start(stage, styles.style)
}
