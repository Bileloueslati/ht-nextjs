import axios, { AxiosInstance, AxiosError } from "axios";

const { API_END_POINT } = process.env;

const http: AxiosInstance = axios.create({
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export const isHttpError = (e: unknown): e is AxiosError =>
  axios.isAxiosError(e);

http.interceptors.request.use((config) => {
  config.baseURL = API_END_POINT;
  return config;
});

export default http;
