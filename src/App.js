import React, { Component } from 'react';
// import logo from './logo.svg';
import Stock from './Stock';
import './App.css';
import { tryToGetUserId, signIn, signOut, getSymbolsFromDb, addSymbolToDb, deleteSymbolFromDb, reorderSymbolsInDb } from './firebase';
import { Container, Draggable } from 'react-smooth-dnd';
import { initCanvasSize } from './draw'
import SignInOut from './SignInOut'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      symbolsListActive: [],
      symbolsList: [],
      searchList: [],
      canvasSize: {
        height: 35,
        width: 100
      },
      counter: 0,
      signedIn: null
    };
    this.search = this.search.bind(this);
    this.reorderCharts = this.reorderCharts.bind(this);
    this.initCanvasSizes = this.initCanvasSizes.bind(this);
    this.signInOut = this.signInOut.bind(this);
  }
  handleClick() {
    console.log(1, this.state.counter);
    this.setState(state => ({ counter: state.counter + 1 }));
  }
  getSymbolsList() {
    return fetch('https://api.iextrading.com/1.0/ref-data/symbols?filter=symbol')
      .then(response => response.json())
      .then(r => {
        const symbolsList = r.map(el => el.symbol)
        this.setState(state => ({...state, symbolsList, searchList: state.symbolsList}));
      })
  }
  async getSymbolsListActive() {
    const symbolsListActive = await getSymbolsFromDb();
    console.log('%c⧭', 'color: #2516c7', symbolsListActive);
    this.setState(state => ({...state, symbolsListActive}));
    console.log('%c⧭', 'color: #c76f16', this.state.symbolsListActive);
  }
  search(event) {
    const search = (event.target ? event.target.value : event).toUpperCase();
    const searchList = this.state.symbolsList.filter(el => el.startsWith(search)) || [];
    this.setState(state => ({...state, searchList: searchList, search}));
  }
  tryToAddSymbolChart(symbol) {
    if (!this.state.symbolsListActive.some(el => el === symbol)) {
      this.setState(state => ({...state, symbolsListActive: state.symbolsListActive.concat([symbol])}));
      return this.state.signedIn ? addSymbolToDb(symbol) : null;
    }
  }
  reorderCharts(dragResult) {
    console.log('%c⧭', 'color: #6c16c7', dragResult);
    console.log('%c⧭', 'color: #c76f16', this.state.symbolsListActive);
    const { removedIndex, addedIndex } = dragResult;
    if (removedIndex === addedIndex) return
    const symbolsListActive = this.state.symbolsListActive.slice();
    const removedChartSymbol = symbolsListActive.splice(removedIndex, 1)[0]
    if (addedIndex) symbolsListActive.splice(addedIndex, 0, removedChartSymbol);
    console.log('%c⧭', 'color: #1663c7', symbolsListActive);
    this.setState(state => ({...state, symbolsListActive}));
    if (this.state.signedIn) reorderSymbolsInDb(symbolsListActive);
  }
  initCanvasSizes() {
    this.setState(state => ({...state, canvasSize: {
      height: 35 * window.devicePixelRatio,
      width: 100 * window.devicePixelRatio
    }}), () => initCanvasSize(this.state.canvasSize));
  }
  signInOut() {
    if (!this.state.signedIn) {
      signIn().then(() => {
        this.setState(state => ({...state, signedIn: true}));
        this.getSymbolsListActive()
      });
    } else {
      signOut().then(() => {
        this.setState(state => ({...state, signedIn: false, symbolsListActive: []}));
      });
    }
  }
  componentDidMount() {
    this.initCanvasSizes();
    tryToGetUserId().then(signedIn => {
      console.log('%c⧭s', 'color: #16c7a1', signedIn);
      this.setState(state => ({...state, signedIn}));
      if (signedIn) {
        this.getSymbolsListActive()
      }
    });
    this.getSymbolsList().then(() => this.search(this.state.search));
  }
  render() {
    return (
      <div className="App">
        {/* <p>{window.devicePixelRatio}</p> */}
        <header className="App-header">
          <input className="search-bar" type="text" placeholder="Search" value={this.state.search} onChange={this.search}/>
          <ul className="search-options">
            {this.state.searchList.map(symbol => <li key={symbol}><button onMouseDown={() => this.tryToAddSymbolChart(symbol)}>{symbol}</button></li>).slice(0, 28)}
          </ul>
        </header>
        <div className="charts-container">
          <Container onDrop={this.reorderCharts} removeOnDropOut>
            {this.state.symbolsListActive.map(symbol => (
              <Draggable key={symbol}>
                <Stock symbol={symbol} canvasSize={this.state.canvasSize}/>
              </Draggable>
            ))}
          </Container>
        </div>
        {this.state.signedIn !== null && <SignInOut atClick={this.signInOut} signedIn={this.state.signedIn}/>}
      </div>
    );
  }
}

export default App;
