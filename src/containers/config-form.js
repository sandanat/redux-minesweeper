import { connect } from 'react-redux';

import { toggleConfigForm } from '../actions/config-form';
import ConfigForm from '../components/config-form';

const mapStateToProps = state => ({
  modalIsOpen: state.configForm.isOpen
});

const mapDispatchToProps = dispatch => ({
  closeModal: () => dispatch(toggleConfigForm(false))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfigForm);