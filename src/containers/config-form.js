import { connect } from 'react-redux';

import { toggleConfigForm, toggleUseQuestionMark } from '../actions/config-form';
import ConfigForm from '../components/config-form';

const mapStateToProps = state => ({
  modalIsOpen: state.configForm.isOpen,
  useCellQuestionMark: state.configForm.useCellQuestionMark
});

const mapDispatchToProps = dispatch => ({
  closeModal: () => dispatch(toggleConfigForm(false)),
  toggleUseCellQuestionMark: isUse => dispatch(toggleUseQuestionMark(isUse))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfigForm);