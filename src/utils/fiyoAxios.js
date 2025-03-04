import axios from "axios";
import { refreshAccessToken } from "../hooks/useTokenUtils.js";

const fiyoAxios = axios.create();

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

fiyoAxios.interceptors.request.use(
  async (config) => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
    config.headers = {
      ...config.headers,
      fiyoat: userInfo?.headers?.fiyoat,
      fiyodid: userInfo?.headers?.fiyodid,
    };
    return config;
  },
  (error) => Promise.reject(error)
);

fiyoAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.data?.message === "ATInvalidError" &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => {
            const userInfo = JSON.parse(
              localStorage.getItem("userInfo") || "{}"
            );
            originalRequest.headers.fiyoat = userInfo?.headers?.fiyoat;
            originalRequest.headers.fiyodid = userInfo?.headers?.fiyodid;

            return fiyoAxios(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      isRefreshing = true;

      try {
        await refreshAccessToken();
        const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");

        originalRequest.headers.fiyoat = userInfo?.headers?.fiyoat;
        originalRequest.headers.fiyodid = userInfo?.headers?.fiyodid;
        processQueue(null);
        isRefreshing = false;

        return fiyoAxios(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError);
        isRefreshing = false;

        return Promise.reject(refreshError);
      }
    } else if (error.response?.data?.message === "RTInvalidError") {
      localStorage.removeItem("userInfo");
      window.location.reload();
    }

    return Promise.reject(error);
  }
);

export default fiyoAxios;
