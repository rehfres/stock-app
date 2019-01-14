import React, { Component } from 'react';
// import logo from './logo.svg';
import './Stock.css';
import { drawPreviousCloseLine, drawChart } from './draw.js';
import timeToSeconds from './timeToSeconds.js';
import Big from 'big.js';

class Stock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prices: [],
      pricesModifiedForCanvas: [],
      counter: 0,
      previousClose: null,
      previousCloseModifiedForCanvas: null,
      priceMin: null,
      priceMax: null,
      coefPricesToCanvas: null
    };
    this.getDataAndMakeChart = this.getDataAndMakeChart.bind(this);
    this.makeChart = this.makeChart.bind(this);
    this.draw = this.draw.bind(this);
    this.setPreviousClose = this.setPreviousClose.bind(this);
    this.modifyEverythingForCanvas = this.modifyEverythingForCanvas.bind(this);
    this.getPricesMaxMinAndCanvasCoef = this.getPricesMaxMinAndCanvasCoef.bind(this);
  }
  async getDataAndMakeChart() {
    const chartData = await fetch('https://api.iextrading.com/1.0/stock/' + this.props.symbol + '/chart/1d')
      .then(response => response.json());
    this.makeChart(chartData);
    console.log('%c⧭', 'color: #c74b16', chartData);
  }
  async updateChart() {
    const newChartData = await fetch('https://api.iextrading.com/1.0/stock/' + this.props.symbol + '/chart/1d?chartLast=5')
      .then(response => response.json());
    
  }
  async makeChart(chartDataDay) {
    await this.setPreviousClose(chartDataDay);
    this.getPricesMaxMinAndCanvasCoef(chartDataDay);
    this.modifyEverythingForCanvas();
    this.draw();
  }
  async setPreviousClose(chartDataDay) {
    const chartDataMonth = await fetch('https://api.iextrading.com/1.0/stock/' + this.props.symbol + '/chart/1m')
      .then(response => response.json());
    const dateToday = new Date(Date.now() - 864e5).toISOString().split('T')[0].replace(/-/g,'');
    const chardDataDayReturnsYesterday = dateToday === chartDataDay[chartDataDay.length - 1].date;
    const objToGetPreviousCloseFrom = chartDataMonth[chartDataMonth.length - (chardDataDayReturnsYesterday ? 2 : 1)];
    const previousClose = objToGetPreviousCloseFrom.close;
    console.log('%c⧭', 'color: #c79816', `${this.props.symbol}, pC:${previousClose}`);
    this.setState(state => ({...state, previousClose}));
  }
  getPricesMaxMinAndCanvasCoef(chartDataDay) {
    const prices = [], simplePrices = [];
    let lastPrice = null;
    const lastLocalPriceTimeInSeconds = this.state.prices.legth ? this.state.prices[this.state.prices.length - 1].timeInSeconds : 0
    for (const minuteData of chartDataDay) {
      const price = minuteData.marketClose || minuteData.close || lastPrice;
      if (timeToSeconds(minuteData.minute) > lastLocalPriceTimeInSeconds) {
        prices.push({
          price,
          timeInSeconds: timeToSeconds(minuteData.minute) - (9 * 60 * 60 + 30 * 60)
        });
        simplePrices.push(price);
      }
      lastPrice = price;
      // console.log('%c⧭', 'color: #c71f16', timeToSeconds(minuteData.minute), lastLocalPricetimeInSeconds);
    }
    // console.log('%c⧭', 'color: #2516c7', prices, simplePrices);
    this.setState(state => ({...state, prices}));
    const priceMax = Math.max(...simplePrices, this.state.previousClose);
    const priceMin = Math.min(...simplePrices, this.state.previousClose);
    this.setState(state => ({...state, priceMax}));
    this.setState(state => ({...state, priceMin}));
    console.log('%c⧭', 'color: #c7c116', ...simplePrices, this.state.previousClose);
    const coefPricesToCanvas = 35 /*canvas height */ / (priceMax - priceMin);
    this.setState(state => ({...state, coefPricesToCanvas}));
  }
  modifyEverythingForCanvas() {
    this.setState(state => ({...state, previousCloseModifiedForCanvas: (state.previousClose - this.state.priceMin) * this.state.coefPricesToCanvas}));
    console.log('%c⧭', 'color: #b8ca10', this.state.previousCloseModifiedForCanvas);
    const pricesModifiedForCanvas = {
      positive: [],
      negative: []
    };
    let lastData = {
      sign: null,
      time: null
    }
    let index = 0
    // this.setState(state => ({...state, previousClose: state.priceMin + (state.priceMax - state.priceMin) / 2}));
    for (const priceObj of this.state.prices) {
      const price = priceObj.price
      const timeInSeconds = priceObj.timeInSeconds
      const sign = price >= this.state.previousClose ? 'positive' : 'negative';
      if (lastData.sign !== sign && lastData.sign !== null) {
        for (const temp of [lastData.sign, sign]) {
          pricesModifiedForCanvas[temp].push({
            timeInSeconds: (timeInSeconds + lastData.time) / 2, // average time
            price: this.state.previousCloseModifiedForCanvas,
            index
          });
          console.log('%c⧭', 'color: #c74b16', timeInSeconds, lastData.time, index);          
          index++;
        }
      }
      pricesModifiedForCanvas[sign].push({
        timeInSeconds,
        price: (price - this.state.priceMin) * this.state.coefPricesToCanvas,
        index
      });
      lastData.sign = sign;
      lastData.time = timeInSeconds;
      index++;
    }
    this.setState(state => ({...state, pricesModifiedForCanvas: pricesModifiedForCanvas}));
  }
  draw() {
    const canvas = this.refs.canvas;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawPreviousCloseLine(context, this.state.previousCloseModifiedForCanvas);
    drawChart(context, this.state.pricesModifiedForCanvas, this.state.previousCloseModifiedForCanvas);
    // fillChart(context, this.state.previousCloseModifiedForCanvas);
  }
  componentDidMount() {
    Big.DP = 2;
    this.getDataAndMakeChart();
  }
  render() {
    if (!this.state.prices.length) return null;
    const lastPrice = this.state.prices[this.state.prices.length - 1].price;
    console.log('%c⧭', 'color: #c7166f', lastPrice);
    const absoluteChange = Big(lastPrice).minus(this.state.previousClose).toString();
    const percentageChange = Big(lastPrice).times(100).div(this.state.previousClose).minus(100).toString();
    console.log('%c⧭', 'color: #c71f16', lastPrice.toString(), this.state.previousClose);
    return (
      <div className="chart">
        <div className="text">
          <p className="symbol">{this.props.symbol}</p>
          <p className="price">{lastPrice}</p>
          <p className={'change ' + (absoluteChange >= 0 ? 'positive' : 'negative')}>{absoluteChange} ({percentageChange}%)</p>
        </div>
        <canvas ref="canvas" width="100" height="35"></canvas>
      </div>
    );
  }
}

export default Stock;