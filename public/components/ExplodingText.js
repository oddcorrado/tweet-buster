const PIXI = require('pixi.js')

// This is an exploding text
// it takes a text as input and explodes it in rotating letters
class ExplodingText {
  constructor (text, stage, style, position, options) {
    options = options || {}
    options.duration = options.duration || 1000
    // private members a la Crockford
    // ***********
    // letter and metrics for font explosion
    let letters = []
    // time to live of the effect in ms
    let ttl = options.duration

    // private methods a la Crockford declared in the constructor
    // ***********
    // measures precise text metrics for text explosion
    let measureMetricsPrecise = () => {
      let pos = text.length - 1

      while (pos >= 0) {
        let metrics = PIXI.TextMetrics.measureText(text.substr(0,pos), style)
        if(text[pos].match(/[^\r\n\s\t]/)) {
          letters.push({char:text[pos],
            x:metrics.width,
            y:metrics.height,
            textPos:pos / text.length
          })
        }
        pos--
      }
    }

    // measures coarse text metrics for text explosion -- less precise but avoids lag when exploding
    // only works for one line text
    let measureMetricsCoarse = () => {
      let pos = text.length - 1

      let metrics = PIXI.TextMetrics.measureText(text, style)
      while (pos >= 0) {
        if(text[pos].match(/[^\r\n\s\t]/)) {
          letters.push({char:text[pos],
            x:metrics.width * pos/text.length,
            y:metrics.height,
            textPos:pos/text.length
          })
        }
        pos--
      }
    }

    // creates text metrics for text explosion
    let createLetters = () => {
      letters = letters.map(letter => {
        let pixiLetter = new PIXI.Text(letter.char, style)
        stage.addChild(pixiLetter)
        pixiLetter.x = position.x + letter.x
        pixiLetter.y = position.y + letter.y
        pixiLetter.anchor.x = 0.5
        pixiLetter.anchor.y = 0.5
        return { pixiLetter,
          vx : 10 * (letter.textPos - 0.5),
          vy : 10 * (Math.random() - 0.5),
          vrot : Math.random() - 0.5}
      })
    }

    // move is called ot regulazr intervals every 16ms/60fps
    let move = () => {
      letters.forEach(letter => {
        letter.pixiLetter.x += letter.vx
        letter.pixiLetter.y += letter.vy
        letter.pixiLetter.rotation += letter.vrot
        letter.pixiLetter.alpha = ttl / options.duration
      })
      // very basic object removal, needs to be improved to take text width in to account
      if (ttl < 0 ) {
        letters.forEach(letter => stage.removeChild(letter.pixiLetter))
        letters = null
      }
      else {
        setTimeout(() => move(), 16)
        ttl -= 16
      }
    }

    // measure text metrics
    measureMetricsCoarse()
    // create letters and azdd them to the stage
    createLetters()
    // start to move
    move()
  }
}

module.exports = ExplodingText
