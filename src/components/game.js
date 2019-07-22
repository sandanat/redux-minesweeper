
// не поправлено
import React from 'react';
import PropTypes from 'prop-types';

import constants from '../modules/constants';
import randomInteger from '../modules/random_integer'
import { GameField } from './basic_components';
import Toggle from '../containers/toggle';
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

  initiateGame(_event) {
    _event && _event.preventDefault();

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

        let upperCellsArr = [
          (calculatedCellsGrid[ri - 1] || {})[ci - 1],
          (calculatedCellsGrid[ri - 1] || {})[ci],
          (calculatedCellsGrid[ri - 1] || {})[ci + 1]
        ];
        let lowerCellsArr = [
          (calculatedCellsGrid[ri + 1] || {})[ci - 1],
          (calculatedCellsGrid[ri + 1] || {})[ci],
          (calculatedCellsGrid[ri + 1] || {})[ci + 1]
        ];
        let sideCellsArr = [
          (calculatedCellsGrid[ri] || {})[ci - 1],
          (calculatedCellsGrid[ri] || {})[ci + 1]
        ];
        let resultCellsArr = [
          ...upperCellsArr,
          ...lowerCellsArr,
          ...sideCellsArr
        ]

        cell.minesQty = resultCellsArr.filter(cell => {
          return cell && cell.isMined;
        }).length;
      }
    }

    return calculatedCellsGrid;
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
      for (let cellI = 0; cellI < 9; cellI++) {
        this.openCell(rowInd - ((Math.floor(cellI / 3) - 1)), colInd - (((cellI % 3) - 1)));
      }
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
   this.props.cellsGrid.forEach( (rowCells, i) => {
      rowCells.forEach( (cell, z) => {
        if (cell.isMined && cell.mark !== constants.marks.FLAG) cell.isOpened = true;

        setTimeout(
          () => this.props.updateCellsGrid(this.props.cellsGrid),
          10 * (z + i)
        );
      });
    });
  }

  // openMines() {
  //   let updatedCellsGrid = this.props.cellsGrid.map(rowCells => {
  //     return rowCells.map(cell => {
  //       if (cell.isMined && cell.mark !== constants.marks.FLAG) cell.isOpened = true;

  //       return cell;
  //     })
  //   })

  //   this.props.updateCellsGrid(updatedCellsGrid);
  // }

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
    return (
      <div>
        <GameField
          handleLeftClick={this.openCell}
          handleRightClick={this.markCell}
          cellsGrid={this.props.cellsGrid}
        />
        <footer>
          <Timer />
          {/* eslint-disable-next-line */}
          <a
            className="reset-game"
            href="#"
            onClick={this.initiateGame}
          >
            <i className="fa fa-redo" aria-hidden="true" />
          </a>
          <div className="mines-qty">
            <i className="fa fa-bomb" aria-hidden="true"></i>
            <input
              type="text"
              value={this.getMinesRemainQty()}
              readOnly
            />
          </div>
        </footer>
      </div>
    );
  }
}

// Game.propTypes = { todo
//   cellsGrid
//   config
//   setTimerAction
//   updateCellsGrid
// }

export default Game;