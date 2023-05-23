import axios from 'axios';
import { BACKEND_URL } from './constants';

const instance = axios.create({
  baseURL: BACKEND_URL,
});

export default instance;
