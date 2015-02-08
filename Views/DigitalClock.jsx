var React = require('React')

module.exports = React.createClass({
  displayName: "DigitalClock",
  componentWillMount: function () {
    this.props.onChange(this.updateTime)
  },
  updateTime: function(){
    this.setState(this.props.getState())
  },
  getInitialState: function() {
    return this.props.getState()
  },
  render: function() {
    var time = this.state.time
    return <div>{time.toTimeString().substring(0, 8)}</div>
  }
});
