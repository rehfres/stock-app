import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
// import io from 'socket.io-client';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      close: null,
      counter: 0
    };
    this.handleClick = this.handleClick.bind(this);
    this.showRate = this.showRate.bind(this);
    this.draw = this.draw.bind(this);
  }
  handleClick() {
    console.log(this.state.counter);
    this.setState(state => ({ counter: this.state.counter + 1 }));
  }
  showRate(symbol) {
    console.log(symbol)
    fetch('https://api.iextrading.com/1.0/stock/' + symbol + '/chart/1d')
      .then(response => response.json())
      .then(r => {
        console.log(r);
        const close = r[r.length - 1].marketClose
        console.log('%c⧭', 'color: #c7166f', close);
        this.setState(state => ({ ...state, close }));
      })
  }
  draw() {
    var canvas = this.refs.canvas;
    var context = canvas.getContext('2d');

    context.beginPath();
    context.moveTo(0, 35 / 2);
    context.lineTo(100, 35 / 2);
    context.lineWidth = 2;
    context.strokeStyle = '#0000001a';
    context.stroke();
    context.beginPath();

    context.beginPath();
    context.moveTo(0, 35 / 2);
    context.lineTo(5, 30);
    context.lineTo(5, 10);
    context.lineTo(10, 15);
    context.lineTo(15, 5);
    context.lineTo(20, 1);
    context.lineTo(25, 32);
    context.lineTo(30, 14);
    context.lineTo(35, 35 / 2);
    // context.closePath();
    context.lineWidth = 2;
    context.fillStyle = '#8ED6FF';
    context.fill();
    // context.strokeStyle = 'blue';
    context.stroke();

    context.clip()
    context.fillStyle = '#008000b2';
    context.fillRect(0, 0, 100, 35 / 2);
    context.fillStyle = '#ff0000b2';
    context.fillRect(0, 35 / 2, 100, 35);
  }
  componentDidMount() {
    this.draw()
    // const socket = io('https://ws-api.iextrading.com/1.0/stock/chart/1d')
    // socket.on('message', message => {
    //   const close = JSON.parse(message).lastSalePrice
    //   console.log(JSON.parse(message))
    //   this.setState(state => ({ ...state, close }));
    // })
    // socket.on('connect', () => {
    //   socket.emit('subscribe', 'tsla')
    //   // socket.emit('unsubscribe', 'aig+')
    // })
    // socket.on('disconnect', () => console.log('Disconnected.'))
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          {/* <img src={logo} onClick={this.handleClick} className="App-logo" alt="logo" /> */}
          <canvas ref="canvas" id="myCanvas" width="100" height="35"></canvas>
          <p>
            {this.state.close}
          </p>
          <input type="text" placeholder="Search"/>
          <ul>
            <li><button onClick={() => this.showRate('TSLA')}>TSLA</button></li>
            <li><button onClick={() => this.showRate('SNAP')}>SNAP</button></li>
          </ul>
        </header>
      </div>
    );
  }
}

export default App;
