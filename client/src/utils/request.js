import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://localhost:7127/api/",
});

axiosInstance.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    console.log(">>> Check Errors: ", err);
    const { code, ...errDetails } = err;
    if (code === "ERR_NETWORK") {
      return Promise.reject(err);
    } else {
      const { response } = errDetails;
      // if (response && [401, 403].includes(response.status)) {
      //   localStorage.removeItem("token");
      //   window.location.href = "/login";
      // }
      return Promise.reject(response);
    }
  }
);

export const handleRequest = async (axiosPromise) => {
  try {
    const res = await axiosPromise;
    return res.data;
  } catch (err) {
    throw err;
  }
};

export default axiosInstance;
