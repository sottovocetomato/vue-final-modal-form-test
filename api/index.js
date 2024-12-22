import axios from "axios";

const options = {
  baseURL: "/",
  headers: {
    Accept: "application/json",
  },
};

const AxiosInstance = axios.create(options);

AxiosInstance.interceptors.response.use(
  (resp) => {
    return resp;
  },
  (resp) => {
    if (resp?.response?.status === 500) {
      if (resp?.response?.data?.message?.includes("TokenExpiredError")) {
        return Promise.reject(
          resp?.response?.data?.message || "Неизвестная ошибка"
        );
      }
    }
    return Promise.reject(
      resp?.response?.data?.message || "Неизвестная ошибка"
    );
  }
);

const api = (axios) => ({
  get: (url, config) => axios.get(url, config),
  post: (url, body, config) => axios.post(url, body, config),
  patch: (url, body, config) => axios.patch(url, body, config),
  delete: (url, config) => axios.delete(url, config),
});

export default api(AxiosInstance);
