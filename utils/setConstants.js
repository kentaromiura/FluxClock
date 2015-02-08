var forOwn = require('mout/object/forOwn')
module.exports = function(CONSTANTS, keys){
  forOwn(keys, function(v, key){
    CONSTANTS[key] = key
  })
}
