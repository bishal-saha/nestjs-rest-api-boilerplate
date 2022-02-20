export class DateTime {
  public static getCurrentDateTime() {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const hours = today.getHours();
    const minutes = today.getMinutes();
    const seconds = today.getSeconds();

    const date = day + '-' + (month < 10 ? '0' + month : month) + '-' + year;

    const time =
      hours +
      ':' +
      (minutes < 10 ? '0' + minutes : minutes) +
      ':' +
      (seconds < 10 ? '0' + seconds : seconds);

    return date + ' at ' + time;
  }
}
