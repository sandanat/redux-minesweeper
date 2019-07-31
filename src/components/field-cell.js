import React from 'react';
import PropTypes from 'prop-types';

import consts from '../modules/constants';

// empty or mine cell
export default class FieldCell extends React.Component {
  cellRef = React.createRef();

  // shouldComponentUpdate is used to improve perfomance by avoiding immutable cells rendering.
  // PureComponent doesn't work because comparison of functions
  // this.props.markCell === nextProps.markCell will always return false.
  shouldComponentUpdate(nextProps) {
    if (
      this.props.cell.isOpened === nextProps.cell.isOpened &&
      this.props.cell.mark === nextProps.cell.mark &&
      this.props.cell.isWrongFlag === nextProps.cell.isWrongFlag
    ) return false;

    return true;
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
    
    let className = " field-cell ";
    
    if(cell.isOpened) {
      className += cell.isMined ?
        " field-cell-opened-mined " :
        " field-cell-opened ";
    } else className += " field-cell-closed ";

    if(cell.isWrongFlag) className += " field-cell-wrong-flag ";

    return (
      <div
        className={className}
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
    minesQty: PropTypes.number,
    isWrongFlag: PropTypes.bool
  }),
  handleLeftClick: PropTypes.func.isRequired,
  handleRightClick: PropTypes.func.isRequired
}