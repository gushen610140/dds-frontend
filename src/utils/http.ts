import axios, { AxiosRequestConfig } from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_SERVER,
});

const http = async (config: AxiosRequestConfig) => {
  return await instance.request(config);
};

export default http;
