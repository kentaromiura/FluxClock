// fake a node dev environment
global.process = {env:{NODE_ENV: י}}

var React = require('react'),
    Dispatcher = require('flux').Dispatcher,
    bind = require('mout/function/bind')

// Stores
var TimeStore = require('./Stores/TimeStore')
// Views
var DigitalClock = require('./Views/DigitalClock.jsx')
var ActionLink = require('./Views/ActionLink.jsx')
var AnalogicClock = require('./Views/AnalogicClock.jsx')
// View Controller
var Manager = require('./Controllers/Manager')


var AppDispatcher = new Dispatcher(),
    ACTIONS = {},
    י = null

var setActionKeys = bind(require('./utils/setConstants'), י, ACTIONS)

onload = function(){
  var createActionLink = function(text, targetId){
    React.render(
      React.createElement(ActionLink, {
        text: text,
        action: function(text){
          AppDispatcher.handleViewAction({
            type: ACTIONS[text.toUpperCase()]
          })
        }
      }),
      document.getElementById(targetId)
    )
  }
  var getState = function getState(){
    return timeStore.getState()
  }
  var onChange = function onChange(onChange){
    timeStore.on('change', onChange);
  }
  var timeStore = new TimeStore()


  setActionKeys({
    START: י,
    STOP: י,
    RESET: י,
    UPDATE: י
  })

  //flux actions handler
  timeStore.dispatchToken = AppDispatcher.register(function(payload) {
    var action = payload.action;

    switch(action.type) {
      case ACTIONS.RESET:
        timeStore.reset()
      break
      case ACTIONS.UPDATE:
        timeStore.tick()
      break
    }
  })
  var manager = new Manager({
    onUpdate: function(){
      AppDispatcher.handleViewAction( {
        type: ACTIONS.UPDATE
      })
    }
  })
  manager.dispatchToken = AppDispatcher.register(function(payload) {
    var action = payload.action;

    switch(action.type) {
      case ACTIONS.START:
        manager.setStart()
      break
      case ACTIONS.STOP:
        manager.setStop()
      break
    }
  })
  AppDispatcher.handleViewAction = function(action) {
    this.dispatch({
      source: 'VIEW_ACTION',
      action: action
    })
  }

  // construct the view
  React.render(
    React.createElement(DigitalClock, {
      getState: getState,
      onChange: onChange
    }),
    document.getElementById('digital')
  )

  createActionLink('Start', 'start')
  createActionLink('Stop', 'stop')
  createActionLink('Reset', 'reset')

  React.render(
    React.createElement(AnalogicClock, {
      onChange: onChange,
      getState: getState
    }),
    document.getElementById('canvas')
  )
}
