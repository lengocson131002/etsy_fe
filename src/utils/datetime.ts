import moment from "moment";

export const GLOBAL_DATETIME_FORMAT = "DD/MM/YYYY hh:mm:ss";

export const dateToStringWithFormat = (datetime: Date, format: string = GLOBAL_DATETIME_FORMAT): string => {
  return moment(datetime).format(format);
}
