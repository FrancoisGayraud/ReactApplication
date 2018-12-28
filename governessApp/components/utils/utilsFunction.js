//Transform milliseconds to hour/minutes/sec
export function msToTime(duration) {
  var minutes = parseInt((duration / (1000 * 60)) % 60)
    , hours = parseInt((duration / (1000 * 60 * 60)) % 24);

  hours = (hours < 10) ? "0" + hours : hours;
  minutes = (minutes < 10) ? "0" + minutes : minutes;

  return hours + "h" + minutes;
}

function getRelativeMinutes(date, scheduleStart) {
  return (((date.getHours() - scheduleStart) * 60) + date.getMinutes());
}

export function getRelativePosition(date, minutesRange, viewWidth, scheduleStart) {
  let minutes = getRelativeMinutes(date, scheduleStart);
  return (minutes/minutesRange * viewWidth);
}

export function getRelativeWidth(start, end, minutesRange, viewWidth, scheduleStart) {
  return (getRelativePosition(end, minutesRange, viewWidth, scheduleStart) - getRelativePosition(start, minutesRange, viewWidth, scheduleStart));
}

export function getTodayDateAtTime(time)
{
  let times = time.split(':');
  let date = new Date();
  date.setHours(times[0], times[1], times[2]);
  return (date);
}

export function formatMinutes(minutes) {
    return minutes >= 10 ? minutes : '0' + minutes;
}

export function formatDate(date) {
  let ret = new Date(date);
  let day = ret.getDate() > 9 ? ret.getDate() : '0' + ret.getDate();
  let month = (ret.getMonth() + 1) > 9 ? (ret.getMonth() + 1) : '0' + (ret.getMonth() + 1);
  let minutes = ret.getMinutes() > 9 ? ret.getMinutes() : '0' + ret.getMinutes();
  return (day + '/' + month + '/'
  + ret.getFullYear() + ' ' + ret.getHours() + ':' + minutes);
}