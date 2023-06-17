import axios from 'axios';

export const BASE_API_URL = 'https://gateway.marvel.com:443/v1/public/';
export const PUBLIC_API_KEY = '8859d29e77ad2d1e48220705eebbf199';
export const PRIVATE_API_KEY = 'a24c113bcdd47176f15f504bdea37f74afc82780';
export const mockUrl = 'https://jsonplaceholder.typicode.com/todos';

const network = axios.create({
  baseURL: BASE_API_URL,
});

network.interceptors.response.use((res) => res.data?.data?.results);

export const fetcher = (url, config) => network.get(url, {
  ...config,
  params: {
    ...config?.params,
    apikey: PUBLIC_API_KEY,
  },
});

export default network;
