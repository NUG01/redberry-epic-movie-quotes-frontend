import axios from "axios";
import { useAuthStore } from "@/stores/AuthStore.js";
import router from "@/router/index";

const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',
  // baseURL: import.meta.env.VITE_API_BASE_UR,
  timeout: 15000,
});

axiosInstance.defaults.withCredentials = true;

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status == 401) {
      const authStore = useAuthStore();
      authStore.authenticated = false;
      router.push({name: 'not-found'});
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;