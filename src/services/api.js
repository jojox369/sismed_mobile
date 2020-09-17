import axios from 'axios';

const api = axios.create({
  baseURL: 'https://sismed-api.herokuapp.com/',,
});

export default api;
