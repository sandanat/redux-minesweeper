import React from 'react';
import PropTypes from 'prop-types'

// this.timerId is used to store 
// interval ID
class Timer extends React.Component {
  constructor(props) {
    super(props);
    
    this.tick = this.tick.bind(this);
  }

  // clear resources
  componentWillUnmount() {
    this._clearInterval();
  }

  componentDidUpdate(prevProps) {
    // disable several "launch" method executing
    if(
      this.props.action === prevProps.action ||
      !this.props.action
    ) return;

      this[this.props.action]();
  }
  
  launch() {
    if(this.timerId) return;
    
    this.timerId = setInterval(this.tick, 1000);
  }
  
  tick() {
    let seconds = this.props.seconds + 1;
    this.props.updateSeconds(seconds);
  }
  
  stop() {
    this._clearInterval();
  }
  
  reset() {
    this._clearInterval();

    this.props.updateSeconds(0);
  }

  _clearInterval() {
    if(this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  render() {
    return (
      <div className="timer">
        <i className="fa fa-clock" aria-hidden="true"></i>
        <input
          type="text"
          value={this.props.seconds}
          readOnly
        />
      </div>
    );
  }
}

Timer.propTypes = {
  action: PropTypes.string,
  seconds: PropTypes.number.isRequired,
  updateSeconds: PropTypes.func.isRequired
}

export default Timer;