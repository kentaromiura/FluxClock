var prime = require('prime'),
    Emitter = require("prime/emitter")

var TimeStore = prime({
  mixin: Emitter,
  constructor: function(){
    this.reset()
  },
  reset: function(){
    this.seconds = 0
    this.setTime()
  },
  tick: function(){
    this.seconds ++
    this.setTime()
  },
  setTime: function(){
    this.time = new Date(0, 0, 0, 0, 0, this.seconds)
    this.emit('change')
  },
  getState: function(){
    return { time : this.time }
  }
})

module.exports = TimeStore
