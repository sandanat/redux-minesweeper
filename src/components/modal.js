import React from 'react';
import ReactDOM from 'react-dom';

class Modal extends React.Component {
  constructor(props) {
    super(props);

    this.modalRoot = document.getElementById('root');
    this.modal = document.createElement('div'); // todo заменить на JSX
  }

  componentDidMount() {
    console.log('modal did mount');
    this.modalRoot.appendChild(this.modal);
  }
  
  componentWillUnmount() {
    console.log('modal will unmount');
    this.modalRoot.removeChild(this.modal);
  }

  render() {
    return this.props.showModal ?
      ReactDOM.createPortal(
        this.props.children,
        this.modal
      ) :
      null
  }
}

export default Modal;