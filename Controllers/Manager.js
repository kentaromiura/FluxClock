var prime = require('prime')
module.exports = prime({
  setStart:  function(){
    if (!this.running) {
      this.running = true
      this.intervalID = setInterval(this.interval, 1000)
    }
  },
  setStop:   function(){
    if (this.running) {
      this.running = false
      clearInterval(this.intervalID)
    }
  },
  setUpdate: function(){
    this.onUpdate()
  },
  constructor:  function(options){
    var self = this
    this.onUpdate = options.onUpdate
    this.running = false
    this.interval = function(){
      self.setUpdate()
    }
  }
})
