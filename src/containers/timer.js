import { connect } from 'react-redux'

import Timer from '../components/timer';
import { setTimerSeconds } from '../actions/timer';

const mapStateToProps = state => ({
  seconds: state.timerSeconds,
  action: state.timerAction
});

const mapDispatchToProps = dispatch => ({
  updateSeconds: seconds => dispatch(setTimerSeconds(seconds))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Timer);