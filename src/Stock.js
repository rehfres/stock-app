import React, { Component } from 'react';
// import logo from './logo.svg';
import './Stock.css';
import { drawPreviousCloseLine, drawChart } from './draw.js';
import timeToSeconds from './timeToSeconds.js';
import Big from 'big.js';
import { socket, startGettingSymbolData } from './Socket';

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
      coefPricesToCanvas: null,
      webSocketsMessagesCounter: 0
    };
    this.canvas = React.createRef();
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
    return this.makeChart(chartData);
    // console.log('%c⧭', 'color: #c74b16', chartData);
  }
  // async updateChart() {
  //   const newChartData = await fetch('https://api.iextrading.com/1.0/stock/' + this.props.symbol + '/chart/1d?chartLast=5')
  //     .then(response => response.json());
    
  // }
  async makeChart(chartDataDay) {
    await this.setPreviousClose(chartDataDay);
    this.getPricesMaxMinAndCanvasCoef(chartDataDay);
    this.modifyEverythingForCanvas();
    return this.draw();
  }
  async setPreviousClose(chartDataDay) {
    const chartDataMonth = await fetch('https://api.iextrading.com/1.0/stock/' + this.props.symbol + '/chart/1m')
      .then(response => response.json());
    const dateToday = new Date(Date.now() - 864e5).toISOString().split('T')[0].replace(/-/g,'');
    const chardDataDayReturnsYesterday = dateToday === chartDataDay[chartDataDay.length - 1].date;
    const objToGetPreviousCloseFrom = chartDataMonth[chartDataMonth.length - (chardDataDayReturnsYesterday ? 2 : 1)];
    const previousClose = objToGetPreviousCloseFrom.close;
    // console.log('%c⧭', 'color: #c79816', `${this.props.symbol}, pC:${previousClose}`);
    this.setState(state => ({...state, previousClose}));
  }
  getPricesMaxMinAndCanvasCoef(chartDataDay) {
    const prices = [], simplePrices = [];
    // let lastPrice = null;
    // const lastLocalPriceTimeInSeconds = this.state.prices.legth ? this.state.prices[this.state.prices.length - 1].timeInSeconds : 0
    for (const minuteData of chartDataDay) {
      const price = minuteData.close || minuteData.marketClose;
      if (price) {
        prices.push({
          price,
          timeInSeconds: timeToSeconds(minuteData.minute)
        });
        simplePrices.push(price);
      }
      // lastPrice = price;
      // console.log('%c⧭', 'color: #c71f16', timeToSeconds(minuteData.minute), lastLocalPricetimeInSeconds);
    }
    // console.log('%c⧭', 'color: #2516c7', prices);
    this.setState(state => ({...state, prices}));
    const priceMax = Math.max(...simplePrices, this.state.previousClose);
    const priceMin = Math.min(...simplePrices, this.state.previousClose);
    this.setState(state => ({...state, priceMax}));
    this.setState(state => ({...state, priceMin}));
    // console.log('%c⧭', 'color: #c7c116', ...simplePrices, this.state.previousClose);
    const coefPricesToCanvas = 35 /*canvas height */ / (priceMax - priceMin);
    this.setState(state => ({...state, coefPricesToCanvas}));
  }
  modifyEverythingForCanvas() {
    this.setState(state => ({...state, previousCloseModifiedForCanvas: (state.previousClose - this.state.priceMin) * this.state.coefPricesToCanvas}));
    // console.log('%c⧭', 'color: #b8ca10', this.state.previousCloseModifiedForCanvas);
    const pricesModifiedForCanvas = {
      positive: [],
      negative: []
    };
    let lastData = {
      sign: null,
      time: null
    }
    let index = 0;
    // this.setState(state => ({...state, previousClose: state.priceMin + (state.priceMax - state.priceMin) / 2}));
    for (const priceObj of this.state.prices) {
      const price = priceObj.price;
      const timeInSeconds = this.modifyTimeForCanvas(priceObj.timeInSeconds);
      const sign = price >= this.state.previousClose ? 'positive' : 'negative';
      if (lastData.sign !== sign && lastData.sign !== null) {
        for (const temp of [lastData.sign, sign]) {
          pricesModifiedForCanvas[temp].push({
            timeInSeconds: (timeInSeconds + lastData.time) / 2, // average time
            price: this.state.previousCloseModifiedForCanvas,
            index
          });
          // console.log('%c⧭', 'color: #c74b16', timeInSeconds, lastData.time, index);          
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
    this.setState(state => ({...state, pricesModifiedForCanvas}));
    // console.log('%c', 'color: #86c716', this.state.pricesModifiedForCanvas);
  }
  draw() {
    const canvas = this.canvas.current;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawPreviousCloseLine(context, this.state.previousCloseModifiedForCanvas);
    drawChart(context, this.state.pricesModifiedForCanvas, this.state.previousCloseModifiedForCanvas);
    // fillChart(context, this.state.previousCloseModifiedForCanvas);
  }
  onSocketMessage() {
    socket.on('message', message => {
      message = JSON.parse(message);
      if (message.symbol !== this.props.symbol) return;
      console.log(message);
      this.mergeSocketDataToPrices(message);
      this.draw();
      // symbolsActiveData[symbol] = {
      //   price: message.price,
      //   time: timeToSeconds(message.time)
      // };
    })
  }
  mergeSocketDataToPrices(message) {
    this.setState(state => ({...state, webSocketsMessagesCounter: state.webSocketsMessagesCounter + 1}));
    const lastLocalPriceTime = this.state.prices[this.state.prices.length - 1].timeInSeconds;
    const lastLocalPrice = this.state.prices[this.state.prices.length - 1].price;
    const messageTime = timeToSeconds(message.time)
    // console.log('%c⧭', 'color: #16c79e', lastLocalPriceTime, messageTime);
    console.time(1)
    if (messageTime < lastLocalPriceTime || this.state.webSocketsMessagesCounter < 2) {
      console.timeEnd(1)
      return
    }
    console.timeEnd(1)

    // to this.state.prices:
    // console.log('%c⧭1', 'color: #c7166f', this.state.prices);
    const pricesNew = this.state.prices.concat([{
      price: message.price,
      timeInSeconds: messageTime
    }])
    this.setState(state => ({...state, prices: pricesNew}));
    // console.log('%c⧭2', 'color: #c7166f', this.state.prices, this.state.pricesModifiedForCanvas);

    // to this.state.priceMin/priceMax/coefPricesToCanvas:
    this.setState(state => ({...state, priceMax: Math.max(state.priceMax, message.price)}));
    this.setState(state => ({...state, priceMin: Math.min(state.priceMin, message.price)}));
    this.setState(state => ({...state, coefPricesToCanvas: 35 /*canvas height */ / (state.priceMax - state.priceMin)}));

    // to this.state.pricesModifiedForCanvas:
    const pricesModifiedForCanvas = JSON.parse(JSON.stringify(this.state.pricesModifiedForCanvas));
    const sign = message.price >= this.state.previousClose ? 'positive' : 'negative';
    const lastSign = lastLocalPrice >= this.state.previousClose ? 'positive' : 'negative';
    let index = this.state.pricesModifiedForCanvas[lastSign][this.state.pricesModifiedForCanvas[lastSign].length - 1].index + 1
    if (lastSign !== sign) {
      for (const temp of [lastSign, sign]) {
        pricesModifiedForCanvas[temp].push({
          timeInSeconds: this.modifyTimeForCanvas((messageTime + lastLocalPriceTime) / 2), // average time modified for canvas
          price: this.state.previousCloseModifiedForCanvas,
          index
        });
        index++;
      }
    }
    pricesModifiedForCanvas[sign].push({
      timeInSeconds: this.modifyTimeForCanvas(messageTime),
      price: (message.price - this.state.priceMin) * this.state.coefPricesToCanvas,
      index
    });
    this.setState(state => ({...state, pricesModifiedForCanvas}));
    // console.log('%c', 'color: #86c716', this.state.pricesModifiedForCanvas);
  }
  modifyTimeForCanvas(timeInSeconds) {
    return timeInSeconds - (9 * 60 * 60 + 30 * 60);
  }
  componentDidMount() {
    Big.DP = 2;
    this.getDataAndMakeChart().then(() => {
      startGettingSymbolData(this.props.symbol);
      this.onSocketMessage();
    })
  }
  render() {
    if (!this.state.prices.length) return null;
    const lastPrice = this.state.prices[this.state.prices.length - 1].price;
    // console.log('%c⧭', 'color: #c7166f', lastPrice);
    const absoluteChange = Big(lastPrice).minus(this.state.previousClose).toString();
    const percentageChange = Big(lastPrice).times(100).div(this.state.previousClose).minus(100).toString();
    // console.log('%c⧭', 'color: #c71f16', lastPrice.toString(), this.state.previousClose);
    return (
      <div className="chart">
        <div className="text">
          <p className="symbol">{this.props.symbol}</p>
          <p className="price">{lastPrice}</p>
          <p className={'change ' + (absoluteChange >= 0 ? 'positive' : 'negative')}>{absoluteChange} ({percentageChange}%)</p>
        </div>
        <canvas ref={this.canvas} width="100" height="35"></canvas>
      </div>
    );
  }
}

export default Stock;
