import React, { Component } from 'react';
// import logo from './logo.svg';
import './Stock.css';
import { drawPreviousCloseLine, drawChart, fillChart } from 'socket.io-client';

class Stock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      symbol: 'TSLA',
      prices: [],
      counter: 0,
      previousClose: null,
      priceMin: null,
      priceMax: null,
      coefPricesToCanvas: null
    };
    this.getChart = this.getChart.bind(this);
    this.draw = this.draw.bind(this);
    this.parseData = this.parseData.bind(this);
    this.search = this.search.bind(this);
  }
  async getDataAndMakeChart() {
    const chartData = await fetch('https://api.iextrading.com/1.0/stock/' + symbol + '/chart/1d')
      .then(response => response.json())
    this.makeChart(chartData);
  }
  updateChart() {
    // fetch('https://api.iextrading.com/1.0/stock/' + symbol + '/chart/1d')
    // fetch('https://api.iextrading.com/1.0/stock/' + symbol + '/chart/1m').then(response => response.json())

    //   .then(response => response.json()
    //   .then(chartData => {
    //     this.makeChart(chartData)
    //   })
  }
  makeChart(chartDataDay) {
    this.getPricesMaxMinAndCanvasCoef(chartDataDay)
    this.setPreviousClose(chartDataDay);
    this.setPrices(chartDataDay);
    this.draw();
  }
  async setPreviousClose(chartDataDay) {
    // if (!this.state.priceMin || !this.state.coef) return
    chartDataMonth = await fetch('https://api.iextrading.com/1.0/stock/' + symbol + '/chart/1m')
      .then(response => response.json())
    const dateToday = new Date(Date.now() - 864e5).toISOString().split('T')[0].replace(/-/g,'');
    const chardDataDayReturnsYesterday = dateToday === chartDataDay[chartDataDay.length - 1].date
    const objToGetPreviousCloseFrom = chartDataMonth[chartDataMonth.length - (chardDataDayReturnsYesterday ? 2 : 1)];
    const previousClose = objToGetPreviousCloseFrom.close;
    this.setState(state => ({...state, previousClose: (previousClose - this.state.priceMin) * this.state.coef}))
    return previousClose;
  }
  getPricesMaxMinAndCanvasCoef(chartDataDay) {
    const pricesAll = [];
    let priceMax = 0, priceMin = 0;
    for (const minuteData of chartDataDay) {
      if (minuteData.marketClose || minuteData.close) pricesAll.push(minuteData.marketClose || minuteData.close);
    }
    priceMax = Math.max(...pricesAll, previousClose);
    priceMin = Math.min(...pricesAll, previousClose);
    this.setState(state => ({...state, priceMax}));
    this.setState(state => ({...state, priceMin}));
    const coefPricesToCanvas = 35 /*canvas height */ / (priceMax - priceMin);
    this.setState(state => ({...state, coefPricesToCanvas}))
  }
  setPrices(chartDataDay) {
    const pricesModifiedAll = [];
    for (const minuteData of chartDataDay) {
      if (minuteData.marketClose || minuteData.close) pricesModifiedAll.push(((minuteData.marketClose || minuteData.close) - this.state.priceMin) * this.state.coef);
    }
    this.setState(state => ({...state, prices: pricesModifiedAll}))
  }
  draw() {
    const canvas = this.refs.canvas;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    this.drawPreviousCloseLine(this.state.previousClose)
    this.drawChart(this.state.prices, this.state.previousClose)
    this.fillChart(this.state.previousClose)
  }
  componentDidMount() {
  }
  render() {
    return (
      <div className="App">
        <canvas ref="canvas" id="myCanvas" width="100" height="35"></canvas>
      </div>
    );
  }
}

export default App;
