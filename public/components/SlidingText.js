const PIXI = require('pixi.js')
const ExplodingText = require('./ExplodingText')
const moveFx = require('./SlidingTextMoveFx')

// This is a basic test class to test the Pixi API
// It simply instanciates a text on the canvas and males it flow left or right
// the text is removed if gets out of the window bounds
class SlidingText {
  constructor (text, stage, style, score, lose) {
    // private members a la Crockford
    // ***********
    // horizontal speed
    let speed = (3 + Math.random() * 4) * (Math.random() > 0.5 ? 1 : -1)
    // kill at next move
    let doKill = false
    // Word and metrics for special fx
    let words = []
    // fx to be used
    let fx = moveFx.list[Math.trunc(moveFx.list.length * Math.random())]

    // private methods a la Crockford declared in the constructor
    // ***********
    // measures coarse text metrics for special fx
    // every text ends on one line
    let measureMetrics = () => {
      let charPos = 0
      let wordPos = 0
      let x = 0

      // split text into words according to spaces
      words = text.match(/([^\s]+)/g)
      // then map to object containing metrics
      // not chained so that we can get calculte word relartive position
      words = words.map(word => {
        let out = { word : word, // resulting word
          x:x, // x offset in pixels
          y:0, // y offset in pixels, 0 because text is in line
          charPos:charPos/text.length, // relative char position in text (used for explosion direction and special fx)
          wordPos:wordPos/words.length // realtive word position (used for special fx)
        }

        // measure word metrics' to figure out where next word begins
        let metrics = PIXI.TextMetrics.measureText(word + " ", style)
        x += metrics.width

        // this is used for the char position
        charPos += word.length + 1

        // and word position simply uses word count
        wordPos++
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
        pixiWord.anchor.x = 0
        pixiWord.anchor.y = 0.5

        // make it interactive to get mouse events and kill it on mouseup
        pixiWord.interactive = true
        pixiWord.pointerdown = () => doKill = true
        return Object.assign({},{pixiWord},element)
      })
    }

    // move is called ot regulazr intervals every 16ms/60fps
    let move = () => {
      // move the main body
      this.x += speed

      // apply fx
      words = moveFx[fx](words, this.x, this.y, {})

      // very basic object removal, needs to be improved to take text width in to account
      if (doKill
        || this.x > window.innerWidth
        || this.x < -window.innerWidth ) {
        if(doKill) {
          if(score) {
            score(this)
          }
          let explodingWords = words.map(element => ({
            word:element.word,
            x: element.pixiWord.x,
            y: element.pixiWord.y,
            charPos: element.charPos
          }))
          new ExplodingText(explodingWords, stage, style, {x:this.x, y:this.y})
        }
        else {
          if(lose) {
            lose(this)
          }
        }
        words.forEach(word => {
          stage.removeChild(word.pixiWord)
        })
      }
      else {
        setTimeout(() => move(), 16)
      }
    }

    // priviledged methods a la Crockford declared in the constructor
    // ***********
    // destroy the object
    this.destroy = () => {
      let explodingWords = words.map(element => ({
        word:element.word,
        x: element.pixiWord.x,
        y: element.pixiWord.y,
        charPos: element.charPos
      }))
      new ExplodingText(explodingWords, stage, style, {x:this.x, y:this.y})
      words.forEach(word => {
        stage.removeChild(word.pixiWord)
      })
    }

    // intialisation
    // *************
    measureMetrics()
    createWords()

    // global position it according to speed
    this.x = speed > 0 ? 0 : window.innerWidth
    this.y = Math.random() * window.innerHeight

    // start to move
    move()
  }
}

module.exports = SlidingText
