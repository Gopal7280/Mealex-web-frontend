// import axios from "axios";
// import { base_url } from "../utils/Base_url";
// import { getToken, logoutUser } from "./authService";
// import { config } from "../config/app.js";

// const apiClient = axios.create({
//     baseURL: config.apiBaseUrl,
//         headers: {
//           'Content-Type': 'application/json',
//         },
//   });
  
//   // Add token to headers
//   apiClient.interceptors.request.use(
//     (config) => {
//       if(config.url=="/login" || config.url=="/signUp")
//       {
//         console.log("worked")
//         return config
//       }
//       else{
//       const token = getToken();
//       config.headers.Authorization = `Bearer ${token}`;
//       console.log(config)
//       return config;
//       }
//     },
//     (error) => Promise.reject(error)
//   );
  
//   // Handle token errors globally (401 Unauthorized)
//   apiClient.interceptors.response.use(
//     (response) => response,
//     (error) => {
//       console.log("error coming")
//         // if(error.message=="Network Error")
//         // {
//         //   logoutUser();
//         // }
//       if (error.response) {
//         // Handle specific status codes
//         if (error.response.status === 400) {
//             // logoutUser();
//         }
//         else if(error.response.data.message=="Unauthorized first login yourself" || error.response.data.message=="Invalid or expired token." || error.message=="Network Error"){
//           //  if(error.response)
//           logoutUser();
//         }
//         else if (error.response.status === 403) {
//           // logoutUser();
//         } else if (error.response.status >= 500) {
//           // alert('Server error, please try again later.');
//         }
//       }
//       return Promise.reject(error);
//     }
//   );
  
//   // Export API methods
//   export const apiGet = async (url, config = {}) => {
//     try {
//       const response = await apiClient.get(url, config);
      
//       return response.data;
//     } catch (error) {
//       console.error("API GET request failed", error);
//       throw error; // Rethrow error for further handling
//     }
//   };
  
//   export const apiPost = async (url,data,config = {}) => {
//     try {
//       const response = await apiClient.post(url,data,config);
//       console.log(response.data);
//       console.log("post worked")
//       return response;
//     } catch (error) {
//       console.error("API POST request failed", error);
//       throw error;
//     }
//   };
//   export const apiPut = async (url, data, config = {}) => {
//     try {
//       const response = await apiClient.put(url, data, config);
//       return response.data;
//     } catch (error) {
//       console.error("API PUT request failed", error);
//       throw error;
//     }
//   };
  
//   export const apiDelete = async (url, config = {}) => {
//     try {
//       const response = await apiClient.delete(url, config);
//       return response.data;
//     } catch (error) {
//       console.error("API DELETE request failed", error);
//       throw error;
//     }
//   };
  
// import axios from "axios";
// import { getToken, setToken, logoutUser } from "./authService";
// import { config } from "../config/app.js";

// const REFRESH_URL = "https://mealex.in/auth/refresh";

// // Axios instance
// const apiClient = axios.create({
//   baseURL: config.apiBaseUrl,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // ---------- TOKEN REFRESH HANDLING ----------
// let isRefreshing = false;
// let refreshSubscribers = [];

// const subscribeTokenRefresh = (cb) => refreshSubscribers.push(cb);
// const onRefreshed = (token) => {
//   refreshSubscribers.forEach((cb) => cb(token));
//   refreshSubscribers = [];
// };

// // ---------- REQUEST INTERCEPTOR ----------
// apiClient.interceptors.request.use(
//   (reqConfig) => {
//     // Do not attach token for login/signup
//     if (reqConfig.url === "/login" || reqConfig.url === "/signUp") return reqConfig;

//     const token = getToken();
//     if (token) reqConfig.headers.Authorization = `Bearer ${token}`;

//     return reqConfig;
//   },
//   (error) => Promise.reject(error)
// );

// // ---------- RESPONSE INTERCEPTOR ----------
// apiClient.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     // Only retry if not login/signup and token invalid
//     if (
//       originalRequest.url !== "/login" &&
//       originalRequest.url !== "/signUp" &&
//       error.response &&
//       (error.response.status === 401 ||
//         error.response.data?.message === "Invalid or expired token." ||
//         error.response.data?.message === "Unauthorized first login yourself")
//     ) {
//       if (!isRefreshing) {
//         isRefreshing = true;
//         try {
//           const refreshRes = await axios.get(REFRESH_URL);
//           const newToken = refreshRes.data?.token;

//           if (newToken) setToken(newToken);
//           isRefreshing = false;
//           onRefreshed(newToken);
//         } catch (err) {
//           isRefreshing = false;
//           logoutUser();
//         }
//       }

//       // Wait for the token to refresh before retrying original request
//       return new Promise((resolve) => {
//         subscribeTokenRefresh((token) => {
//           originalRequest.headers.Authorization = `Bearer ${token}`;
//           resolve(apiClient(originalRequest));
//         });
//       });
//     }

//     // Server errors (optional)
//     if (error.response?.status >= 500) {
//       console.error("Server error:", error.response);
//     }

//     return Promise.reject(error);
//   }
// );

// // ---------- API HELPER METHODS ----------
// export const apiGet = async (url, config = {}) => {
//   try {
//     const response = await apiClient.get(url, config);
//     return response.data;
//   } catch (error) {
//     console.error("API GET request failed", error);
//     throw error;
//   }
// };

// export const apiPost = async (url, data, config = {}) => {
//   try {
//     const response = await apiClient.post(url, data, config);
//     return response.data;
//   } catch (error) {
//     console.error("API POST request failed", error);
//     throw error;
//   }
// };

// export const apiPut = async (url, data, config = {}) => {
//   try {
//     const response = await apiClient.put(url, data, config);
//     return response.data;
//   } catch (error) {
//     console.error("API PUT request failed", error);
//     throw error;
//   }
// };

// export const apiDelete = async (url, config = {}) => {
//   try {
//     const response = await apiClient.delete(url, config);
//     return response.data;
//   } catch (error) {
//     console.error("API DELETE request failed", error);
//     throw error;
//   }
// };




// import axios from "axios";
// import { getToken, setToken, logoutUser } from "./authService";
// import { config } from "../config/app.js";

// const REFRESH_URL = "https://mealex.in/auth/refresh";

// // Axios instance
// const apiClient = axios.create({
//   baseURL: config.apiBaseUrl,
//   headers: {
//     "Content-Type": "application/json",
//   },
//     withCredentials: true,   // 👈 yeh add karna hai

// });

// // ---------- TOKEN REFRESH HANDLING ----------
// let isRefreshing = false;
// let refreshSubscribers = [];

// const subscribeTokenRefresh = (cb) => refreshSubscribers.push(cb);
// const onRefreshed = (token) => {
//   refreshSubscribers.forEach((cb) => cb(token));
//   refreshSubscribers = [];
// };

// // ---------- REQUEST INTERCEPTOR ----------
// apiClient.interceptors.request.use(
//   (reqConfig) => {
//     if (!reqConfig || !reqConfig.url) return reqConfig;

//     // Skip auth for login/signup/refresh
//     const skipAuth = ["/login", "/signUp", "/auth/refresh"].some((p) =>
//       reqConfig.url.includes(p)
//     );
//     if (skipAuth) return reqConfig;

//     // const token = getToken();
//     // if (token) reqConfig.headers.Authorization = `Bearer ${token}`;
//     const token = getToken();
// if (token) {
//   reqConfig.headers.Authorization = `Bearer ${token}`;
// } else {
//   console.warn("No token found while making request:", reqConfig.url);
// }


//     // If refresh is in progress, queue request
//     if (isRefreshing) {
//       return new Promise((resolve) => {
//         subscribeTokenRefresh((newToken) => {
//           if (newToken) reqConfig.headers.Authorization = `Bearer ${newToken}`;
//           resolve(reqConfig);
//         });
//       });
//     }

//     return reqConfig;
//   },
//   (error) => Promise.reject(error)
// );

// // ---------- RESPONSE INTERCEPTOR ----------
// apiClient.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;
//     if (!originalRequest) return Promise.reject(error);

//     const status = error.response?.status;
//     const message = error.response?.data?.message;

//     const isAuthError =
//       status === 401 ||
//       message === "Invalid or expired token." ||
//       message === "Unauthorized first login yourself";

//     const isRefreshOrAuthEndpoint = (url) =>
//       url && ["/login", "/signUp", "/auth/refresh"].some((p) => url.includes(p));

//     if (!originalRequest._retry && isAuthError && !isRefreshOrAuthEndpoint(originalRequest.url)) {
//       originalRequest._retry = true;

//       if (!isRefreshing) {
//         isRefreshing = true;
//         try {
//           const refreshRes = await axios.get(REFRESH_URL, { withCredentials: true });
//           const newToken = refreshRes.data?.token;

//           if (newToken) {
//             setToken(newToken);
//             apiClient.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
//           }

//           isRefreshing = false;
//           onRefreshed(newToken);
//         } catch (err) {
//           isRefreshing = false;
//           onRefreshed(null);
//           logoutUser(); // Force logout if refresh fails
//           return Promise.reject(err);
//         }
//       }

//       // Wait until refresh is done and retry the original request
//       return new Promise((resolve, reject) => {
//         subscribeTokenRefresh((newToken) => {
//           if (newToken) {
//             originalRequest.headers.Authorization = `Bearer ${newToken}`;
//             resolve(apiClient(originalRequest));
//           } else {
//             reject(error);
//           }
//         });
//       });
//     }

//     return Promise.reject(error);
//   }
// );

// // ---------- API HELPER METHODS ----------
// export const apiGet = async (url, config = {}) => {
//   try {
//     const response = await apiClient.get(url, config);
//     return response.data;
//   } catch (error) {
//     console.error("API GET request failed", error);
//     throw error;
//   }
// };

// export const apiPost = async (url, data, config = {}) => {
//   try {
//     const response = await apiClient.post(url, data, config);
//     return response.data;
//   } catch (error) {
//     console.error("API POST request failed", error);
//     throw error;
//   }
// };

// export const apiPut = async (url, data, config = {}) => {
//   try {
//     const response = await apiClient.put(url, data, config);
//     return response.data;
//   } catch (error) {
//     console.error("API PUT request failed", error);
//     throw error;
//   }
// };

// export const apiDelete = async (url, config = {}) => {
//   try {
//     const response = await apiClient.delete(url, config);
//     return response.data;
//   } catch (error) {
//     console.error("API DELETE request failed", error);
//     throw error;
//   }
// };


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
