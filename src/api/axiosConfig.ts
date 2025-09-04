import axios from "axios";
const token = import.meta.env.VITE_API_TOKEN;
const baseURL = import.meta.env.VITE_API_BASE_URL;
export const httpClient = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-type": "application/json",
  },
});

httpClient.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});
