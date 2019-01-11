export default function timeToMinutes(timeInHHmm) {
  console.log('%c⧭', 'color: #6c16c7', timeInHHmm);
  return timeInHHmm.split(':')[0] * 60 + timeInHHmm.split(':')[1]
}