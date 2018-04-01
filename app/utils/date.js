import moment from 'moment';

export const getVerbalDate = (date) => {
  return moment(date).fromNow();
};

export const getLocalDate = (date) => {
  return moment(date, 'YYYY-MM-DDTHH:mm:ssZ').format('DD/MM/YYYY HH:mm');
};
