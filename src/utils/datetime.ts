import moment from 'moment';

export const GLOBAL_DATETIME_FORMAT = 'DD/MM/YYYY hh:mm:ss';

export const GLOBAL_DATE_FORMAT = 'DD/MM/YYYY';

export const dateToStringWithFormat = (datetime?: Date, format: string = GLOBAL_DATETIME_FORMAT): string => {
  if (!datetime) {
    return '';
  }

  return moment(datetime).format(format);
};
