function getGridRowsAndColsQty(cellsGrid) {
  return {
    rowsQty: cellsGrid.length || 0,
    colsQty: cellsGrid[0].length || 0
  };
}

export default getGridRowsAndColsQty;