
// не поправлено
import React from 'react';
import PropTypes from 'prop-types';

import constants from '../modules/constants';
import randomInteger from '../modules/random_integer'
import { GameField } from './basic_components';
import Timer from '../containers/timer'

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.openCell = this.openCell.bind(this);
    this.markCell = this.markCell.bind(this);
    this.initiateGame = this.initiateGame.bind(this);
  }

  componentDidMount() {
    this.initiateGame();
  }

  initiateGame() {

    let { rowsQty, colsQty } = { ...this.props.config };
    let cellsGrid = this.getCellsGrid(rowsQty, colsQty)

    this.props.updateCellsGrid(cellsGrid);
    this.props.setTimerAction('reset');
  }

  getCellsGrid(rowsQty, colsQty) {
    let grid = [];

    for (let ri = 0; ri < rowsQty; ri++) {
      let row = [];

      for (let ci = 0; ci < colsQty; ci++) {
        row.push({
          isOpened: false,
          mark: constants.marks.NONE
        });
      }

      grid.push(row);
    }

    let cellsWithMines = this.fillCellsWithMines(grid);

    return this.calcCellsMinesQty(cellsWithMines);
  }

  fillCellsWithMines(cellsGrid) {
    let minedCellsGrid = [...cellsGrid];
    let { rowsQty, colsQty } = { ...this.props.config };
    let minedCells = {};
    const getCellKey = (ri, ci) => `${ri} / ${ci}`;

    while (Object.keys(minedCells).length < this.props.config.minesQty) {
      let ri = randomInteger(0, rowsQty - 1);
      let ci = randomInteger(0, colsQty - 1);
      minedCells[getCellKey(ri, ci)] = true;
      minedCellsGrid[ri][ci].isMined = true;
    }

    return minedCellsGrid;
  }

  calcCellsMinesQty(minedCellsGrid) {
    let calculatedCellsGrid = [...minedCellsGrid];

    for (let ri in calculatedCellsGrid) {
      for (let ci in calculatedCellsGrid[0]) {
        ri = +ri;
        ci = +ci;

        let cell = calculatedCellsGrid[ri][ci];

        if (cell.isMined) continue;

        let cellPerimeterCells = this.getCellPerimeterCells(
          ri,
          ci,
          calculatedCellsGrid
        );

        cell.minesQty = cellPerimeterCells.filter(cell => {
          return cell && cell.isMined;
        }).length;
      }
    }

    return calculatedCellsGrid;
  }

  // get cells surrounding a cell
  getCellPerimeterCells(rowInd, colInd, cellsGrid) {
    cellsGrid = cellsGrid || this.props.cellsGrid;
    let result = [];

    for (let cell, cellI = 0; cellI < 9; cellI++) {
      let perimCellRowInd = rowInd - ((Math.floor(cellI / 3) - 1));
      let perimCellColInd = colInd - (((cellI % 3) - 1));
      let row = cellsGrid[perimCellRowInd];

      if(row) {
        cell = row[perimCellColInd];
        
        if(
          cell &&
          (perimCellColInd !== colInd || perimCellRowInd !== rowInd)
        )  {
          cell.rowInd = perimCellRowInd;
          cell.colInd = perimCellColInd;
          result.push(cell);
        }
      }
    }

    return result;
  }

  /**
   * @desc Mouse left button click handler
   * @param {number} rowInd cell row coordinate
   * @param {number} colInd cell column coordinate
   * @param {object} event click event
   */
  openCell(rowInd, colInd, event) {
    let updatedCellsGrid = [...this.props.cellsGrid];

    let cell = (updatedCellsGrid[rowInd] || {})[colInd];

    if (!cell || cell.isOpened || cell.mark !== constants.marks.NONE) return;

    if (this.gameIsLost()) return;
    if (this.gameIsWon()) return;

    cell.isOpened = true;

    // recursively open group of cells with zero mines qty around
    if (!cell.minesQty && !cell.isMined) {
      let cellPerimeterCells = this.getCellPerimeterCells(rowInd, colInd);

      cellPerimeterCells.forEach(cell =>
        this.openCell(cell.rowInd, cell.colInd)
      );
    }

    let timerAction;

    if (this.gameIsLost()) {
      this.openMines();
      timerAction = 'stop';
    } else {
      timerAction = this.gameIsWon() ? 'stop' : 'launch';
      this.props.updateCellsGrid(updatedCellsGrid);
    }

    this.props.setTimerAction(timerAction);
  }

  /**
   * @desc Mouse right button click handler
   * @param {number} rowInd cell row coordinate
   * @param {number} colInd cell column coordinate
   * @param {object} event click event
  */
  markCell(rowInd, colInd, event) {
    event.preventDefault(); // disable context menu rendering

    if (this.gameIsWon() || this.gameIsLost()) return;

    let updatedCellsGrid = [...this.props.cellsGrid];

    let marksArr = [constants.marks.NONE];

    if (this.getMinesRemainQty() > 0) marksArr.push(constants.marks.FLAG);

    if (this.props.config.useCellQuestionMark) marksArr.push(constants.marks.QUESTION);

    // The cell on which right click is occured
    let currClickedCell = updatedCellsGrid[rowInd][colInd];
    let currentMarkInd = marksArr.indexOf(
      currClickedCell.mark
    );

    let nextMark = marksArr[currentMarkInd + 1] || marksArr[0];

    currClickedCell.mark = nextMark;

    this.props.updateCellsGrid(updatedCellsGrid);
  }

  gameIsLost() {
    for (let rowCells of this.props.cellsGrid) {
      for (let cell of rowCells) {
        if (cell.isMined && cell.isOpened) return true;
      }
    }

    return false;
  }

  gameIsWon() {
    let openedCells = [];

    for (let rowCells of this.props.cellsGrid) {
      for (let cell of rowCells) {
        if (cell.isOpened) openedCells.push(cell);
      }
    }

    let { rowsQty, colsQty } = { ...this.props.config };
    let result = (rowsQty * colsQty - this.props.config.minesQty) === openedCells.length;

    return result;
  }

  openMines() {
    let updatedCellsGrid = this.props.cellsGrid.map(rowCells => {
      return rowCells.map(cell => {
        if (cell.isMined && cell.mark !== constants.marks.FLAG) cell.isOpened = true;

        return cell;
      })
    })

    this.props.updateCellsGrid(updatedCellsGrid);
  }

  getMinesRemainQty() {
    if (this.gameIsWon()) return 0;

    let checkedMinesQty = 0;

    for (let rowCells of this.props.cellsGrid) {
      for (let cell of rowCells) {
        if (cell.mark === constants.marks.FLAG) checkedMinesQty += 1;
      }
    }

    let minesRemainQty = this.props.config.minesQty - checkedMinesQty;

    return minesRemainQty;
  }


  render() {
    let header =
      <header>

        <div className="grid-1-2">
          <button
            className="reset-game game-button"
            href="#"
            onClick={this.initiateGame}
          >
            <i className="fa fa-redo" aria-hidden="true" />
          </button>
        </div>

        <div className="grid-1-2">
          <button
            className="config-game game-button"
            onClick={() => {}}
          >
            <i className="fa fa-cog" aria-hidden="true" />
          </button>
        </div>

      </header>;

    let footer =
      <footer>
        <div className="grid-1-2">
          <Timer />
        </div>

        <div className="grid-1-2">
          <div className="mines-qty">
            <input
              type="text"
              value={this.getMinesRemainQty()}
              readOnly
            />
            <i className="fa fa-bomb" aria-hidden="true"></i>
          </div>
        </div>
      </footer>;

    return (
      <div>
        {header}
        <GameField
          handleLeftClick={this.openCell}
          handleRightClick={this.markCell}
          cellsGrid={this.props.cellsGrid}
        />
        {footer}
      </div>
    );
  }
}

Game.propTypes = {
  cellsGrid: PropTypes.array.isRequired,
  config: PropTypes.shape({
    rowsQty: PropTypes.number.isRequired,
    colsQty: PropTypes.number.isRequired,
    minesQty: PropTypes.number.isRequired,
    useCellQuestionMark: PropTypes.bool.isRequired
  }),
  setTimerAction: PropTypes.func.isRequired,
  updateCellsGrid: PropTypes.func.isRequired
};

export default Game;