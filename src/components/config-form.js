import React from 'react';

import Modal from './modal';

function ConfigForm({ modalIsOpen, closeModal }) {
  return (
    <Modal
      modalIsOpen={modalIsOpen}
      closeModal={closeModal}
    />
  );
}

export default ConfigForm;