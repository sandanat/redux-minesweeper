import React from 'react';

import Modal from './modal';
import Toggle from './toggle';
import Radiobutton from './radiobutton';
import consts from '../modules/constants';

function ConfigForm({
  modalIsOpen,
  closeModal,
  useCellQuestionMark,
  toggleUseCellQuestionMark,
  selectedGameLevel,
  selectLevel,
  saveFormButtonHandler
}) {

  const modalStules = {
    overlay: {
      backgroundColor: "rgba(255, 239, 213, 0.7)",
    },
    content: {
      position: "relative",
      top: '80px',
      left: "0",
      right: "0"
    }
  };


  return (
    <Modal
      modalIsOpen={modalIsOpen}
      closeModal={closeModal}
      customStyles={modalStules}
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
              id={consts.gameLevels.JUNIOR}
              text="9x9, 10 мин"
              checkedId={selectedGameLevel}
              onChangeHandler={selectLevel}
            />
            <Radiobutton
              name="radio-button-game-level"
              id={consts.gameLevels.MIDDLE}
              text="16x16, 40 мин"
              checkedId={selectedGameLevel}
              onChangeHandler={selectLevel}
            />
            <Radiobutton
              name="radio-button-game-level"
              checkedId={selectedGameLevel}
              onChangeHandler={selectLevel}
              id={consts.gameLevels.SENIOR}
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
            4) Ctrl + левый клик - открыть ячейки по периметру.<br />
          </div>
        </div>
        <footer>
          <hr />
          <button
            className="save-button"
            onClick={saveFormButtonHandler}
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