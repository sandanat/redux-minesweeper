import { connect } from 'react-redux';

import Toggle from '../components/toggle';
import { updateCheckbox } from '../actions/toggle';

const mapStateToProps = state => ({
  checked: state.config.useCellQuestionMark
});

const mapDispatchToProps = dispatch => ({
  updateQuestionMarkAccess: bool => dispatch(updateCheckbox(bool))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Toggle);