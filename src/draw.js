
export function drawPreviousCloseLine(context, previousClose) {
  context.beginPath();
  context.moveTo(0, 35 - previousClose);
  context.lineTo(100, 35 - previousClose);
  context.lineWidth = 4;
  context.strokeStyle = '#0000001a';
  context.stroke();
}

export function drawChart(context, prices, previousClose) {
  context.beginPath();
  context.moveTo(0, 35 - previousClose);
  for (const [index, price] of prices.entries()) {
    context.lineTo(index * 100 / 390, 35 - price);
    // console.log('%c⧭', 'color: #2516c7', index * 100 / 390, price);
  }
  context.lineTo(prices.length * 100 / 390, 35 - previousClose);
  // context.closePath();
  context.lineWidth = 1;
  // context.fillStyle = '#8ED6FF';
  // context.fill();
  context.strokeStyle = 'rgba(0,0,0,0)';
  context.stroke();
}

export function fillChart(context, previousClose) {
  context.save();
  context.clip();
  context.fillStyle = '#ccebd6';
  context.fillRect(0, 0, 100, 35 - previousClose);
  context.fillStyle = '#ffd6d8';
  context.fillRect(0, 35 - previousClose, 100, 35);
  context.restore();
}