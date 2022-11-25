import axios from "axios";
import router from "@/router/index";
import { useAuthStore } from "@/stores/AuthStore.js";



const axiosInstance = axios.create({
  // baseURL: import.meta.env.VITE_API_BASE_URL,
  baseURL: 'http://127.0.0.1:8000/api/',
  timeout: 15000,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
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