import React from 'react';

import Modal from './modal';
import Toggle from './toggle';
import Radiobutton from './radiobutton';

function ConfigForm({
  modalIsOpen,
  closeModal,
  useCellQuestionMark,
  toggleUseCellQuestionMark
}) {
  return (
    <Modal
      modalIsOpen={modalIsOpen}
      closeModal={closeModal}
    >
      <div className="config-modal">
        <header>
          <h1>
            Настройки
        </h1>
        <hr />
        </header>
        <div>
          <div className="level-difficulty">
            <span>Уровень</span><br />
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
          </div>
          <Toggle
            id="use-question-mark"
            text="Использовать метку-вопрос"
            value={useCellQuestionMark}
            onClickHandler={toggleUseCellQuestionMark}
          />
          <div className="game-rules">
            <span>Правила игры</span><br />
            1) Цель - открыть все ячейки без мин.<br />
            2) Левый клик - открыть ячейку.<br />
            3) Правый клик - поставить метку.<br />
            4) Двойной левый клик - открыть ячейки по периметру.<br />
          </div>
        </div>
        <footer>
          <hr />
          <button className="save-button">Сохранить</button>
          <button onClick={closeModal}>Закрыть</button>
        </footer>
      </div>
    </Modal>
  );
}

export default ConfigForm;