import consts from './constants';

export default level => {
  let result = {
    rowsQty: 0,
    colsQty: 0,
    minesQty: 0
  };

  if (level && consts.map_gameLevel_gameConfig[level]) {
    result = consts.map_gameLevel_gameConfig[level];
  }

  return result;
}