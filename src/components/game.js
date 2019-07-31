import React from 'react';
import PropTypes from 'prop-types';

import constants from '../modules/constants';
import randomInteger from '../modules/random-integer'
import GameField from './game-field';
import Timer from '../containers/timer'

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.clickCell = this.clickCell.bind(this);
    this.markCell = this.markCell.bind(this);
    this.initiateGame = this.initiateGame.bind(this);
  }

  componentDidMount() {
    this.initiateGame();
  }

  componentDidUpdate({ config: prevConfig }) {
    let { rowsQty: prevRowsQty, colsQty: prevColsQty } = prevConfig;

    if (
      prevRowsQty && prevColsQty &&
      (prevRowsQty !== this.props.config.rowsQty ||
        prevColsQty !== this.props.config.colsQty)
    ) this.initiateGame();
  }

  initiateGame() {

    let { rowsQty, colsQty } = this.props.config;
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
    let { rowsQty, colsQty } = this.props.config;
    let minedCells = {};
    const getCellKey = (ri, ci) => `${ri} / ${ci}`;

    while (Object.keys(minedCells).length < this.props.config.minesQty) {
      let ri = randomInteger(0, rowsQty - 1);
      let ci = randomInteger(0, colsQty - 1);
      minedCells[getCellKey(ri, ci)] = true;
      cellsGrid[ri][ci].isMined = true;
    }

    return cellsGrid;
  }

  calcCellsMinesQty(minedCellsGrid) {
    for (let ri in minedCellsGrid) {
      for (let ci in minedCellsGrid[0]) {
        ri = +ri;
        ci = +ci;

        let cell = minedCellsGrid[ri][ci];

        if (cell.isMined) continue;

        let cellPerimeterCells = this.getCellPerimeterCells(
          ri,
          ci,
          minedCellsGrid
        );

        cell.minesQty = cellPerimeterCells.filter(cell => {
          return cell && cell.isMined;
        }).length;
      }
    }

    return minedCellsGrid;
  }

  // get cells surrounding a cell
  getCellPerimeterCells(rowInd, colInd, cellsGrid) {
    let result = [];

    for (let cell, cellI = 0; cellI < 9; cellI++) {
      let perimCellRowInd = rowInd - ((Math.floor(cellI / 3) - 1));
      let perimCellColInd = colInd - (((cellI % 3) - 1));
      let row = cellsGrid[perimCellRowInd];

      if (row) {
        cell = row[perimCellColInd];

        if (
          cell &&
          (perimCellColInd !== colInd || perimCellRowInd !== rowInd)
        ) {
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
  clickCell(rowInd, colInd, event) {
    let openPerimeterCells = event.nativeEvent.ctrlKey;

    let gameStatus = this.getGameStatus();

    if (gameStatus.isLost || !gameStatus.closedMinelessCellQty) return;

    let updatedCellsGrid = this.openCell([...this.props.cellsGrid], rowInd, colInd);

    if(openPerimeterCells) {
      let cellPerimeterCells = this.getCellPerimeterCells(rowInd, colInd, updatedCellsGrid);

      cellPerimeterCells.forEach(cell =>
        this.openCell(updatedCellsGrid, cell.rowInd, cell.colInd)
      );
    }

    updatedCellsGrid && this.props.updateCellsGrid(updatedCellsGrid);

    gameStatus = this.getGameStatus();
    let timerAction;

    if (gameStatus.isLost) {
      this.props.updateCellsGrid(this.openMines());
      timerAction = 'stop';
    } else {
      timerAction = !gameStatus.closedMinelessCellQty ? 'stop' : 'launch';
    }

    this.props.setTimerAction(timerAction);
  }

  openCell(cellsGrid, rowInd, colInd) {
    let cell = cellsGrid[rowInd][colInd];

    if (cell.isOpened || cell.mark !== constants.marks.NONE) return cellsGrid;

    cell.isOpened = true;

    // recursively open group of cells with zero mines qty around
    if (!cell.minesQty && !cell.isMined) {
      let cellPerimeterCells = this.getCellPerimeterCells(rowInd, colInd, cellsGrid);

      cellPerimeterCells.forEach(cell =>
        this.openCell(cellsGrid, cell.rowInd, cell.colInd)
      );
    }

    return cellsGrid;
  }

  /**
   * @desc Mouse right button click handler
   * @param {number} rowInd cell row coordinate
   * @param {number} colInd cell column coordinate
   * @param {object} event click event
  */
  markCell(rowInd, colInd, event) {
    event.preventDefault(); // disable context menu rendering

    let updatedCellsGrid = [...this.props.cellsGrid];
    // The cell on which right click is occured
    let currClickedCell = updatedCellsGrid[rowInd][colInd];

    if (currClickedCell.isOpened) return;

    let gameStatus = this.getGameStatus();

    if (!gameStatus.closedMinelessCellQty || gameStatus.isLost) return;

    let marksArr = [constants.marks.NONE];

    if (this.getMinesRemainQty() > 0) marksArr.push(constants.marks.FLAG);

    if (this.props.config.useCellQuestionMark) marksArr.push(constants.marks.QUESTION);

    let currentMarkInd = marksArr.indexOf(
      currClickedCell.mark
    );

    let nextMark = marksArr[currentMarkInd + 1] || marksArr[0];

    currClickedCell.mark = nextMark;

    this.props.updateCellsGrid(updatedCellsGrid);
  }

  getGameStatus() {
    let result = {
      closedMinelessCellQty: 0,
      isLost: false
    };
    let openedMinelessCells = [];

    for (let rowCells of this.props.cellsGrid) {
      for (let cell of rowCells) {
        if (cell.isMined && cell.isOpened) {
          result.isLost = true;
        }

        if (cell.isOpened && !cell.isMined) openedMinelessCells.push(cell);
      }
    }

    let { rowsQty, colsQty } = this.props.config;
    result.closedMinelessCellQty = (rowsQty * colsQty - this.props.config.minesQty) - openedMinelessCells.length;

    return result;
  }

  openMines() {
    let updatedCellsGrid = this.props.cellsGrid.map(rowCells => {
      return rowCells.map(cell => {
        if (cell.isMined && cell.mark !== constants.marks.FLAG) cell.isOpened = true;
        if (
          !cell.isMined &&
          cell.mark === constants.marks.FLAG &&
          !cell.isOpened
        ) cell.isWrongFlag = true;

        return cell;
      })
    })

    return updatedCellsGrid;
  }

  getMinesRemainQty() {
    let gameStatus = this.getGameStatus();
    if (!gameStatus.closedMinelessCellQty) return 0;

    let checkedMinesQty = 0;
    let wrongCheckedMinesQty = 0;

    for (let rowCells of this.props.cellsGrid) {
      for (let cell of rowCells) {
        if (cell.mark === constants.marks.FLAG) {
          checkedMinesQty += 1;

          if (cell.isWrongFlag) wrongCheckedMinesQty += 1;
        }
      }
    }

    let minesRemainQty = this.props.config.minesQty - checkedMinesQty;

    if (gameStatus.isLost) minesRemainQty += wrongCheckedMinesQty;

    return minesRemainQty;
  }


  render() {
    let gameStatus = this.getGameStatus();
    let smileSrc = "/smile-usual.ico";

    if (gameStatus.isLost) smileSrc = "/smile-sad.ico";

    if (!gameStatus.closedMinelessCellQty) smileSrc = "/smile-happy.ico";

    let header =
      <header>

        <div className="grid-1-3">
          <button
            className="reset-game game-button"
            href="#"
            onClick={this.initiateGame}
          >
            <i className="fa fa-repeat" aria-hidden="true" />
          </button>
        </div>

        <div className="grid-1-3">
          <img src={smileSrc} alt="smile" />
        </div>

        <div className="grid-1-3">
          <button
            className="config-game game-button"
            onClick={this.props.openConfigForm}
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
            <i className="fa fa-bomb" aria-hidden="true"></i>
            <span>{this.getMinesRemainQty()}</span>
          </div>
        </div>
      </footer>;

    return (
      <div>
        {header}
        <GameField
          handleLeftClick={this.clickCell}
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
  updateCellsGrid: PropTypes.func.isRequired,
  openConfigForm: PropTypes.func.isRequired
};

export default Game;