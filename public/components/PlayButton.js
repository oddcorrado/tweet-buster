const PIXI = require('pixi.js')

// simple button that reacts on play
class PlayButton {
  constructor (stage, style, x, y, play, options) {
    let playText = new PIXI.Text("PLAY", style)
    // toggle active state
    let isActive = true

    // get options and assign defaults if undefined
    options = options || {}
    let fadeSpeed = options.fadeSpeed || 0.05
    stage.addChild(playText)
    playText.x = x || 0
    playText.y = y || 0
    playText.anchor.x = 0.5
    playText.anchor.y = 0.5
    playText.alpha = 1
    playText.interactive = true

    // play has been pressed
    playText.pointerdown = () =>  {
      if(isActive) {
        // call play callback and start to fade
        isActive = false
        play()
        fade()
      }
    }

    // priviledged methods a la Crockford declared in the constructor
    // ***********
    // reset the button
    this.reset = () => {
      isActive = true
      playText.alpha = 1
    }

    // private methods a la Crockford declared in the constructor
    // ***********
    // fade out score until it reches minAlpha
    let fade = () => {
      if(playText.alpha > 0) {
        playText.alpha -= fadeSpeed
        setTimeout(fade, 16)
      }
    }
  }
}

module.exports = PlayButton
