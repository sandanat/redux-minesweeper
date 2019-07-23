import React from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';

import constants from '../modules/constants';
import getGridRowsAndColsQty from '../modules/get_grid_rows_and_cols_qty'

// constants are undefined in FieldCell.render without this
// todo перепроверить
let consts = {...constants};

// empty or mine cell
class FieldCell extends React.Component {
  cellRef = React.createRef();

  // shouldComponentUpdate is used to improve perfomance by avoiding immutable cells rendering.
  // PureComponent doesn't work because comparison of functions
  // this.props.markCell === nextProps.markCell will always return false.
  shouldComponentUpdate(nextProps) {
    if (
      this.props.cell.isOpened === nextProps.cell.isOpened &&
      this.props.cell.mark === nextProps.cell.mark
    ) return false;

    return true;
  }

  componentDidMount() {
    let self = this;

    // emitate pushed effect while button is pressed
    $(this.cellRef.current).bind('mousedown', event => {
      if(self.props.cell.isOpened) return;
      $(event.target).addClass('test-todo')  
    });
    
    $(this.cellRef.current).bind('mouseout', event => {
      if(self.props.cell.isOpened) return;
      $(event.target).removeClass('test-todo')  
    });
  }

  render() {
    let child = null;
    let cell = this.props.cell;

    if (cell.isOpened) {
      child = cell.isMined ?
        <i className="fa fa-bomb" aria-hidden="true"></i> :
        <span className={"mines-qty-" + cell.minesQty}>
          {cell.minesQty || ''}
        </span>
    } else {
      switch (cell.mark) {
        case consts.marks.FLAG:
          child = <i className="fa fa-flag" aria-hidden="true"></i>;
          break;

        case consts.marks.QUESTION:
          child = <i className="fa fa-question" aria-hidden="true"></i>;
          break;

        default:
          child = null;
          break;
      }
    }

    return (
      <div
        className={
          "field-cell " +
          (cell.isOpened ? "field-cell-opened " : "field-cell-closed") +
          (cell.isOpened && cell.isMined ? "field-cell-opened-mined" : " ")
        }
        onClick={this.props.handleLeftClick}
        onContextMenu={this.props.handleRightClick}
        ref={this.cellRef}
      >
        {child}
      </div>
    );
  }
}

FieldCell.propTypes = {
  cell: PropTypes.shape({
    isOpened: PropTypes.bool,
    mark: PropTypes.string,
    isMined: PropTypes.bool,
    minesQty: PropTypes.number
  }).isRequired,
  handleLeftClick: PropTypes.func.isRequired,
  handleRightClick: PropTypes.func.isRequired
}

// row with required cols qty
function FieldRow({ children }) {
  return (
    <div className="field-row">
      {children}
    </div>
  );
}

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

export { FieldCell, FieldRow, GameField };