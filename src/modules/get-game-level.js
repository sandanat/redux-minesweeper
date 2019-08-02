import constants from './constants';
import getKey from './get-rows-cols-mines-key';

export default (rowsQty, colsQty, minesQty) => {
  let key = getKey(rowsQty, colsQty, minesQty);

  return constants.map_gameConfig_gameLevel[key];
}