import axios, {AxiosInstance} from 'axios';

const API_URL = 'https://8.react.pages.academy/six-cities';
const REQEST_TIMEOUT = 5000;

export const createApi = (): AxiosInstance => {
  const api = axios.create(
    {
      baseURL: API_URL,
      timeout: REQEST_TIMEOUT,
    });

  return api;
};


