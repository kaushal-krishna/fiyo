import axios from "axios";
import { refreshAccessToken } from "../hooks/useTokenUtils.js";
 
const fiyoAxios = axios.create();

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
    if (error.response?.data?.message === "ATInvalidError") {
      await refreshAccessToken();
    }
    return Promise.reject(error);
  }
);

export default fiyoAxios;