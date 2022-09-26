import axios, { AxiosRequestConfig } from "axios";
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APP_BASE_URL,
});

apiClient.interceptors.request.use(function (config: AxiosRequestConfig<any>) {
  // Do something before request is sent
  let token = localStorage.getItem("token");
  config.headers["Authorization"] = "Bearer " + token;
  return config;
});

export default apiClient;
