import axiosInstance, { handleRequest } from "~/utils/request";

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

const get = async (url, options = {}) => {
  return await handleRequest(axiosInstance.get(url, options));
};

const post = async (url, data, options = {}) => {
  return await handleRequest(axiosInstance.post(url, data, options));
};

const put = async (url, data, options = {}) => {
  return await handleRequest(axiosInstance.put(url, data, options));
};

const patch = async (url, options = {}) => {
  return await handleRequest(axiosInstance.patch(url, options));
};

const remove = async (url, options = {}) => {
  return await handleRequest(axiosInstance.delete(url, options));
};

export { get, post, put, patch, remove };
