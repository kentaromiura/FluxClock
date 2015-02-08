var React = require('React')

module.exports = React.createClass({
  render: function(){
    return <a onClick={
      () => this.fireAction(this.props.text)
    }>{this.props.text}</a>
  },
  fireAction: function(text){
    this.props.action(text)
  }
})
