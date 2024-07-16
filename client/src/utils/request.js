import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://localhost:7127/api/",
});

axiosInstance.interceptors.response.use(
  (res) => {
    if(res.data && res.data.StatusCode === 400) {
      return Promise.reject(res)
    } 
    return res;
  },
  (err) => {
    if (err.response && [401, 403].includes(err.response.status)) {
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

export const handleRequest = async (axiosPromise) => {
  try {
    const res = await axiosPromise;
    console.log(res)
    return res.data;
  } catch (err) {
    throw err;
  }
};

export default axiosInstance;
