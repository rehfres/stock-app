import React, { Component } from 'react';
// import logo from './logo.svg';
import Stock from './Stock';
import './App.css';
import io from 'socket.io-client';
const socket = io('https://ws-api.iextrading.com/1.0/last');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: 'SNAP',
      symbolsListActive: [],
      symbolsActiveData: {},
      symbolsList: [],
      searchList: []
    };
    this.search = this.search.bind(this);
  }
  handleClick() {
    console.log(this.state.counter);
    this.setState(state => ({ counter: state.counter + 1 }));
  }
  getSymbolsList() {
    return fetch('https://api.iextrading.com/1.0/ref-data/symbols?filter=symbol')
      .then(response => response.json())
      .then(r => {
        this.setState(state => ({...state, symbolsList: r.map(el => el.symbol)}));
        this.setState(state => ({...state, searchList: state.symbolsList}));
      })
  }
  search(event) {
    const search = event.target ? event.target.value : event;
    this.setState(state => ({...state, search}));
    const searchList = this.state.symbolsList.filter(el => el.startsWith(search.toUpperCase())) || [];
    this.setState(state => ({...state, searchList: searchList}));
  }
  tryToAddSymbolChart(symbol) {
    if (!this.state.symbolsListActive.some(el => el === symbol)) {
      this.setState(state => ({...state, symbolsListActive: state.symbolsListActive.concat([symbol])}));
      socket.emit('subscribe', symbol)
      this.setState(state => ({...state, symbolsActiveData: {
        ...state.symbolsActiveData,
        [symbol]: {}
      }}));
    }
  }
  componentDidMount() {
    this.getSymbolsList().then(() => this.search(this.state.search));
    // const socket = io('https://ws-api.iextrading.com/1.0/tops')

    // // Listen to the channel's messages
    // socket.on('message', message => console.log(message))

    // // Connect to the channel
    // socket.on('connect', () => {

    //   // Subscribe to topics (i.e. appl,fb,aig+)
    //   socket.emit('subscribe', 'snap,fb,aig+')

    //   // Unsubscribe from topics (i.e. aig+)
    //   // socket.emit('unsubscribe', 'aig+')
    // })

    // // Disconnect from the channel
    // socket.on('disconnect', () => console.log('Disconnected.'))

    console.log('%c⧭', 'color: #16a9c7', socket);
    socket.on('message', message => {
      // const close = JSON.parse(message).lastSalePrice
      console.log(JSON.parse(message))
      // this.setState(state => ({ ...state, close }));
    })
    socket.on('connect', () => {
      console.log('%c%s', 'color: #c76f16', 'connect');
      // socket.emit('subscribe', 'tsla')
      // socket.emit('unsubscribe', 'aig+')
    })
    socket.on('disconnect', () => console.log('Disconnected.'))
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          {/* <img src={logo} onClick={this.handleClick} className="App-logo" alt="logo" /> */}
          {this.state.symbolsListActive.map(symbol => <Stock key={symbol} symbol={symbol} lastData={this.state.symbolsActiveData[symbol]}/>)}
          <input type="text" placeholder="Search" value={this.state.search} onChange={this.search}/>
          <ul>
            {this.state.searchList.map(symbol => <li key={symbol}><button onClick={() => this.tryToAddSymbolChart(symbol)}>{symbol}</button></li>).slice(0, 10)}
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
