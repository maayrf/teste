import moment from 'moment';

export function validateEmail(email) {
  const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email);
}

export function isCurrentDate(dateMoment, typeDiff, format = 'YYYY-MM-DD') {
  const currentDate = moment(moment(), format);
  return currentDate.diff(dateMoment, typeDiff);
}
