import io from 'socket.io-client';
export const socket = io('https://ws-api.iextrading.com/1.0/last');

console.log('%c⧭', 'color: #16a9c7', socket);
socket.on('message', message => {
  message = JSON.parse(message);
  const symbol = message.symbol;
  console.log(message);
  if (symbolsActiveData.hasOwnProperty(symbol)) {
    symbolsActiveData[symbol] = {
      price: message.price,
      time: message.price
    }
  }
})
socket.on('connect', () => {
  console.log('%c%s', 'color: #c76f16', 'connect');
})
socket.on('disconnect', () => console.log('Disconnected.'))

export const symbolsActiveData = {}

export function addToSymbolsActiveData(symbol) {
  symbolsActiveData[symbol] = {};
  console.log('%c⧭⧭⧭', 'color: #c716a1', symbolsActiveData);
}