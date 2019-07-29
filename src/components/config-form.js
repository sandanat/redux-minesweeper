import React from 'react';

import Modal from './modal';
import Toggle from './toggle';
import Radiobutton from './radiobutton';

function ConfigForm({
  modalIsOpen,
  closeModal,
  useCellQuestionMark,
  toggleUseCellQuestionMark,
  selectedGameLevel,
  selectLevel,
  updateGameConfig
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
              name="radio-button-game-level"
              id="junior"
              text="9x9, 10 мин"
              checkedId={selectedGameLevel}
              onChangeHandler={selectLevel}
              />
            <Radiobutton
              name="radio-button-game-level"
              id="middle"
              text="16x16, 40 мин"
              checkedId={selectedGameLevel}
              onChangeHandler={selectLevel}
              />
            <Radiobutton
              name="radio-button-game-level"
              checkedId={selectedGameLevel}
              onChangeHandler={selectLevel}
              id="seniour"
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
          <button
            className="save-button"
            onClick={() => updateGameConfig(true, 'junior')} // todo
          >
            Сохранить
          </button>
          <button onClick={closeModal}>Закрыть</button>
        </footer>
      </div>
    </Modal>
  );
}

export default ConfigForm;