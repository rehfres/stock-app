import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
// import io from 'socket.io-client';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: 'TSLA',
      prices: [],
      counter: 0,
      previousClose: null,
      symbolsList: [],
      searchList: []
    };
    this.handleClick = this.handleClick.bind(this);
    this.showRate = this.showRate.bind(this);
    this.draw = this.draw.bind(this);
    this.parseData = this.parseData.bind(this);
    this.search = this.search.bind(this);
  }
  handleClick() {
    console.log(this.state.counter);
    this.setState(state => ({ counter: state.counter + 1 }));
  }
  showRate(symbol) {
    console.log(symbol);
    
    let previousClose
    fetch('https://api.iextrading.com/1.0/stock/' + symbol + '/previous')
      .then(response => response.json())
      .then(r => {
        console.log('%c%s', 'color: #c716be', r.close);
        previousClose = r.close;
      })
      .then(() => fetch('https://api.iextrading.com/1.0/stock/' + symbol + '/chart/1d')
        .then(response => response.json())
        .then(r => this.parseData(r, previousClose))
      );
  }
  parseData(data, previousClose) {
    console.log(data);
    const pricesAll = [];
    let priceMax = 0, priceMin = 0;
    for (const minuteData of data) {
      if (minuteData.marketClose) pricesAll.push(minuteData.marketClose);
    }
    console.log('%c⧭', 'color: #1663c7', pricesAll);
    priceMax = Math.max(...pricesAll, previousClose);
    priceMin = Math.min(...pricesAll, previousClose);
    const coef = 35 /*canvas height */ / (priceMax - priceMin);
    this.setState(state => ({...state, previousClose: (previousClose - priceMin) * coef}))
    console.log('%c%s', 'color: #c716be', this.state.previousClose);
    console.log('%c%s %s %s', 'color: #25c716', priceMax, priceMin, coef);
    const pricesModifiedAll = [];
    for (const minuteData of data) {
      if (minuteData.marketClose) pricesModifiedAll.push((minuteData.marketClose - priceMin) * coef);
    }
    this.setState(state => ({...state, prices: pricesModifiedAll}))
    console.log('%c⧭', 'color: #c71616', pricesModifiedAll);
    this.draw()
    
    // this.setState(state => ({ ...state, close }));
  }
  draw() {
    const canvas = this.refs.canvas;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    this.setState(state => ({...state, counter: state.counter + 1}))
    // if (this.state.counter > 1) return 
    context.beginPath();
    context.moveTo(0, 35 - this.state.previousClose);
    context.lineTo(100, 35 - this.state.previousClose);
    context.lineWidth = 1;
    context.strokeStyle = '#0000001a';
    context.stroke();

    
    context.beginPath();
    context.moveTo(0, 35 - this.state.previousClose);
    for (const [index, price] of this.state.prices.entries()) {
      context.lineTo(index * 100 / 390, 35 - price);
      // console.log('%c⧭', 'color: #2516c7', index * 100 / 390, price);
    }
    context.lineTo(this.state.prices.length * 100 / 390, 35 - this.state.previousClose);
    // context.closePath();
    context.lineWidth = 1;
    // context.fillStyle = '#8ED6FF';
    // context.fill();
    context.strokeStyle = 'rgba(0,0,0,0)';
    context.stroke();

    // context.beginPath();
    context.save();
    context.clip();
    context.fillStyle = '#008000b2';
    context.fillRect(0, 0, 100, 35 - this.state.previousClose);
    context.fillStyle = '#ff0000b2';
    context.fillRect(0, 35 - this.state.previousClose, 100, 35);
    context.restore();
  }
  getSymbolsList() {
    fetch('https://api.iextrading.com/1.0/ref-data/symbols?filter=symbol')
      .then(response => response.json())
      .then(r => {
        this.setState(state => ({...state, symbolsList: r.map(el => el.symbol).slice(0, 10)}));
        this.setState(state => ({...state, searchList: state.symbolsList}));
        console.log('%c⧭', 'color: #c7c116', this.state.symbolsList);
      })
  }
  search(event) {
    console.log('%c⧭', 'color: #c71f16', event);
    this.setState(state => ({...state, search: event.target.value}));
    const searchList = this.state.symbolsList.filter(el => el === event.target.value) || []
    this.setState(state => ({...state, searchList: searchList}));
  }
  componentDidMount() {
    this.getSymbolsList()
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
          <input type="text" placeholder="Search" value={this.state.search} onChange={this.search}/>
          <ul>
            {this.state.searchList.map(symbol => <li key={symbol}><button onClick={() => this.showRate(symbol)}>{symbol}</button></li>)}
          </ul>
          {/* <ul>
            <li><button onClick={() => this.showRate('TSLA')}>TSLA</button></li>
            <li><button onClick={() => this.showRate('SNAP')}>SNAP</button></li>
          </ul> */}
        </header>
      </div>
    );
  }
}

export default App;
