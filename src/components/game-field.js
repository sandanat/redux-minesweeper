import React from 'react';
import PropTypes from 'prop-types';

import FieldCell from './field-cell';
import FieldRow from './field-row';
import getGridRowsAndColsQty from '../modules/get-grid-rows-and-cols-qty'

// main game field with cells grid
function GameField({ cellsGrid, handleLeftClick, handleRightClick }) {
  let rowsArr = getRows(cellsGrid);

  // get required rows and cols cells qty according game config
  function getRows(cellsGrid) {
    let { rowsQty, colsQty } = getGridRowsAndColsQty(cellsGrid);
    let result = [];

    for (let ri = 0; ri < rowsQty; ri++) {
      let colsArr = [];

      for (let ci = 0; ci < colsQty; ci++) {
        let cell = cellsGrid[ri][ci];

        colsArr.push(
          <FieldCell
            handleLeftClick={handleLeftClick.bind(null, ri, ci)}
            handleRightClick={handleRightClick.bind(null, ri, ci)}
            key={ri + '_' + ci}

            // WARN: it's necessary to use new copy of obj for
            // valid FieldCell.shouldComponentUpdate work.
            // Otherwise this.props.cell[prop_name] will be equal to 
            // nextProps.cell[prop_name] (except function props)
            cell={{ ...cell }}
          />
        )
      }

      result.push(
        <FieldRow key={`.${ri}`}>
          {colsArr}
        </FieldRow>
      );
    }

    return result;
  }

  return (
    <div className="game-field">
      {rowsArr}
    </div>
  );
}

GameField.propTypes = {
  cellsGrid: PropTypes.array.isRequired,
  handleLeftClick: PropTypes.func.isRequired,
  handleRightClick: PropTypes.func.isRequired
}

export default GameField;