import { connect } from 'react-redux';

import Toggle from '../components/toggle';
import { updateQuestionMarkAccess } from '../actions/toggle';

const mapStateToProps = state => ({
  checked: state.config.useCellQuestionMark
});

const mapDispatchToProps = dispatch => ({
  updateQuestionMarkAccess: bool => dispatch(updateQuestionMarkAccess(bool))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Toggle);