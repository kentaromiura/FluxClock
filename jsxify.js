var tools = require('react-tools')
exports.src = function(module, callback){
    if (/\.jsx$/.test(module.full)){
        module.src = tools.transform(module.src, {harmony: true})
    }
    callback(null, module)
}
