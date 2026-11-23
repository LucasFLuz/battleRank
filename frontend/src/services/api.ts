import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3333",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// Flag to prevent multiple simultaneous refresh attempts
let isRefreshing = false;
// Queue to hold pending requests while token is being refreshed
let failedRequestsQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}> = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedRequestsQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else if (token) {
      promise.resolve(token);
    }
  });
  failedRequestsQueue = [];
};

// Request interceptor to add Authorization header
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token && token !== "undefined" && token !== "null" && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor to handle token expiration and refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If error is 401 and we haven't already tried to refresh the token
    if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
      // Don't try to refresh for auth endpoints
      const isAuthEndpoint = originalRequest.url?.includes("/auth/");
      if (isAuthEndpoint) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        return Promise.reject(error);
      }

      const refreshToken = localStorage.getItem("refreshToken");

      if (!refreshToken || refreshToken === "undefined" || refreshToken === "null") {
        isRefreshing = false;
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        return Promise.reject(error);
      }

      // If we're already refreshing, queue this request
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedRequestsQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      // Mark as refreshing
      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL || "http://localhost:3333"}/auth/refresh-token`,
          { refreshToken },
          {
            headers: { "Content-Type": "application/json" },
            timeout: 10000,
          }
        );

        const { accessToken, refreshToken: newRefreshToken } = response.data;

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", newRefreshToken);

        processQueue(null, accessToken);

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);
