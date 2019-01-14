export default function timeToSeconds(time) {
  time = time.toString();
  // console.log('%c⧭', 'color: #6c16c7', time);
  if (time.includes(':')) {
    return +time.split(':')[0] * 3600 + +time.split(':')[1] * 60
  } else {
    return +(time.slice(-3) + '000')
  }
}