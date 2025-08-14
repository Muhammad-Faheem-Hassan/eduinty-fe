// utils/axiosInstance.js
import axios from "axios";
import sessionService from "./sessionService";

const API_URL = "http://localhost:3000/";

const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = sessionService.getLoggedIn() || {};
    console.log(token);

    if (token && token.access_token) {
      config.headers.Authorization = `Bearer ${token.access_token}`;
    } else {
      delete config.headers.Authorization;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
