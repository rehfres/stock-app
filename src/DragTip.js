import React, { Component } from 'react';
import './DragTip.css';
import close from './close.svg';

class DragTip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    }
    this.hideTip = this.hideTip.bind(this);
  }
  hideTip() {
    this.setState(() => ({ show: false }));
    localStorage.setItem('hideTipForStockApp', true);
  }
  componentDidMount() {
    const show = !localStorage.getItem('hideTipForStockApp');
    console.log('%c⧭', 'color: #00e600', localStorage.getItem('hideTipForStockApp'));
    this.setState(() => ({ show }));
    console.log('%c⧭', 'color: #f2ceb6', show, this.state);
  }
  render() {
    return (
      <div className={'tip tip--' + (this.state.show ? 'shown' : 'hidden')}>
        <p className="tip__text">Drag to reorder/remove charts</p>
        <img src={close} alt="close" className="close" onClick={this.hideTip}/>
      </div>
    )
  };
}

export default DragTip;