import axios, { AxiosRequestConfig } from 'axios';

const api = axios.create({
  baseURL: 'https://dummyjson.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  res => res,
  err => {
    console.error('API Error:', err.response?.data || err.message);
    return Promise.reject(err);
  },
);

export async function apiFetch<T = any>(
  path: string,
  config?: AxiosRequestConfig,
): Promise<T> {
  try {
    const response = await api({
      url: path,
      ...config,
    });
    return response.data;
  } catch (error: any) {
    if (error?.response?.data?.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error(error?.message || 'Network error');
    }
  }
}

export default api;
