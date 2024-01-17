import axios from 'axios';

export const tesloApi = axios.create({
  baseURL: 'http://localhost:3000/api'
});