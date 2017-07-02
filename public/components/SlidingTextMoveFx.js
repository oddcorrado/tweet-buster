const PIXI = require('pixi.js')

// a collection of fx
// each fx takes an arry of words, a position (x,y), and an object for options

// a Wave fx
let nofx = (words, x, y ) => words.map(word => {
  word.pixiWord.x = x + word.x
  word.pixiWord.y = y
  return word
})

// a Wave fx
let wave = (words, x, y, {amplitude, period} ) => words.map(word => {
  word.pixiWord.x = x + word.x
  word.pixiWord.y = y + (amplitude || 30) * Math.sin(word.pixiWord.x * (period || 0.01))
  return word
})

// a zoomy bouncy fx
let bounce = (words, x, y, {amplitude, period} ) => words.map(word => {
  word.pixiWord.x = x + word.x
  word.pixiWord.y = y
  let scale = 1 + (amplitude || 0.5) * Math.sin(word.pixiWord.x * (period || 0.01))
  word.pixiWord.scale = new PIXI.Point(scale, scale)
  return word
})

// sentence is transformed in a circle
let circle = (words, x, y, {radius, speed} ) => words.map(word => {
  word.pixiWord.x = x + (radius || 200) * Math.cos(x * (speed || 0.001) + word.wordPos * 2 * Math.PI)
  word.pixiWord.y = y + (radius || 200) * Math.sin(x * (speed || 0.001) + word.wordPos * 2 * Math.PI)
  return word
})

// sentence is accordionized
let accordion = (words, x, y, {amplitude, period} ) =>{
  return words.map(word => {
    let stretch = (1 + Math.cos(x * (period || 0.003)))
    word.pixiWord.x = x + (amplitude || 0.5) * word.x * stretch
    word.pixiWord.y = y
    return word
  })
}

let list = ["nofx", "wave", "circle", "bounce","accordion"]

module.exports = {
  accordion,
  circle,
  bounce,
  wave,
  nofx,
  list
}
