import React, { Component } from 'react';
// import logo from './logo.svg';
import Stock from './Stock';
import * as firebase from 'firebase';
// import 'firebase/auth';
// import 'firebase/database';
import './App.css';

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
  search(event) {
    const search = (event.target ? event.target.value : event).toUpperCase();
    this.setState(state => ({...state, search}));
    const searchList = this.state.symbolsList.filter(el => el.startsWith(search)) || [];
    this.setState(state => ({...state, searchList: searchList}));
  }
  tryToAddSymbolChart(symbol) {
    if (!this.state.symbolsListActive.some(el => el === symbol)) {
      this.setState(state => ({...state, symbolsListActive: state.symbolsListActive.concat([symbol])}));
    }
  }
  componentDidMount() {
    this.getSymbolsList().then(() => this.search(this.state.search));
    var config = {
      apiKey: "AIzaSyDVs10hAUStxGmb_TxSEIR7iW78NyqwVKE",
      authDomain: "stock-app-b7556.firebaseapp.com",
      databaseURL: "https://stock-app-b7556.firebaseio.com",
      projectId: "stock-app-b7556",
      storageBucket: "stock-app-b7556.appspot.com",
      messagingSenderId: "174869200663"
    };
    firebase.initializeApp(config);
    var db = firebase.firestore();
    console.log('%c⧭', 'color: #2516c7', db);
    db.collection("users").doc('W2vY17FP3XNxMymJS5Dz').get().then(function(doc) {
      if (doc.exists) {
        console.log("Document data:", doc.data());
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }).catch(function(error) {
      console.log("Error getting document:", error);
    });
  
    var provider = new firebase.auth.GoogleAuthProvider();
    console.log('%c%s', 'color: #c7166f', provider);
    // firebase.auth().signInWithPopup(provider).then(function(result) {
    //   // This gives you a Google Access Token. You can use it to access the Google API.
    //   var token = result.credential.accessToken;
    //   // The signed-in user info.
    //   var user = result.user;
    //   // ...
    // }).catch(function(error) {
    //   // Handle Errors here.
    //   var errorCode = error.code;
    //   var errorMessage = error.message;
    //   // The email of the user's account used.
    //   var email = error.email;
    //   // The firebase.auth.AuthCredential type that was used.
    //   var credential = error.credential;
    //   // ...
    // });
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
