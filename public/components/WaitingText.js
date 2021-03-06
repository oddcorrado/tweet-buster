const PIXI = require('pixi.js')

let introText = null
let sentence = "WAITING FOR SERVER TO STREAM DATA..."

let x = 100
let y = 30

// This is a unique intro text that gets displayed on start and destroyed on stop
class WaitingText {
  static start (stage, style) {
    if(introText) {
      return
    }
    introText = new PIXI.Text(sentence, style)
    stage.addChild(introText)
    introText.x = x
    introText.y = y
  }
  static stop (stage, style) {
    if(!introText) {
      return
    }
    stage.removeChild(introText)
    introText = null
  }
}

module.exports = WaitingText
