const PIXI = require('pixi.js')

// simple score display with some basic fx
class ScoreDisplay {
  constructor (stage, style, x, y, options) {
    this.score = 0
    let scoreText = new PIXI.Text(this.score, style)

    // get options and assign defaults if undefined
    options = options || {}
    let minAlpha = options.minAlpha || 0.2
    let alpha2scaleFactor = options.alpha2scaleFactor || 0.1
    let fadeSpeed = options.fadeSpeed || 0.02
    stage.addChild(scoreText)
    scoreText.x = x || 0
    scoreText.y = y || 0
    scoreText.alpha = minAlpha
    scoreText.anchor.x = 0.5
    scoreText.anchor.y = 0.5

    // priviledged methods a la Crockford declared in the constructor
    // ***********
    // reset the score
    this.reset = () => {
      this.score = 0
      scoreText.text = this.score
    }

    // score some points
    this.addScore = (points) => {
      // update score, highligh and start to fade
      this.score += points
      scoreText.text = this.score
      scoreText.alpha = 1
      alpha2scale()
      fade()
    }

    // private methods a la Crockford declared in the constructor
    // ***********
    // fade out score until it reches minAlpha
    let fade = () => {
      if(scoreText.alpha > minAlpha) {
        scoreText.alpha -= fadeSpeed
        alpha2scale()
        setTimeout(fade, 16)
      }
    }

    // scale effect accroding to alpha value
    let alpha2scale = () => {
      let scale = 1 + (scoreText.alpha - minAlpha) * alpha2scaleFactor
      scoreText.scale = new PIXI.Point(scale, scale)
    }
  }
}

module.exports = ScoreDisplay
