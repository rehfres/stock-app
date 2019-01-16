import React, { Component } from 'react';
// import logo from './logo.svg';
import Stock from './Stock';
import './App.css';
import { auth, getSymbolsFromDb, addSymbolToDb, deleteSymbolFromDb } from './firebase';
// import { Container, Draggable } from 'react-smooth-dnd';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: 'SNAP',
      symbolsListActive: [],
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
  async getSymbolsListActive() {
    const symbolsListActive = await getSymbolsFromDb();
    console.log('%c⧭', 'color: #2516c7', symbolsListActive);
    this.setState(state => ({...state, symbolsListActive}));
  }
  search(event) {
    const search = (event.target ? event.target.value : event).toUpperCase();
    this.setState(state => ({...state, search}));
    const searchList = this.state.symbolsList.filter(el => el.startsWith(search)) || [];
    this.setState(state => ({...state, searchList: searchList}));
  }
  tryToAddSymbolChart(symbol) {
    if (!this.state.symbolsListActive.some(el => el === symbol)) {
      this.setState(state => ({...state, symbolsListActive: state.symbolsListActive.concat([symbol])}));
      return addSymbolToDb(symbol);
    }
  }
  componentDidMount() {
    auth().then(() => this.getSymbolsListActive());
    this.getSymbolsList().then(() => this.search(this.state.search));
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <input className="search-bar" type="text" placeholder="Search" value={this.state.search} onChange={this.search}/>
          <ul className="search-options">
            {this.state.searchList.map(symbol => <li key={symbol}><button onMouseDown={() => this.tryToAddSymbolChart(symbol)}>{symbol}</button></li>).slice(0, 28)}
          </ul>
        </header>
        <div className="charts-container">
          {this.state.symbolsListActive.map(symbol => <Stock key={symbol} symbol={symbol}/>)}
        </div>
      </div>
    );
  }
}

export default App;
