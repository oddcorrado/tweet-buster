const PIXI = require('pixi.js')

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

const playStyle = new PIXI.TextStyle({
  fontFamily: 'Arial',
  fontSize: Math.min(window.innerWidth, window.innerHeight) / 5,
  fill: '#ffffff'
})

module.exports = {
  style,
  scoreStyle,
  playStyle
}
