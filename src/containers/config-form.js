import { connect } from 'react-redux';

import {
  toggleConfigForm,
  toggleUseQuestionMark,
  selectGameLevel,
  saveFormButtonHandler
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
  saveFormButtonHandler: () => dispatch(
    saveFormButtonHandler()
  )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfigForm);