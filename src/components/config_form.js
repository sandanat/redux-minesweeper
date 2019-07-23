// todo если не используется -- удалить
import React from 'react';

import Modal from './modal';
import Radiobutton from './radiobutton';
import Toggle from './toggle';

function ConfigForm({ showModal }) {
  return (
    <Modal showModal={showModal}>
      <fieldset>
        <legend>Уровень</legend>
          <Radiobutton id="9-9-10" text={"9х9 10 мин"}/>
          <Radiobutton id="16-16-40" text={"16х16 40 мин"}/>
          <Radiobutton id="16-30-90" text={"16х30 90 мин"}/>
      </fieldset>
      <Toggle
        id="1"
        text='Использовать метку "Знак вопроса"'
        />
      <fieldset>
        <legend>Правила игры</legend>
        <ol>
          <li>Цель игры - открыть все ячейки, не подорвавшись на мине.</li>
          <li>Левый клик мыши - открыть ячейку.</li>
          <li>Правый клик мыши - поставить метку.</li>
          <li>Левый и правый клики мыши на открытой ячейке при проставленных
             флажках - открыть все закрытые ячейки (количество флажков
             должно соответствовать количеству мин вокруг ячейки).</li>
          <li></li>
        </ol>
      </fieldset>
    </Modal>
  );
}

export default ConfigForm;