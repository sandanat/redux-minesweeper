import { connect } from 'react-redux';

import Game from '../components/game';
import { updateCellsGrid } from '../actions/game';
import { setTimerAction } from '../actions/timer';


const mapStateToProps = state => ({
  config: state.config,
  cellsGrid: state.cellsGrid
});

const mapDispatchToProps = dispatch => ({
  updateCellsGrid: cellsGrid => dispatch(updateCellsGrid(cellsGrid)),
  setTimerAction: action => dispatch(setTimerAction(action))
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game);