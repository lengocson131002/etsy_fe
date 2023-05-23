import moment from 'moment';

export const GLOBAL_DATETIME_FORMAT = 'DD/MM/YYYY HH:mm:ss';

export const GLOBAL_DATE_FORMAT = 'DD/MM/YYYY';

export const dateToStringWithFormat = (datetime?: Date, format: string = GLOBAL_DATETIME_FORMAT): string => {
  if (!datetime) {
    return '';
  }

  return moment(datetime).format(format);
};

export const getLastTimestamp = (date: Date) => {

  var seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);

  var interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + ' years ago';
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + ' months ago';
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + ' days ago';
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + ' hours ago';
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + ' minutes ago';
  }
  return Math.floor(seconds) + ' seconds ago';
};
