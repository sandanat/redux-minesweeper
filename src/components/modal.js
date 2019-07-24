import React from 'react';
import Modal from 'react-modal';

// Make sure to bind modal to your appElement
// (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');

class ModalForm extends React.Component {
  render() {
    return (
      <Modal
        isOpen={this.props.modalIsOpen}
        onRequestClose={this.props.closeModal}
      >
        {this.props.children}
      </Modal>
    );
  }
}

export default ModalForm;