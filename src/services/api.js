


import axios from "axios";
import { getToken, setToken, logoutUser } from "./authService";
import { config } from "../config/app.js";
import { updateToken } from '../config/socket';


const REFRESH_URL = "https://dev.mealex.in/auth/refresh";

const apiClient = axios.create({
  baseURL: config.apiBaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// ---------- TOKEN REFRESH HANDLING ----------
let isRefreshing = false;
let refreshSubscribers = [];

const subscribeTokenRefresh = (cb) => refreshSubscribers.push(cb);
const onRefreshed = (token) => {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = [];
};

// ---------- REQUEST INTERCEPTOR ----------
apiClient.interceptors.request.use(
  (reqConfig) => {
    if (!reqConfig || !reqConfig.url) return reqConfig;

    // login/signup/refresh ke liye token attach mat karo
    const skipAuth = ["/login", "/signUp", "/auth/refresh"].some((p) =>
      reqConfig.url.includes(p)
    );
    if (skipAuth) return reqConfig;

    const token = getToken();
    if (token) {
      reqConfig.headers.Authorization = `Bearer ${token}`;
    }

    // Agar refresh chal raha hai → request ko queue karo
    if (isRefreshing) {
      return new Promise((resolve) => {
        subscribeTokenRefresh((newToken) => {
          if (newToken) {
            reqConfig.headers.Authorization = `Bearer ${newToken}`;
          }
          resolve(reqConfig);
        });
      });
    }

    return reqConfig;
  },
  (error) => Promise.reject(error)
);

// ---------- RESPONSE INTERCEPTOR ----------
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (!originalRequest) return Promise.reject(error);

    const status = error.response?.status;
    const message = error.response?.data?.message;

    const isAuthError =
      status === 401 ||
      message === "Invalid or expired refresh token." ||
      message === "Unauthorized first login yourself";

    const isRefreshOrAuthEndpoint = (url) =>
      url && ["/login", "/signUp", "/auth/refresh"].some((p) => url.includes(p));

    // ✅ Sirf jab 401 aaye aur endpoint refresh/login nahi ho
    if (!originalRequest._retry && isAuthError && !isRefreshOrAuthEndpoint(originalRequest.url)) {
      originalRequest._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const refreshRes = await axios.get(REFRESH_URL, { withCredentials: true });
          const newToken = refreshRes.data?.token;

          if (newToken) {
            setToken(newToken);
            apiClient.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
            updateToken(newToken);

          }

          isRefreshing = false;
          onRefreshed(newToken);
        } catch (err) {
          isRefreshing = false;
          onRefreshed(null);
          // logoutUser(); // refresh fail → logout
          return Promise.reject(err);
        }
      }

      // wait until refresh completes
      return new Promise((resolve, reject) => {
        subscribeTokenRefresh((newToken) => {
          if (newToken) {
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            resolve(apiClient(originalRequest));
          } else {
            reject(error);
          }
        });
      });
    }

    return Promise.reject(error);
  }
);

// ---------- API HELPER METHODS ----------
export const apiGet = async (url, config = {}) => {
  const response = await apiClient.get(url, config);
  return response.data;
};

export const apiPost = async (url, data, config = {}) => {
  const response = await apiClient.post(url, data, config);
  return response.data;
};

export const apiPut = async (url, data, config = {}) => {
  const response = await apiClient.put(url, data, config);
  return response.data;
};

export const apiDelete = async (url, config = {}) => {
  const response = await apiClient.delete(url, config);
  return response.data;
};
