const PIXI = require('pixi.js')

// LifeL Manager, displays life and tells when the game is over
class LifeManager {
  constructor (stage, gameOver) {
    let hearts = []

    // resey he life manager and set life to 3
    this.start = () => {
      while(hearts.length < 3) {
        let heart = new PIXI.Sprite(PIXI.loader.resources["images/heart.png"].texture)
        heart.scale = new PIXI.Point(0.3, 0.3)
        heart.y = 40
        heart.x = heart.width * hearts.length
        stage.addChild(heart)
        hearts.push(heart)
      }
    }

    // lose one life, call game over if we definitely lose
    this.lose = () => {
      if(hearts.length > 0) {
        let heart = hearts.pop()
        stage.removeChild(heart)
      } else {
        if(gameOver) {
          gameOver()
        }
      }
    }
  }
}

module.exports = LifeManager
