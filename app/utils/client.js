import axios from 'axios';

export default (token) => {
  return axios.create({
    headers: { 'Authorization': 'token ' + token },
    baseURL: 'https://api.github.com/'
  });
};
