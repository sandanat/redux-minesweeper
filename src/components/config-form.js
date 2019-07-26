import React from 'react';

import Modal from './modal';
import Toggle from './toggle';
import Radiobutton from './radiobutton';

function ConfigForm({ modalIsOpen, closeModal }) {
  return (
    <Modal
      modalIsOpen={modalIsOpen}
      closeModal={closeModal}
    >
      <div>
        <fieldset className="config-level-radiobuttons">
          <legend>Уровень</legend>
          <Radiobutton
            id="9-9-10"
            text="9x9, 10 мин"
          />
          <Radiobutton
            id="16-16-40"
            text="16x16, 40 мин"
          />
          <Radiobutton
            id="16-30-99"
            text="16x30, 99 мин"
          />
        </fieldset>
        <Toggle
          id="use-question-mark"
          text="Использовать метку-вопрос"
        />
      </div>
    </Modal>
  );
}

export default ConfigForm;