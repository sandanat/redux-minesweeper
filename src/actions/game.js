import constants from '../modules/constants';

export const updateCellsGrid = cellsGrid => ({
  type: constants.game.UPDATE_CELLS_GRID,
  payload: cellsGrid
});