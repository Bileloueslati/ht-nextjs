import axios, { AxiosInstance, AxiosError } from "axios";
/**
 * @deprecated
 * use Api instead
 */
const http: AxiosInstance = axios.create({
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});



export const isHttpError = (e: unknown): e is AxiosError =>
  axios.isAxiosError(e);

http.interceptors.request.use((config) => {
  config.baseURL = process.env.NEXT_PUBLIC_API_END_POINT;
  return config;
});

export const Api = http;

export default http;
