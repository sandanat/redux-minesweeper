import { connect } from 'react-redux';

import {
  toggleConfigForm,
  toggleUseQuestionMark,
  selectGameLevel,
  updateGameConfig
} from '../actions/config-form';
import ConfigForm from '../components/config-form';

const mapStateToProps = state => ({
  modalIsOpen: state.configForm.isOpen,
  useCellQuestionMark: state.configForm.useCellQuestionMark,
  selectedGameLevel: state.configForm.selectedLevel
});

const mapDispatchToProps = dispatch => ({
  closeModal: () => dispatch(toggleConfigForm(false)),
  toggleUseCellQuestionMark: isUse => dispatch(toggleUseQuestionMark(isUse)),
  selectLevel: level => dispatch(selectGameLevel(level)),
  updateGameConfig: (isUseQuestionMark, level) => dispatch(updateGameConfig(isUseQuestionMark, level))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfigForm);