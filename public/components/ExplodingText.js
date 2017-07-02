const PIXI = require('pixi.js')

// This is an exploding text
// it takes a text as input and explodes it in rotating words
class ExplodingText {
  constructor (words, stage, style, options) {
    // grab the options
    options = options || {}
    options.duration = options.duration || 1000
    options.velocity = options.velocity || 10

    // private members a la Crockford
    // ***********
    // time to live of the effect in ms
    let ttl = options.duration

    // private methods a la Crockford declared in the constructor
    // ***********
    // measures coarse text metrics for text explosion -- less precise but avoids lag when exploding
    // only works for one line text
    let measureMetricsCoarse = () => {
      let pos = 0
      let metrics = PIXI.TextMetrics.measureText(text, style)

      // split text into words according to space
      // then map to object containing metrics
      words = text.match(/([^\s]+)/g)
        .map(word => {
          let out = { word, // resumting word
            x:metrics.width * pos/text.length, // x offset in pixels
            y:metrics.height, // y offset in pixels
            textPos:pos/text.length // relative position in text (used for explosion direction)
          }
          pos += word.length + 1
          return out
        })
    }

    // creates PIXI text words for explosion
    let createWords = () => {
      // use the words array and remap it to PIXI Texts
      // add the position offset to each word
      // and set random velocities for explosion
      words = words.map(element => {
        let pixiWord = new PIXI.Text(element.word, style)
        stage.addChild(pixiWord)
        pixiWord.x = element.x
        pixiWord.y = element.y
        pixiWord.anchor.x = 0.5
        pixiWord.anchor.y = 0.5
        return { pixiWord,
          vx : options.velocity * (element.charPos - 0.5),
          vy : options.velocity * (Math.random() - 0.5),
          vrot : 0.2*(Math.random() - 0.5)}
      })
    }

    // move is called ot regulazr intervals every 16ms/60fps
    let move = () => {
      // get each Word and move it according to is speed
      words.forEach(word => {
        word.pixiWord.x += word.vx
        word.pixiWord.y += word.vy
        word.pixiWord.rotation += word.vrot
        word.pixiWord.alpha = ttl / options.duration
      })

      // remove when dead
      if (ttl < 0 ) {
        words.forEach(word => stage.removeChild(word.pixiWord))
        words = null
      }
      else {
        setTimeout(() => move(), 16)
        ttl -= 16
      }
    }

    // intialisation
    // *************
    createWords()

    // start to move
    move()
  }
}

module.exports = ExplodingText
