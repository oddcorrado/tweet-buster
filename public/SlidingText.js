// This is a basic test class to test the Pixi API
// It simply instanciates a text on the canvas and males it flow left or right
// the text is removed if gets out of the window bounds
class SlidingText {
  constructor (text, stage, style) {
    // private members a la Crockford
    // ***********
    // horizontal speed
    let speed = (1 + Math.random() * 10) * (Math.random() > 0.5 ? 1 : -1)

    // private methods a la Crockford declared in the constructor
    // ***********
    // move is called ot regulazr intervals every 16ms/60fps
    let move = () => {
      if(this.text) {
        this.text.x += speed
      }
      // very basic object removal, needs to be improved to take text width in to account
      if (this.text.x > window.innerWidth
        || this.text.x < -window.innerWidth ) {
        stage.removeChild(this.text)
      }
      else {
        setTimeout(() => move(), 16)
      }
    }

    // create and add the text to the stage
    this.text = new PIXI.Text(text, style)
    this.child = stage.addChild(this.text)

    // position it according to speed
    this.text.x = speed > 0 ? 0 : window.innerWidth
    this.text.y = Math.random() * window.innerHeight

    // start to move
    move()
  }
}

module.exports = SlidingText
