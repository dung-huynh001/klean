import axios, { AxiosInstance, AxiosResponse, AxiosError, AxiosPromise } from 'axios';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: "https://localhost:7127/api/",
});

axiosInstance.interceptors.response.use(
  (res: AxiosResponse): AxiosResponse => {
    return res;
  },
  (err: AxiosError): Promise<never> => {
    console.log(">>> Check Errors: ", err);
    const { code, ...errDetails } = err;
    
    if (code === "ERR_NETWORK") {
      return Promise.reject(err);
    } else {
      const { response } = errDetails;
      return Promise.reject(response);
    }
  }
);

export const handleRequest = async <T>(axiosPromise: AxiosPromise<T>): Promise<T> => {
  try {
    const res: AxiosResponse<T> = await axiosPromise;
    return res.data;
  } catch (err) {
    throw err;
  }
};

export default axiosInstance;
