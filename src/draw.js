var canvasWidth = 100, canvasHeight = 35, maxNumberOfPrices = 390;
var coefIdexToCanvas = canvasWidth / maxNumberOfPrices;

export function drawPreviousCloseLine(context, previousClose) {
  // previousClose = canvasHeight / 2;
  context.beginPath();
  context.moveTo(0, canvasHeight - previousClose);
  context.lineTo(canvasWidth, canvasHeight - previousClose);
  context.lineWidth = 1;
  context.strokeStyle = '#0000001a';
  context.stroke();
}

export function drawChart(context, prices, previousClose) {
  // previousClose = canvasHeight / 2;
  console.log('%c⧭', 'color: #a66037', prices);
  console.time(1)
  let lastIndexPositive = 0, lastIndexNegative = 0;
  context.beginPath();
  context.moveTo(0, canvasHeight - previousClose);
  for (const { index, price } of prices.positive) {
    // const signChanged = (price >= previousClose && prices[index - 1] < previousClose) ||
    //   (price <= previousClose && prices[index - 1] > previousClose);
    // if (signChanged) {
      // context.lineTo((index - 0.5) * coefIdexToCanvas, canvasHeight - price);
    // }
    if (index - lastIndexPositive > 1) {
      context.lineTo((lastIndexPositive + 0.5) * coefIdexToCanvas, canvasHeight - previousClose);
      context.moveTo((index - 0.5) * coefIdexToCanvas, canvasHeight - previousClose);
    }
    context.lineTo(index * coefIdexToCanvas, canvasHeight - price);
    lastIndexPositive = index;
  }
  console.log('%c⧭', 'color: #c76f16', lastIndexPositive);
  context.lineWidth = 1;
  context.strokeStyle = 'green';
  context.stroke();
  context.lineTo(lastIndexPositive * coefIdexToCanvas, canvasHeight - previousClose);
  fillChart('positive', context, previousClose);
  context.beginPath();
  context.moveTo(0, canvasHeight - previousClose);
  for (const { index, price } of prices.negative) {
    if (index - lastIndexNegative > 1) {
      context.lineTo((lastIndexNegative + 0.5) * coefIdexToCanvas, canvasHeight - previousClose);
      context.moveTo((index - 0.5) * coefIdexToCanvas, canvasHeight - previousClose);
    }
    context.lineTo(index * coefIdexToCanvas, canvasHeight - price);
    lastIndexNegative = index;
  }
  context.strokeStyle = 'red';
  context.stroke();
  context.lineTo(lastIndexNegative * coefIdexToCanvas, canvasHeight - previousClose);
  fillChart('negative', context, previousClose);
  console.log('%c⧭', 'color: #c7c116', lastIndexNegative);
  console.timeEnd(1)
  // context.closePath();
  // context.fillStyle = '#8ED6FF';
  // context.fill();
}

function fillChart(sign, context, previousClose) {
  // previousClose = canvasHeight / 2;
  context.save();
  context.clip();
  if (sign === 'positive') {
    context.fillStyle = '#ccebd6';
    context.fillRect(0, 0, canvasWidth, canvasHeight - previousClose);
  } else {
    context.fillStyle = '#ffd6d8';
    context.fillRect(0, canvasHeight - previousClose, canvasWidth, canvasHeight);
  }
  context.restore();
}